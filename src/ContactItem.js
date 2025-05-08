// src/ContactItem.js
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ContactItem({ icon: IconComponent, label, children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
      {/* Icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 0.5 }}>
        <IconComponent sx={{ color: 'primary.main', fontSize: 24 }} aria-hidden="true" />
      </Box>

      {/* Label and Content */}
      <Box>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
        <Typography variant="body1" sx={{ mt: 0.5, color: 'text.primary' }}>
          {children}
        </Typography>
      </Box>
    </Box>
  );
}

ContactItem.propTypes = {
  icon: PropTypes.elementType.isRequired, // Updated to accept a React component
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ContactItem;