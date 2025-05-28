import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

/**
 * GenericMarkdownContent component to fetch and render markdown content from a file.
 * Uses ReactMarkdown with rehypeRaw to allow raw HTML in markdown.
 *
 * @param {string} sectionId - Unique identifier for the section and prefix of the md file in the content directory
 * @returns {JSX.Element} Rendered markdown content
 */
export default function GenericMarkdownContent({ sectionId }) {
  const [content, setContent] = useState('');
  const filePath = `/content/${sectionId}.md`;

  useEffect(() => {
    fetch(filePath)
      .then((res) => res.text())
      .then(setContent);
  }, [filePath]);

  return (
    <section id={sectionId} className="markdown-content">
      <ReactMarkdown rehypePlugins={[rehypeRaw]} >
        {content}
      </ReactMarkdown>
    </section>
  );
}

GenericMarkdownContent.propTypes = {
  sectionId: PropTypes.string.isRequired,
};