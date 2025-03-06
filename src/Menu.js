// src/Menu.js
import React, { useState } from 'react';
import About from './About';
import AiAndMl from './AiAndMl';
import AppDevelopment from './AppDevelopment';
import Climbing from './Climbing';
import Contact from './Contact';


function Menu() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('About');

  const menuItems = [
    { name: 'About', component: <About /> },
    { name: 'AI and Machine Learning', component: <AiAndMl /> },
    { name: 'Application Development', component: <AppDevelopment /> },
    { name: 'Climbing Expeditions', component: <Climbing /> },
    { name: 'Contact', component: <Contact /> },
  ];

  return (
    <div className="menu">
        {menuItems.map((menuItem, index) => (
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

export default Menu;