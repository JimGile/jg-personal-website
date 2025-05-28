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

const menuWidth = 240;

// Helper to flatten menu items for routing
function flattenMenuItems(items) {
  let flat = [];
  for (const item of items) {
    if (item.type === 'link' && item.path && item.component) {
      flat.push(item);
    }
    if (item.children && item.children.length) {
      flat = flat.concat(flattenMenuItems(item.children));
    }
  }
  return flat;
}

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

  const flatMenuItems = flattenMenuItems(MENU_ITEMS);

  return (
    <Router>
      <Box className="site-container App" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
          <Box sx={{ flexGrow: 1, padding: 0.125, backgroundColor: '#ffffff' }} >
            <Routes>
              {/* Default route redirects to the first link-type menu item */}
              <Route path="/" element={<Navigate to={flatMenuItems[0].path} replace />} />
              {flatMenuItems.map((menuItem) => (
                <Route
                  key={menuItem.path}
                  path={menuItem.path}
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
