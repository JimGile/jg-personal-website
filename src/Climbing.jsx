import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SectionTitle from './SectionTitle';
import climbingData from './climbingData.json';
import MountainCard from './MountainCardOrig';

function Climbing() {
  return (
    <section id="climbing">
      <SectionTitle>Climbing Expeditions</SectionTitle>
      {climbingData.map((region, index) => (
        <Accordion key={region.country} defaultExpanded={index === 0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
            <Typography variant="h6">{region.country}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {region.mountains.map((mountain) => (
              <MountainCard key={mountain.name} mountainItem={mountain} />
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </section>
  );
}

export default Climbing;
