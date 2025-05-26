import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function MountainCard({ mountainItem }) {
  return (
    <Card sx={{ marginBottom: 2, maxWidth: 350}}>
      <CardMedia component="img" height="80" image={mountainItem.image} alt={`${mountainItem.name} image`} />
      <CardHeader
        title={mountainItem.name +`  (${mountainItem.elevation})`}
        sx={{ backgroundColor: 'primary.main', color: 'white', padding: .5, variant: 'h6' }}
      />

      {/* Card Content */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {mountainItem.description}
        </Typography>
      </CardContent>

      {/* Card Actions */}
      <CardActions>
        <Button size="small" color="primary" href={mountainItem.photoAlbum} target="_blank" rel="noopener" >
          Photo Album
        </Button>
      </CardActions>
    </Card>
  );
}

MountainCard.propTypes = {
  mountainItem: PropTypes.object.isRequired,
};

export default MountainCard;