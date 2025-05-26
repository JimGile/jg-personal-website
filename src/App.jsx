// src/App.jsx
import { Box, CssBaseline } from "@mui/material";
import { useState } from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import './App.css';
import AppBarHeader from './AppBarHeader';
import Footer from './AppFooter';
import AppSidebarMenu from "./AppSidebarMenu";
import { MENU_ITEMS } from "./menuConstants";

const menuWidth = 200;

// Main App component
export default function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [menuOpen, setMenuOpen] = useState(() => !isMobile);

  const toggleMenu = (state) => () => {
    setMenuOpen(!menuOpen);
  };

  // This callback will be called by AppSidebarMenu when a menu item is clicked
  const handleMenuItemClick = () => {
    if (isMobile) setMenuOpen(false);
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
            <AppSidebarMenu
              menuItems={MENU_ITEMS}
              menuWidth={menuWidth}
              onMenuItemClick={handleMenuItemClick}
              isMobile={isMobile}
            />
          )}
          {/* Main Content */}
          <Box sx={{ flexGrow: 1, padding: 1, backgroundColor: '#ffffff' }} >
            <Routes>
              {/* Default route redirects to the first menu item */}
              <Route path="/" element={<Navigate to={`/${MENU_ITEMS[0].name.toLowerCase()}`} replace />} />
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
