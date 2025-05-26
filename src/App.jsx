// src/App.jsx
import { Box, CssBaseline } from "@mui/material";
import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import AppBarHeader from './AppBarHeader';
import Footer from './AppFooter';
import AppSidebarMenu from "./AppSidebarMenu";
import { MENU_ITEMS } from "./menuConstants";

const menuWidth = 200;

// Main App component
export default function App() {
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = (state) => () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <Box className="App" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CssBaseline />
        <AppBarHeader toggleMenu={toggleMenu} />
        {/* Main Layout */}
        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'row' }}>
          {/* Sidebar Menu */}
          {menuOpen && (
              <AppSidebarMenu menuItems={MENU_ITEMS} menuWidth={menuWidth} />
          )}
          {/* Main Content */}
          <Box sx={{ flexGrow: 1, padding: 1, backgroundColor: '#ffffff' }} >
            <Routes>
              {MENU_ITEMS.map((menuItem) => (
                <Route
                  key={menuItem.name}
                  path={`/${menuItem.name.toLowerCase()}`}
                  element={menuItem.component}
                />
              ))}
            </Routes>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}
