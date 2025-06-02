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
    if (item.children?.length) {
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
        {/* Fixed AppBarHeader at the top */}
        <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: (theme) => theme.zIndex.appBar, maxWidth: '1100px', width: '100%', marginLeft: 'auto', marginRight: 'auto', }}>
          <AppBarHeader toggleMenu={toggleMenu} />
        </Box>
        {/* Main Layout below AppBarHeader */}
        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'row', pt: { xs: '75px' }, minHeight: 0 }}>
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
          <Box sx={{ flexGrow: 1, padding: 0.125, backgroundColor: '#ffffff', overflow: 'hidden', pt: { xs: '48px', sm: '16px' }, minHeight: 0 }} >
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
