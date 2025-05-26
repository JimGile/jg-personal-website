// src/Contact.js
import React from 'react';
import SectionTitle from './SectionTitle';
import ContactItem from './ContactItem';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

function Contact() {
  return (
    <section id="contact">
      <SectionTitle>Contact</SectionTitle>
      <Box sx={{ padding: 1, alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
          <Grid container columns={12} spacing={5}>
            {/* Left Column */}
            <Grid span={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <ContactItem icon={EmailIcon} label="Email">
                  <Link
                    href="mailto:jimgile1@gmail.com"
                    sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    jimgile1@gmail.com
                  </Link>
                </ContactItem>

                <ContactItem icon={LocationOnIcon} label="Location">
                  Denver, CO
                </ContactItem>
              </Box>
            </Grid>

            {/* Right Column */}
            <Grid span={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <ContactItem icon={LinkedInIcon} label="LinkedIn">
                  <Link
                    href="https://www.linkedin.com/in/james-gile"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    linkedin.com/in/james-gile/
                  </Link>
                </ContactItem>

                <ContactItem icon={GitHubIcon} label="GitHub">
                  <Link
                    href="https://github.com/JimGile"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    github.com/JimGile
                  </Link>
                </ContactItem>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </section>
  );
}

export default Contact;
