import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Slider // Added for Mask Efficiency
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import SectionTitle from './SectionTitle';

// --- Constants from Spreadsheet (B20-B33) ---
const B20_P0_PA_CONST = 101325; // B20: p0 - sea level std atm pressure (Pa)
const B21_L_K_PER_M_CONST = 0.0065; // B21: L - temp lapse rate (K/m)
const B23_T0_K_CONST = 288.15; // B23: T0 - Sea level temp (K)
// g (B24), M (B25), R (B26) are used to derive EXP_GM_RL_CONST
const B27_FT_TO_M_CONST = 0.3048; // B27: feet to meter
const B29_EXP_GM_RL_CONST = 5.255781; // B29: (g*M)/(R*L)
const B31_PA_TO_TORR_CONST = 0.00750061683; // B31: Pa to torr
const B33_ATM_O2_CONC_CONST = 0.21; // B33: Atmospheric O2 Concentration (FiO2 %)

const SPREADSHEET_CONSTANTS = [
  { label: "p0 - sea level std atm pressure", value: `${B20_P0_PA_CONST} Pa` },
  { label: "L - temp lapse rate", value: `${B21_L_K_PER_M_CONST} K/m` },
  { label: "T0 - Sea level temp", value: `${B23_T0_K_CONST} K` },
  { label: "g - gravitational acceleration", value: "9.80665 m/s²" },
  { label: "M - molar mass of dry air", value: "0.028964 kg/mol" },
  { label: "R - universal gas const", value: "8.31447 J/(mol·K)" },
  { label: "feet to meter", value: B27_FT_TO_M_CONST },
  { label: "(g*M)/(R*L)", value: B29_EXP_GM_RL_CONST.toFixed(6) },
  { label: "Pa to torr", value: B31_PA_TO_TORR_CONST.toFixed(8) },
  { label: "Atmospheric O2 Concentration (FiO2 %)", value: B33_ATM_O2_CONC_CONST },
];

// --- X-axis Altitude Series Data (F3:F33, G3:G33) ---
const FEET_SERIES = Array.from({ length: 31 }, (_, i) => i * 1000); // 0 to 30000 feet
const METERS_SERIES = FEET_SERIES.map(f => parseFloat((f * B27_FT_TO_M_CONST).toFixed(0)));

const SupplementalOxygenEquivalentAltitudeCalculator = () => {
  const [inputs, setInputs] = useState({
    measurementUnits: "Feet", // B4
    physicalAltitude: 29035, // B5
    suppO2FlowRate: 2, // B6 (L/min)
    respiratoryRate: 50, // B7 (breaths/min) - typical adult resting rate 12
    tidalVolume: 1000, // B8 (ml/breath) - typical adult 500ml
    maskEfficiency: 0.15, // B9 (0 to 1)
  });

  const [outputs, setOutputs] = useState({
    atmosphericPressureTorr: NaN, // B12 (display in Torr)
    atmosphericO2PartialPressureTorr: NaN, // B13 (display in Torr)
    inspiredRespiratoryVolumeLMin: NaN, // B14
    supplementalO2ConcentrationFiO2: NaN, // B15
    supplementalO2PartialPressureTorr: NaN, // B16 (display in Torr)
    supplementalO2EquivalentAltitude: NaN, // B17
  });

  const [chartData, setChartData] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let numericValue = (name === "measurementUnits") ? value : parseFloat(value);
    if (name === "maskEfficiency" && (numericValue < 0 || numericValue > 1)) {
        numericValue = Math.max(0, Math.min(1, numericValue));
    } else if (name !== "measurementUnits" && numericValue < 0) {
        numericValue = 0;
    }
    setInputs((prevInputs) => ({ ...prevInputs, [name]: numericValue }));
  };
  
  const handleSliderChange = (name) => (event, newValue) => {
    setInputs((prevInputs) => ({ ...prevInputs, [name]: newValue }));
  };

  const calculateAll = useCallback((currentPhysicalAltitude, unit, suppO2Flow, respRate, tidalVol, maskEff) => {
    const physicalAltitudeMeters = unit === "Feet" ? currentPhysicalAltitude * B27_FT_TO_M_CONST : currentPhysicalAltitude;

    // B12: Atmospheric Pressure
    let pAtmPa = B20_P0_PA_CONST * Math.pow(1 - (B21_L_K_PER_M_CONST * physicalAltitudeMeters) / B23_T0_K_CONST, B29_EXP_GM_RL_CONST);
    if (physicalAltitudeMeters * B21_L_K_PER_M_CONST >= B23_T0_K_CONST) pAtmPa = 0; // Avoid issues if altitude is too high for formula
    const pAtmTorr = pAtmPa * B31_PA_TO_TORR_CONST;

    // B13: Atmospheric O2 Partial Pressure
    const pAtmO2Pa = pAtmPa * B33_ATM_O2_CONC_CONST;
    const pAtmO2Torr = pAtmO2Pa * B31_PA_TO_TORR_CONST;

    // B14: Inspired Respiratory Volume (L/min)
    const inspRespVolLMin = (respRate * tidalVol) / 1000;

    // B15: Supplemental O2 Concentration (FiO2_supp)
    // ((B6 + ((B14-B6)*B33))/B14)*(1+IF(B6=0,0,B9))
    // If suppO2Flow is 0, the mask efficiency does not apply, so we set it to 0.
    const actMaskEff = suppO2Flow === 0 ? 0 : maskEff; // If no supplemental O2, mask efficiency is zero (1+IF(B6=0,0,B9)
    let fiO2Supp = ((suppO2Flow + ((inspRespVolLMin - suppO2Flow) * B33_ATM_O2_CONC_CONST)) / inspRespVolLMin) * (1 + actMaskEff);
    // Ensure FiO2 is capped at 1 (100%)
    fiO2Supp = Math.min(1, Math.max(0, fiO2Supp));
    
    // B16: Supplemental O2 Partial Pressure
    const pSuppO2Pa = pAtmPa * fiO2Supp;
    const pSuppO2Torr = pSuppO2Pa * B31_PA_TO_TORR_CONST;

    // B17: Supplemental Oxygen Equivalent Altitude
    let equivAltMeters = 0;
    const termRatioB17 = pSuppO2Pa / (B33_ATM_O2_CONC_CONST * B20_P0_PA_CONST);

    if (termRatioB17 > 0 && termRatioB17 < 1) { // Valid range for the formula to give positive altitude
         equivAltMeters = (B23_T0_K_CONST / B21_L_K_PER_M_CONST) * (1 - Math.pow(termRatioB17, 1 / B29_EXP_GM_RL_CONST));
    } else if (termRatioB17 >= 1) { // At or better than sea level O2
        equivAltMeters = (B23_T0_K_CONST / B21_L_K_PER_M_CONST) * (1 - Math.pow(termRatioB17, 1 / B29_EXP_GM_RL_CONST)); // Will be <=0
    } else { // termRatio is 0 or negative (e.g. pSuppO2Pa is 0)
        // Effectively infinite altitude, or undefined. Cap at a high value or handle as NaN.
        // For simplicity, if pSuppO2Pa is 0, it implies very high altitude.
        // The formula would involve log of 0 or power of 0 if not handled.
        // Let's use a placeholder for extremely high altitude if pSuppO2Pa is effectively zero.
        // The spreadsheet shows 999.96 for 1000ft with 0 L/min, so it handles it.
        // If pSuppO2Pa is very low, termRatio is small, (1-small_num) is close to 1, altitude is high.
        // If pSuppO2Pa is 0, termRatio is 0, (1-0) = 1, altitude = T0/L (max theoretical in this model part)
         equivAltMeters = (B23_T0_K_CONST / B21_L_K_PER_M_CONST);
    }
    
    let equivAltDisplay;
    if (unit === "Feet") {
      equivAltDisplay = equivAltMeters / B27_FT_TO_M_CONST;
    } else {
      equivAltDisplay = equivAltMeters;
    }
    // Ensure equivalent altitude is not excessively negative if FiO2 is very high
    // (e.g. equivalent of being below sea level)
    equivAltDisplay = Math.max(0, equivAltDisplay);


    return {
      pAtmTorr, pAtmO2Torr, inspRespVolLMin, fiO2Supp, pSuppO2Torr, equivAltDisplay,
      // Raw values for potential further use if needed
      pAtmPa, pAtmO2Pa, pSuppO2Pa, equivAltMeters
    };
  }, []);


  useEffect(() => {
    const {
      measurementUnits, physicalAltitude, suppO2FlowRate,
      respiratoryRate, tidalVolume, maskEfficiency
    } = inputs;

    // Calculate for the single "Outputs" display
    const singlePointCalcs = calculateAll(
      physicalAltitude, measurementUnits, suppO2FlowRate,
      respiratoryRate, tidalVolume, maskEfficiency
    );

    setOutputs({
      atmosphericPressureTorr: singlePointCalcs.pAtmTorr,
      atmosphericO2PartialPressureTorr: singlePointCalcs.pAtmO2Torr,
      inspiredRespiratoryVolumeLMin: singlePointCalcs.inspRespVolLMin,
      supplementalO2ConcentrationFiO2: singlePointCalcs.fiO2Supp,
      supplementalO2PartialPressureTorr: singlePointCalcs.pSuppO2Torr,
      supplementalO2EquivalentAltitude: singlePointCalcs.equivAltDisplay,
    });

    // Calculate for the chart data
    const xAxisSeries = measurementUnits === "Feet" ? FEET_SERIES : METERS_SERIES;
    const newChartData = xAxisSeries.map((alt) => {
      const chartPointCalcs = calculateAll(
        alt, measurementUnits, suppO2FlowRate,
        respiratoryRate, tidalVolume, maskEfficiency
      );
      return {
        physicalAltitudePlot: alt, // X-axis
        equivalentAltitudePlot: isNaN(chartPointCalcs.equivAltDisplay) ? null : parseFloat(chartPointCalcs.equivAltDisplay.toFixed(0)), // Y-axis
      };
    });
    setChartData(newChartData);

  }, [inputs, calculateAll]);

  const formatOutputValue = (value, unit, decimals = 1) => {
    if (value === null || isNaN(value)) return "N/A";
    // Use toLocaleString for thousands separator
    const formatted = value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
    return `${formatted} ${unit}`;
  };
  
  const altitudeUnitLabel = inputs.measurementUnits === "Feet" ? "ft" : "m";
  const currentPhysicalAltitudeForOutput = inputs.physicalAltitude;


  return (
    <section id="supplemental-o2-equiv-alt-calculator">
        <SectionTitle>Supplemental Oxygen Equivalent Altitude Calculator</SectionTitle>
    
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* <Typography variant="h4" component="h1" gutterBottom align="center">
        Supplemental Oxygen Equivalent Altitude Calculator
      </Typography> */}

      {/* Inputs Section: Top, full width, 3 columns x 2 rows */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Inputs</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              size='small'
              label={`Physical Altitude (${altitudeUnitLabel})`}
              name="physicalAltitude"
              type="number"
              value={inputs.physicalAltitude}
              onChange={handleInputChange}
              margin="dense"
              slotProps={{ input: { step: inputs.measurementUnits === "Feet" ? 100 : 30 } }}
            />
            <FormControl size='small' margin="dense">
              <InputLabel id="measurement-units-label">Units</InputLabel>
              <Select labelId="measurement-units-label" name="measurementUnits" value={inputs.measurementUnits} label="Units" onChange={handleInputChange}>
                <MenuItem value="Feet">Feet</MenuItem>
                <MenuItem value="Meters">Meters</MenuItem>
              </Select>
            </FormControl>
            <OutputItem label="Supplemental O₂ Equivalent Altitude" value={formatOutputValue(outputs.supplementalO2EquivalentAltitude, altitudeUnitLabel, 0)} />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Box sx={{ mt: -2 }}>
                <Typography variant='caption' gutterBottom>O₂ Flow Rate ({inputs.suppO2FlowRate.toFixed(0)} L/min)</Typography>
                <Slider size='small' name="suppO2FlowRate" value={inputs.suppO2FlowRate} onChange={handleSliderChange("suppO2FlowRate")} step={1} min={0} max={6} valueLabelDisplay="auto" />
                </Box>
                <Box sx={{ mt: -1 }}>
                <Typography variant='caption' gutterBottom>Mask Efficiency ({inputs.maskEfficiency*100}%)</Typography>
                <Slider size='small' name="maskEfficiency" value={inputs.maskEfficiency} onChange={handleSliderChange("maskEfficiency")} step={0.01} min={0} max={1} valueLabelDisplay="auto" />
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Box sx={{ mt: -2 }}>
                <Typography variant='caption' gutterBottom>Breaths/min ({inputs.respiratoryRate.toFixed(0)})</Typography>
                <Slider size='small' name="respiratoryRate" value={inputs.respiratoryRate} onChange={handleSliderChange("respiratoryRate")} step={1} min={5} max={60} valueLabelDisplay="auto" />
                </Box>
                <Box sx={{ mt: -1 }}>
                <Typography variant='caption' gutterBottom>Tidal Vol. ({inputs.tidalVolume.toFixed(0)} ml/breath)</Typography>
                <Slider size='small' name="tidalVolume" value={inputs.tidalVolume} onChange={handleSliderChange("tidalVolume")} step={50} min={0} max={1500} valueLabelDisplay="auto" />
                </Box>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Graph Section: Full width below Inputs */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom align="center">
          Supplemental O₂ Equivalent Altitude vs. Physical Altitude
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 5, right: 40, left: 20, bottom: 35 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="physicalAltitudePlot" type="number" domain={['dataMin', 'dataMax']}
              label={{ value: `Physical Altitude (${altitudeUnitLabel})`, position: 'insideBottom', offset: -25 }}
              tickFormatter={(tick) => tick.toLocaleString()} />
            <YAxis dataKey="equivalentAltitudePlot" domain={['auto', 'auto']} allowDataOverflow={true}
              label={{ value: `Eq. Altitude (${altitudeUnitLabel})`, angle: -90, position: 'insideLeft', offset: -10 }}
              tickFormatter={(tick) => tick.toLocaleString()} />
            <Tooltip formatter={(value, name, props) => [`${value !== null ? parseFloat(value).toFixed(0) : 'N/A'} ${altitudeUnitLabel}`, "Equivalent Altitude"]} />
            <Legend verticalAlign="top" wrapperStyle={{paddingBottom: '10px'}}/>
            <Line type="monotone" dataKey="equivalentAltitudePlot" stroke="#8884d8" activeDot={{ r: 8 }} connectNulls={false} name="Supplemental O₂ Equivalent Altitude" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Outputs & Constants: Bottom, responsive row */}
      <Grid container spacing={3} sx={{ width: '100%' }}>
        {/* Outputs Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, overflowY: 'auto', width: '100%', height: '100%' }}>
            <Typography variant="h6" gutterBottom>Outputs</Typography>
            <OutputItem label="Physical Altitude" value={formatOutputValue(currentPhysicalAltitudeForOutput, altitudeUnitLabel, 0)} />
            <OutputItem label="Atmospheric Pressure" value={formatOutputValue(outputs.atmosphericPressureTorr, "torr")} />
            <OutputItem label="Atmospheric O₂ Partial Pressure" value={formatOutputValue(outputs.atmosphericO2PartialPressureTorr, "torr")} />
            <OutputItem label="Inspired Respiratory Volume" value={formatOutputValue(outputs.inspiredRespiratoryVolumeLMin, "L/min")} />
            <OutputItem label="Supplemental O₂ Concentration (FiO2 %)" value={formatOutputValue(outputs.supplementalO2ConcentrationFiO2 * 100, "%", 1)} />
            <OutputItem label="Supplemental O₂ Partial Pressure" value={formatOutputValue(outputs.supplementalO2PartialPressureTorr, "torr")} />
            <OutputItem label="Supplemental O₂ Equivalent Altitude" value={formatOutputValue(outputs.supplementalO2EquivalentAltitude, altitudeUnitLabel, 0)} />
          </Paper>
        </Grid>
        {/* Constants Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, overflowY: 'auto', width: '100%', height: '100%' }}>
            <Typography variant="h6" gutterBottom>Constants</Typography>
            {SPREADSHEET_CONSTANTS.map((item) => ( <OutputItem key={item.label} label={item.label} value={item.value.toString()} /> ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </section>
  );
};

const OutputItem = ({ label, value }) => (
  <Box
    sx={{
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      py: 0.5,
      borderBottom: '1px solid #eee',
      minWidth: 0
    }}
  >
    <Typography variant="body2" sx={{ pr: 1 }}>{label}:</Typography>
    <Typography variant="body2" fontWeight="medium" sx={{ textAlign: 'right' }}>{value}</Typography>
  </Box>
);

OutputItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default SupplementalOxygenEquivalentAltitudeCalculator;