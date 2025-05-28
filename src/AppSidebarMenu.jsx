import { Box, List, ListItem, ListItemText, ListSubheader, Divider, ListItemIcon } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import React from "react";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function renderMenuItems(menuItems, navigate, onMenuItemClick, openMenus, handleToggle) {
  return menuItems.map((menuItem) => {
    const key = menuItem.path || menuItem.name;
    if (menuItem.type === 'header') {
      return <ListSubheader key={key}>{menuItem.name}</ListSubheader>;
    }
    if (menuItem.type === 'divider') {
      return <Divider key={key} />;
    }
    if (menuItem.type === 'link') {
      const hasChildren = menuItem.children && menuItem.children.length > 0;
      return (
        <React.Fragment key={key}>
          <ListItem
            button
            onClick={() => {
              if (hasChildren) {
                handleToggle(key);
              } else {
                navigate(menuItem.path);
                if (onMenuItemClick) onMenuItemClick();
              }
            }}
          >
            {menuItem.icon && <ListItemIcon sx={{ minWidth: '35px' }}>{menuItem.icon}</ListItemIcon>}
            <ListItemText primary={menuItem.name} />
            {hasChildren && (openMenus[key] ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>
          {hasChildren && openMenus[key] && (
            <List sx={{ pl: 4 }}>
              {renderMenuItems(menuItem.children, navigate, onMenuItemClick, openMenus, handleToggle)}
            </List>
          )}
        </React.Fragment>
      );
    }
    return null;
  });
}

export default function AppSidebarMenu({ menuItems, menuWidth, onMenuItemClick }) {
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = React.useState({});

  const handleToggle = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Box component="nav" aria-label="Sidebar Menu" sx={{ width: menuWidth, flexShrink: 0, padding: 2, borderRight: '1px solid rgba(0, 0, 0, 0.12)', backgroundColor: '#f4f4f4', }}>
      <List>
        {renderMenuItems(menuItems, navigate, onMenuItemClick, openMenus, handleToggle)}
      </List>
    </Box>
  );
}

AppSidebarMenu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  menuWidth: PropTypes.number,
  onMenuItemClick: PropTypes.func,
};
