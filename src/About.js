// src/About.js
import React from 'react';
import MarkdownContent from './MarkdownContent';

function About() {
  return (
    <section id="about">
      <MarkdownContent filePath="/content/about.md" />
    </section>
  );
}

export default About;
