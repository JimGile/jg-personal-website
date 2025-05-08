// src/Climbing.js
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SectionTitle from './SectionTitle';
import climbingData from './climbingData.json';
import MountainCard from './MountainCard';

function Climbing() {
  return (
    <section id="climbing">
      <SectionTitle>Climbing Expeditions</SectionTitle>
      {climbingData.map((region, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6">{region.country}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {region.mountains.map((mountain, idx) => (
              <MountainCard
                key={idx}
                name={mountain.name}
                elevation={mountain.elevation}
                description={mountain.description}
                photoAlbum={mountain.photoAlbum}
                image={mountain.image} // Ensure `image` is part of your JSON data
              />
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </section>
  );
}

export default Climbing;
