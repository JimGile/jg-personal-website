import React from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from '@mui/material/Avatar';
import { alpha } from "@mui/material/styles";

const backgroundImageUrl = "/images/image_bg_colorado.png";

const bgImageCss = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: alpha("#000", 0.5), // Add a fallback color with transparency
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
    },
};

const textContent = (
    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Typography
            variant="h4"
            component="h1"
            sx={{
                fontWeight: 'bold',
                textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
        >
            Jim Gile
        </Typography>
        <Typography
            // variant="h6"
            component="p"
            sx={{
                marginTop: 0,
                color: 'grey.200',
                fontSize: { xs: '1rem', md: '1.25rem' },
                fontWeight: '100',
                textShadow: '2px 2px 0px rgba(0, 0, 0, 1)',
            }}
        >
            Software Engineer/Architect | AI Developer | Ski Mountaineer
        </Typography>
    </Box>
);

const avatarImg = (
    <Avatar
        alt="Jim Gile"
        src="/images/profile.png"
        sx={{
            width: 75,
            height: 75,
            border: '2px solid white',
        }}
    />
);

export default function AppBarHeader({ toggleMenu }) {
    return (
        <Box sx={{ position: "relative", zIndex: 2 }}>
            <AppBar position="static" sx={bgImageCss}>
                <Toolbar sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', padding: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu()}>
                            <MenuIcon />
                        </IconButton>
                        {textContent}
                    </Box>
                    {avatarImg}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

AppBarHeader.propTypes = {
    toggleMenu: PropTypes.func.isRequired,
};
