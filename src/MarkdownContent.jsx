import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

/**
 * MarkdownContent component to fetch and render markdown content from a file.
 * Uses ReactMarkdown with rehypeRaw to allow raw HTML in markdown.
 *
 * @param {Object} props - Component properties
 * @param {string} props.filePath - Path to the markdown file
 * @returns {JSX.Element} Rendered markdown content
 */
export default function MarkdownContent({ filePath }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(filePath)
      .then((res) => res.text())
      .then(setContent);
  }, [filePath]);

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
    >
      {content}
    </ReactMarkdown>
  );
}

MarkdownContent.propTypes = {
  filePath: PropTypes.string.isRequired,
};