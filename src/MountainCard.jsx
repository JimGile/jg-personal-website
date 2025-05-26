import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Link from '@mui/material/Link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

// Styled component for the expand icon button
const ExpandMore = styled((props) => {
  const { expand, ...other } = props; // eslint-disable-line no-unused-vars
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const MountainCard = ({ mountain }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Helper to safely parse coordinates
  const getCoordinates = () => {
    if (!mountain['Latitude'] || !mountain['Longitude']) return null;
    const lat = parseFloat(mountain['Latitude']);
    const lng = parseFloat(mountain['Longitude']);
    if (!isNaN(lat) && !isNaN(lng)) {
      return { lat, lng };
    }
    return null;
  };

  const coordinates = getCoordinates();

  // Helper to make source URL clickable if present
  const getSourceLink = (sourceText) => {
    if (!sourceText) return sourceText;
    const urlRegex = /\((https?:\/\/[^\s)]+)\)/;
    const match = sourceText.match(urlRegex);
    
    if (match && match[1]) {
      const textBeforeLink = sourceText.substring(0, match.index).trim();
      const url = match[1];
      return (
        <>
          {textBeforeLink}{textBeforeLink && textBeforeLink.slice(-1) !== ':' ? ": " : " "}
          <Link href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </Link>
        </>
      );
    }
    return sourceText;
  };

  if (!mountain) {
    return <Typography>No mountain data provided.</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 700, margin: 'auto', my: 2, boxShadow: 3 }}>
      {mountain['Image URL'] && (
        <CardMedia
          component="img"
          height="300"
          image={mountain['Image URL']}
          alt={`Image of ${mountain['Mountain Name']}`}
          sx={{ objectFit: 'cover' }}
        />
      )}

      <Box
        sx={{
          backgroundColor: 'primary.main', // Using theme's primary color for blue
          color: 'primary.contrastText',   // Text color for contrast on blue
          padding: theme => theme.spacing(1.5, 2),
        }}
      >
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }} gutterBottom>
          {mountain['Mountain Name'] || 'N/A'}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="subtitle1" sx={{ mr: 1 }}>
            Elevation: {mountain['Elevation (Feet)'] || 'N/A'} / {mountain['Elevation (Meters)'] || 'N/A'}
          </Typography>
          <Typography variant="subtitle1">
            Country: {mountain['Country'] || 'N/A'}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ pb: 0 }}>
        {mountain['Description'] && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            <strong>Description:</strong> {mountain['Description']}
          </Typography>
        )}
        {mountain['Local Name(s)'] && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            <strong>Local Name(s):</strong> {mountain['Local Name(s)']}
          </Typography>
        )}
        {mountain['Interesting Facts'] && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            <strong>Interesting Facts:</strong> {mountain['Interesting Facts']}
          </Typography>
        )}
      </CardContent>

      <CardActions disableSpacing sx={{ pt: 0, px: 2, pb: 1 }}>
        <Typography variant="button" sx={{ color: 'text.secondary', marginRight: 1 }}>
          More Details
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more details"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 0 }}>
          {mountain['Mountain Range'] && (
            <Typography sx={{ mb: 2 }}>
              <strong>Mountain Range:</strong> {mountain['Mountain Range']}
            </Typography>
          )}
          {mountain['Year First Climbed'] && (
            <Typography sx={{ mb: 2 }}>
              <strong>Year First Climbed:</strong> {mountain['Year First Climbed']}
            </Typography>
          )}
          {mountain['Source(s)'] && (
            <Typography component="div" sx={{ mb: 2 }}>
              <strong>Source(s):</strong> {getSourceLink(mountain['Source(s)'])}
            </Typography>
          )}
          {coordinates ? (
            <Box mt={2}>
              <Typography variant="h6" gutterBottom component="div">
                Location Map
              </Typography>
              <iframe
                title={`Map of ${mountain['Mountain Name']}`}
                width="100%"
                height="350"
                style={{ border: 0, borderRadius: '4px' }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=9&output=embed`}
              ></iframe>
            </Box>
          ) : (
            mountain['Latitude'] && mountain['Longitude'] && (
              <Typography color="error" sx={{ mb: 2 }}>
                Map coordinates are invalid.
              </Typography>
            )
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

MountainCard.propTypes = {
  mountain: PropTypes.shape({
    'Image URL': PropTypes.string,
    'Mountain Name': PropTypes.string.isRequired,
    'Country': PropTypes.string,
    'Elevation (Feet)': PropTypes.string,
    'Elevation (Meters)': PropTypes.string,
    'Description': PropTypes.string,
    'Local Name(s)': PropTypes.string,
    'Interesting Facts': PropTypes.string,
    'Mountain Range': PropTypes.string,
    'Year First Climbed': PropTypes.string,
    'Source(s)': PropTypes.string,
    'Latitude': PropTypes.string,
    'Longitude': PropTypes.string,
  }).isRequired,
};
export default MountainCard;