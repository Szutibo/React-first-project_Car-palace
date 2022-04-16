import React, { useEffect, useState } from 'react'

// Card component imports
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Search = () => {
  const [cars, setCars] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const images = require.context('../../../public/img', true);


  // Fetch carData
  const getCars = () => {
    fetch('http://localhost:3001/search')
      .then((result) => result.json())
      .then((data) => {
        setCars(data);
      })
      .catch((error) => {
        console.log('error msg', error);
      });
  };

  useEffect(() => {
    getCars();
  }, []);

  // Card element expand function
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;

    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className='cardContainer'>
      {
        cars.map((oneCar) => {
          let imageUrl = '';

          if (oneCar.image.includes('http')) {
            imageUrl = oneCar.image;
          } else {
            imageUrl = images(`./${oneCar.image}`);
          }

          return (
            <Card key={oneCar.id} sx={{ maxWidth: 345 }}>
              <CardHeader title={oneCar.advertTitle} />
              <CardMedia
                component="img"
                height="194"
                src={imageUrl}
                alt={oneCar.advertTitle}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Márka: {oneCar.brand}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Típus: {oneCar.model}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Első forgalomba helyezés dátuma: {oneCar.firstRegistration}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Futásteljesítmény: {oneCar.mileage} km
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Üzem: {oneCar.fuelType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Teljesítmény: {oneCar.performance} le
                </Typography>
                <Typography variant="h5" color="text.primary">
                  Vételár: {oneCar.cost} huf
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Állapot: {oneCar.condition}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hirdetésazonosító: {oneCar.id}
                  </Typography>
                  <Typography paragraph>Hirdetés szövege:</Typography>
                  <Typography paragraph>
                    {oneCar.advertText}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          )
        })
      }
    </div>
  );
}

export default Search