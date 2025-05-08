// src/Header.js
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Header() {
  return (
    <header>
      <Box
        className="header-bg"
        sx={{
          padding: 3,
          color: 'white',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 3,
          }}
        >
          {/* Profile Image */}
          <Avatar
            alt="Jim Gile"
            src="/images/profile.png"
            sx={{
              width: { xs: 112, md: 128 }, // Responsive width
              height: { xs: 112, md: 128 }, // Responsive height
              border: '4px solid white',
            }}
          />

          {/* Text Content */}
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
              variant="h6"
              component="p"
              sx={{
                marginTop: 0,
                fontWeight: '300',
                textShadow: '0px 1px 3px rgba(0, 0, 0, 0.5)',
              }}
            >
              Enterprise Software Engineer/Architect | AI Solutions Developer | Ski Mountaineer
            </Typography>
          </Box>
        </Box>
      </Box>
    </header>
  );
}

export default Header;
