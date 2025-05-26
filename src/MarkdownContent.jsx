import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

const MarkdownContent = ({ filePath }) => {
  const [markdown, setMarkdown] = useState('Loading content...');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch the markdown file
    const fetchMarkdown = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(filePath);

        if (!response.ok) {
          throw new Error(`Failed to load markdown: ${response.status} ${response.statusText}`);
        }

        const text = await response.text();
        setMarkdown(text);
        setError(null);
      } catch (err) {
        console.error('Error loading markdown:', err);
        setError(`Error loading content: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkdown();
  }, [filePath]); // Re-fetch when filePath changes

  if (isLoading) {
    return <div className="animate-pulse p-4">Loading content...</div>;
  }

  if (error) {
    return <div className="text-red-600 p-4 bg-red-100 rounded">{error}</div>;
  }

  // Using ReactMarkdown component to render the content
  return <ReactMarkdown>{markdown}</ReactMarkdown>;
};

MarkdownContent.propTypes = {
  filePath: PropTypes.string.isRequired,
};

export default MarkdownContent;