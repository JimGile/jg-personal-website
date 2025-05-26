// src/Footer.js
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
    return (
        <footer>
            <Box
                sx={{
                    margin: '0px',
                    paddingX: 2,
                    paddingY: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {/* Copyright Section */}
                <Typography variant="body2" sx={{ marginBottom: 0 }}>
                    &copy; {new Date().getFullYear()} Jim Gile. All rights reserved.
                </Typography>

                {/* Social Media Links */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Link
                        href="https://www.linkedin.com/in/james-gile"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: 'white', '&:hover': { color: 'gray' } }}
                    >
                        <LinkedInIcon fontSize="medium" />
                    </Link>
                    <Link
                        href="https://github.com/JimGile"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: 'white', '&:hover': { color: 'gray' } }}
                    >
                        <GitHubIcon fontSize="medium" />
                    </Link>
                </Box>
            </Box>
        </footer>
    );
}

export default Footer;
