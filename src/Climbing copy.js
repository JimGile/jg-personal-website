// src/Climbing.js
import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import climbingData from './climbingData.json'; // Import the JSON file

function Climbing() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="climbing">
      <SectionTitle>Climbing Expeditions</SectionTitle>
      <div className="accordion" id="climbingAccordion">
        {climbingData.map((region, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading-${index}`}>
              <button
                className={`accordion-button ${activeIndex === index ? 'selected' : 'collapsed'}`}
                type="button"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`collapse-${index}`}
              >
                {region.country}
              </button>
            </h2>
            <div
              id={`collapse-${index}`}
              className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}
              aria-labelledby={`heading-${index}`}
              data-bs-parent="#climbingAccordion"
            >
              <div className="accordion-body">
                <ul className="list-group">
                  {region.mountains.map((mountain, idx) => (
                    <li className="list-group-item" key={idx}>
                      <strong>{mountain.name}</strong>: {mountain.description}{' '}
                      <a href={mountain.photoAlbum} target="_blank" rel="noopener noreferrer">
                        Photo Album
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Climbing;
