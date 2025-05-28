// src/About.js
import React from 'react';
import MarkdownContent from './MarkdownContent';

function WhatIsAltitude() {
  return (
    <section id="what-is-altitude">
      <MarkdownContent filePath="/content/what_is_altitude.md" />
    </section>
  );
}

export default WhatIsAltitude;
