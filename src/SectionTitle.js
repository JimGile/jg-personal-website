// src/ContactItem.js
import React from 'react';
import PropTypes from 'prop-types';

function SectionTitle({ children }) {
    return (
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
            {children}
        </h2>
    );
}

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionTitle;