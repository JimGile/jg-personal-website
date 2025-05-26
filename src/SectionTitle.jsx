// src/ContactItem.js
import React from 'react';
import PropTypes from 'prop-types';

function SectionTitle({ children }) {
    return (
        <h1>
            {children}
        </h1>
    );
}

SectionTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SectionTitle;