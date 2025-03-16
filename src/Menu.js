// src/Menu.js
import React from 'react';
import PropTypes from 'prop-types';
import { MENU_ITEMS } from './menuConstants';

function Menu({ selectedMenuItem, setSelectedMenuItem }) {

  return (
    <div className="menu">
        {MENU_ITEMS.map((menuItem, index) => (
        <div
            key={index}
            className={`menu-item ${selectedMenuItem === menuItem.name ? 'selected' : ''}`}
            role="menuitem"
            tabIndex={0}
            onClick={() => setSelectedMenuItem(menuItem.name)}
            onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                setSelectedMenuItem(menuItem.name);
            }
            }}
        >
            <h5>{menuItem.name}</h5>
        </div>
        ))}
    </div>
  );
}

Menu.propTypes = {
  selectedMenuItem: PropTypes.string.isRequired,
  setSelectedMenuItem: PropTypes.func.isRequired,
};

export default Menu;