import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function MountainCard({ name, elevation, description, photoAlbum, image }) {
  return (
    <Card sx={{ marginBottom: 2, maxWidth: 350}}>
      <CardMedia component="img" height="80" image={image} alt={`${name} image`} />
      <CardHeader
        title={name +`  (${elevation})`}
        sx={{ backgroundColor: 'primary.main', color: 'white', padding: .5, variant: 'h6' }}
      />

      {/* Card Content */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>

      {/* Card Actions */}
      <CardActions>
        <Button size="small" color="primary" href={photoAlbum} target="_blank" rel="noopener" >
          Photo Album
        </Button>
      </CardActions>
    </Card>
  );
}

MountainCard.propTypes = {
  name: PropTypes.string.isRequired,
  elevation: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  photoAlbum: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default MountainCard;