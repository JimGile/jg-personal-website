// src/AppDevelopment.js
import React from 'react';
import PropTypes from 'prop-types';
import MarkdownContent from './MarkdownContent';

export default function Experience({ title, company, period, mdFilePath }) {
  return (
    <div className="max-w-4xl mx-auto">
        <div className="space-y-10">
            <div className="relative pl-8 md:pl-0">
                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="md:ml-8 relative">
                    <div className="hidden md:block absolute -left-10 top-1 w-5 h-5 rounded-full border-4 border-blue-500 bg-white"></div>
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <div className="flex flex-col md:flex-row md:items-center text-gray-600 mt-1 mb-3">
                        <span className="font-medium">{company}</span>
                        <span className="hidden md:inline mx-2">•</span>
                        <span>{period}</span>
                    </div>
                    <MarkdownContent filePath={mdFilePath} />
                </div>
            </div>
        </div>
    </div>
  );
}

Experience.propTypes = {
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  mdFilePath: PropTypes.string.isRequired,
};
