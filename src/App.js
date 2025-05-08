// src/App.js
import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import Menu from './Menu';
import { getMenuItemComponent } from './menuConstants';
import Box from '@mui/material/Box';
import Footer from './Footer';

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('About');

  return (
    <Box className="App" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      {/* Main Layout */}
      <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'row' }}>
        {/* Sidebar Menu */}
        <Box sx={{ width: '240px', flexShrink: 0, padding: 2, }} >
          <Menu selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem} />
        </Box>
        {/* Main Content */}
        <Box sx={{ flexGrow: 1, padding: 3, backgroundColor: '#ffffff' }} >
          {getMenuItemComponent(selectedMenuItem).component}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
