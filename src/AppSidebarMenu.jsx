import { Box, List, ListItem, ListItemText } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ menuItems, menuWidth, onMenuItemClick }) {
    const navigate = useNavigate();

    return (
        <Box component="nav" aria-label="Sidebar Menu" sx={{ width: menuWidth, flexShrink: 0, padding: 2, borderRight: '1px solid rgba(0, 0, 0, 0.12)', backgroundColor: '#f4f4f4', }}>
            <List>
                {menuItems.map((menuItem) => (
                    <ListItem
                        button
                        key={menuItem.name}
                        onClick={() => {
                            navigate(`/${menuItem.name.toLowerCase()}`);
                            if (onMenuItemClick) onMenuItemClick();
                        }}
                    >
                        <ListItemText primary={menuItem.name} />
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

Sidebar.propTypes = {
    menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    menuWidth: PropTypes.number,
    onMenuItemClick: PropTypes.func,
};
