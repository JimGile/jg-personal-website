// src/About.js
import React from 'react';
import SectionTitle from './SectionTitle';
import MarkdownContent from './MarkdownContent';

function About() {
  return (
    <section id="about">
      <SectionTitle>James Gile</SectionTitle>
      <MarkdownContent filePath="/content/about.md" />
    </section>
  );
}

export default About;
