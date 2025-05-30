import React, { useState, useEffect  } from 'react';
import { 
  Box, Typography, Slider, Paper, Grid, Card, CardContent, 
  CardHeader, Tabs, Tab
} from '@mui/material';
import { motion } from 'framer-motion';

const OxygenTransportVisualization = () => {
  const [tabValue, setTabValue] = useState(0);
  
  // Physiological parameters
  const [pulseRate, setPulseRate] = useState(70);
  const [respiratoryRate, setRespiratoryRate] = useState(14);
  const [o2PartialPressure, setO2PartialPressure] = useState(100); // mmHg
  const [hemoglobinCount, setHemoglobinCount] = useState(15); // g/dL
  const [metabolicRate, setMetabolicRate] = useState(250); // ml O2/min
  
  // Calculated vital signs
  const [bloodOxygenLevel, setBloodOxygenLevel] = useState(97); // %
  const [co2Level, setCo2Level] = useState(40); // mmHg
  const [bloodPH, setBloodPH] = useState(7.4);
  
  // Animation speeds
  const breathingSpeed = 60 / respiratoryRate; // seconds per breath cycle
  const bloodFlowSpeed = 60 / pulseRate; // seconds per pulse cycle
  
  // Calculate vital signs based on physiological parameters
  useEffect(() => {
    // Calculate oxygen saturation using a simplified oxyhemoglobin dissociation curve
    const calculateOxygenSaturation = () => {
      // Hill equation approximation
      const p50 = 26.6; // mmHg where Hb is 50% saturated
      const n = 2.8; // Hill coefficient
      const saturation = 100 * Math.pow(o2PartialPressure, n) / 
                        (Math.pow(p50, n) + Math.pow(o2PartialPressure, n));
      return Math.min(100, Math.max(0, saturation));
    };
    
    // Calculate CO2 level based on respiratory rate and metabolic rate
    const calculateCO2Level = () => {
      const baseCO2 = 40; // mmHg
      const respiratoryEffect = (14 / respiratoryRate) * baseCO2;
      const metabolicEffect = (metabolicRate / 250) * 5;
      return Math.min(80, Math.max(20, respiratoryEffect + metabolicEffect - 5));
    };
    
    // Calculate blood pH based on CO2 level
    const calculateBloodPH = (co2) => {
      // Henderson-Hasselbalch approximation
      return 7.4 + (40 - co2) * 0.008;
    };
    
    const newO2Saturation = calculateOxygenSaturation() * (hemoglobinCount / 15);
    const newCO2Level = calculateCO2Level();
    const newPH = calculateBloodPH(newCO2Level);
    
    setBloodOxygenLevel(Math.min(100, Math.max(0, newO2Saturation)));
    setCo2Level(newCO2Level);
    setBloodPH(Math.min(7.8, Math.max(6.8, newPH)));
  }, [pulseRate, respiratoryRate, o2PartialPressure, hemoglobinCount, metabolicRate]);
  
  // Animation components
  const BodyOverviewAnimation = () => {
    return (
      <Box sx={{ position: 'relative', width: '100%', height: 500, mt: 2 }}>
        {/* Nose/Mouth */}
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: 100, 
          height: 50, 
          bgcolor: '#f5f5f5', 
          border: '1px solid #ccc',
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography variant="subtitle2">Nose/Mouth</Typography>
        </Box>
        
        {/* Lungs */}
        <Box sx={{ 
          position: 'absolute', 
          top: 70, 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: 150, 
          height: 100, 
          bgcolor: '#e3f2fd', 
          border: '1px solid #90caf9',
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography variant="subtitle2">Lungs</Typography>
        </Box>
        
        {/* Heart */}
        <Box sx={{ 
          position: 'absolute', 
          top: 190, 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: 150, 
          height: 120, 
          border: '1px solid #ccc',
          borderRadius: 2,
          overflow: 'hidden'
        }}>
          {/* Right Atrium */}
          <Box sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '50%',
            height: '50%',
            bgcolor: '#bbdefb',
            borderRight: '1px solid #ccc',
            borderBottom: '1px solid #ccc',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Typography variant="caption">Right Atrium</Typography>
          </Box>
          
          {/* Left Atrium */}
          <Box sx={{ 
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '50%',
            bgcolor: '#ef9a9a',
            borderLeft: '1px solid #ccc',
            borderBottom: '1px solid #ccc',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Typography variant="caption">Left Atrium</Typography>
          </Box>
          
          {/* Right Ventricle */}
          <Box sx={{ 
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '50%',
            height: '50%',
            bgcolor: '#bbdefb',
            borderRight: '1px solid #ccc',
            borderTop: '1px solid #ccc',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Typography variant="caption">Right Ventricle</Typography>
          </Box>
          
          {/* Left Ventricle */}
          <Box sx={{ 
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '50%',
            height: '50%',
            bgcolor: '#ef9a9a',
            borderLeft: '1px solid #ccc',
            borderTop: '1px solid #ccc',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Typography variant="caption">Left Ventricle</Typography>
          </Box>
        </Box>
        
        {/* Organs/Muscles */}
        <Box sx={{ 
          position: 'absolute', 
          top: 330, 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: 200, 
          height: 100, 
          bgcolor: '#ffcdd2', 
          border: '1px solid #ef9a9a',
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography variant="subtitle2">Organs/Muscles</Typography>
        </Box>
        
        {/* Respiratory Animation */}
        <RespiratoryAnimation speed={breathingSpeed} />
        
        {/* Oxygenated Blood Flow Animation */}
        <OxygenatedBloodAnimation 
          speed={bloodFlowSpeed} 
          hemoglobinCount={hemoglobinCount}
          o2Level={bloodOxygenLevel}
        />
        
        {/* Deoxygenated Blood Flow Animation */}
        <DeoxygenatedBloodAnimation 
          speed={bloodFlowSpeed} 
          hemoglobinCount={hemoglobinCount}
          co2Level={co2Level}
        />
      </Box>
    );
  };
  
  // Respiratory Animation Component
  const RespiratoryAnimation = ({ speed }) => {
    // Create oxygen dots (inhale)
    const oxygenDots = Array.from({ length: 10 }, (_, i) => (
      <motion.div
        key={`oxygen-${i}`}
        style={{
          position: 'absolute',
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#f44336',
          left: '50%',
          top: 50 + i * 2,
        }}
        animate={{
          y: [0, 20],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          delay: i * (speed / 10),
        }}
      />
    ));
    
    // Create carbon dioxide dots (exhale)
    const co2Dots = Array.from({ length: 10 }, (_, i) => (
      <motion.div
        key={`co2-${i}`}
        style={{
          position: 'absolute',
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#2196f3',
          left: '50%',
          top: 70 - i * 2,
        }}
        animate={{
          y: [-20, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          delay: (speed / 2) + i * (speed / 10),
        }}
      />
    ));
    
    return (
      <>
        {oxygenDots}
        {co2Dots}
      </>
    );
  };
  
  // Oxygenated Blood Flow Animation
  const OxygenatedBloodAnimation = ({ speed, hemoglobinCount, o2Level }) => {
    // Number of dots based on hemoglobin count
    const dotCount = Math.round(hemoglobinCount * 2);
    
    // Create dots for pulmonary vein (Lungs to Left Atrium)
    const pulmonaryVeinDots = Array.from({ length: dotCount }, (_, i) => (
      <motion.div
        key={`pulm-vein-${i}`}
        style={{
          position: 'absolute',
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: '#f44336',
          opacity: o2Level / 100,
          left: '60%',
          top: 120,
        }}
        animate={{
          y: [0, 70],
          opacity: [0, o2Level / 100, 0],
        }}
        transition={{
          duration: speed * 0.8,
          repeat: Infinity,
          delay: i * (speed / dotCount),
        }}
      />
    ));
    
    // Create dots for left heart (Left Atrium to Left Ventricle)
    const leftHeartDots = Array.from({ length: dotCount }, (_, i) => (
      <motion.div
        key={`left-heart-${i}`}
        style={{
          position: 'absolute',
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: '#f44336',
          opacity: o2Level / 100,
          left: '75%',
          top: 190,
        }}
        animate={{
          y: [0, 60],
          opacity: [0, o2Level / 100, 0],
        }}
        transition={{
          duration: speed * 0.4,
          repeat: Infinity,
          delay: (speed * 0.8) + i * (speed / dotCount),
        }}
      />
    ));
    
    // Create dots for aorta (Left Ventricle to Organs/Muscles)
    const aortaDots = Array.from({ length: dotCount }, (_, i) => (
      <motion.div
        key={`aorta-${i}`}
        style={{
          position: 'absolute',
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: '#f44336',
          opacity: o2Level / 100,
          left: '75%',
          top: 250,
        }}
        animate={{
          y: [0, 80],
          opacity: [0, o2Level / 100, 0],
        }}
        transition={{
          duration: speed * 0.8,
          repeat: Infinity,
          delay: (speed * 1.2) + i * (speed / dotCount),
        }}
      />
    ));
    
    return (
      <>
        {pulmonaryVeinDots}
        {leftHeartDots}
        {aortaDots}
      </>
    );
  };
  
  // Deoxygenated Blood Flow Animation
  const DeoxygenatedBloodAnimation = ({ speed, hemoglobinCount, co2Level }) => {
    // Number of dots based on hemoglobin count
    const dotCount = Math.round(hemoglobinCount * 2);
    const co2Intensity = co2Level / 40; // Normalize CO2 level
    
    // Create dots for vena cava (Organs/Muscles to Right Atrium)
    const venaCavaDots = Array.from({ length: dotCount }, (_, i) => (
      <motion.div
        key={`vena-cava-${i}`}
        style={{
          position: 'absolute',
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: '#2196f3',
          opacity: co2Intensity,
          left: '40%',
          top: 330,
        }}
        animate={{
          y: [-80, 0],
          opacity: [0, co2Intensity, 0],
        }}
        transition={{
          duration: speed * 0.8,
          repeat: Infinity,
          delay: i * (speed / dotCount),
        }}
      />
    ));
    
    // Create dots for right heart (Right Atrium to Right Ventricle)
    const rightHeartDots = Array.from({ length: dotCount }, (_, i) => (
      <motion.div
        key={`right-heart-${i}`}
        style={{
          position: 'absolute',
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: '#2196f3',
          opacity: co2Intensity,
          left: '25%',
          top: 190,
        }}
        animate={{
          y: [0, 60],
          opacity: [0, co2Intensity, 0],
        }}
        transition={{
          duration: speed * 0.4,
          repeat: Infinity,
          delay: (speed * 0.8) + i * (speed / dotCount),
        }}
      />
    ));
    
    // Create dots for pulmonary artery (Right Ventricle to Lungs)
    const pulmonaryArteryDots = Array.from({ length: dotCount }, (_, i) => (
      <motion.div
        key={`pulm-artery-${i}`}
        style={{
          position: 'absolute',
          width: 5,
          height: 5,
          borderRadius: '50%',
          backgroundColor: '#2196f3',
          opacity: co2Intensity,
          left: '25%',
          top: 190,
        }}
        animate={{
          y: [-70, 0],
          opacity: [0, co2Intensity, 0],
        }}
        transition={{
          duration: speed * 0.8,
          repeat: Infinity,
          delay: (speed * 1.2) + i * (speed / dotCount),
        }}
      />
    ));
    
    return (
      <>
        {venaCavaDots}
        {rightHeartDots}
        {pulmonaryArteryDots}
      </>
    );
  };
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Oxygen Transport Visualization
      </Typography>
      
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Body Overview" />
        </Tabs>
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Visualization
            </Typography>
            <BodyOverviewAnimation />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Physiological Parameters" />
                <CardContent>
                  <Typography gutterBottom>Pulse Rate: {pulseRate} bpm</Typography>
                  <Slider
                    value={pulseRate}
                    onChange={(e, newValue) => setPulseRate(newValue)}
                    min={40}
                    max={180}
                    step={1}
                    marks={[
                      { value: 40, label: '40' },
                      { value: 70, label: '70' },
                      { value: 180, label: '180' }
                    ]}
                  />
                  
                  <Typography gutterBottom>Respiratory Rate: {respiratoryRate} breaths/min</Typography>
                  <Slider
                    value={respiratoryRate}
                    onChange={(e, newValue) => setRespiratoryRate(newValue)}
                    min={6}
                    max={30}
                    step={1}
                    marks={[
                      { value: 6, label: '6' },
                      { value: 14, label: '14' },
                      { value: 30, label: '30' }
                    ]}
                  />
                  
                  <Typography gutterBottom>O₂ Partial Pressure: {o2PartialPressure} mmHg</Typography>
                  <Slider
                    value={o2PartialPressure}
                    onChange={(e, newValue) => setO2PartialPressure(newValue)}
                    min={20}
                    max={150}
                    step={1}
                    marks={[
                      { value: 20, label: '20' },
                      { value: 100, label: '100' },
                      { value: 150, label: '150' }
                    ]}
                  />
                  
                  <Typography gutterBottom>Hemoglobin Count: {hemoglobinCount} g/dL</Typography>
                  <Slider
                    value={hemoglobinCount}
                    onChange={(e, newValue) => setHemoglobinCount(newValue)}
                    min={8}
                    max={20}
                    step={0.5}
                    marks={[
                      { value: 8, label: '8' },
                      { value: 15, label: '15' },
                      { value: 20, label: '20' }
                    ]}
                  />
                  
                  <Typography gutterBottom>Metabolic Rate: {metabolicRate} ml O₂/min</Typography>
                  <Slider
                    value={metabolicRate}
                    onChange={(e, newValue) => setMetabolicRate(newValue)}
                    min={100}
                    max={500}
                    step={10}
                    marks={[
                      { value: 100, label: '100' },
                      { value: 250, label: '250' },
                      { value: 500, label: '500' }
                    ]}
                  />
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Vital Signs" />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Blood Oxygen Level:</Typography>
                    <Typography 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: bloodOxygenLevel < 90 ? 'error.main' : 'success.main' 
                      }}
                    >
                      {bloodOxygenLevel.toFixed(1)}%
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>CO₂ Level:</Typography>
                    <Typography 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: co2Level > 45 || co2Level < 35 ? 'error.main' : 'success.main' 
                      }}
                    >
                      {co2Level.toFixed(1)} mmHg
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Blood pH:</Typography>
                    <Typography 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: bloodPH > 7.45 || bloodPH < 7.35 ? 'error.main' : 'success.main' 
                      }}
                    >
                      {bloodPH.toFixed(2)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OxygenTransportVisualization;