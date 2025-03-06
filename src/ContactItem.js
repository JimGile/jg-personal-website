// src/ContactItem.js
import React from 'react';
import PropTypes from 'prop-types';

function ContactItem({ icon, label, children }) {
    return (
        <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
                <i className={`${icon} text-blue-500 w-5 text-center`} aria-hidden="true"></i>
            </div>
            <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-500">{label}</h4>
                <div className="mt-1 text-base text-gray-800">{children}</div>
            </div>
        </div>
    );
}

ContactItem.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ContactItem;