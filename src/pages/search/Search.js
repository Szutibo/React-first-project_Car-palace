import React, { useEffect, useState } from 'react'
import '../Pages.css';
import './Search.css';
import { getCars } from '../../components/fetch/Fetch';

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
import Alert from '@mui/material/Alert';

const Search = () => {
  const [cars, setCars] = useState([]);
  const images = require.context('../../../public/img', true);
  const [expandedId, setExpandedId] = useState(-1);
  const [httpErrors, setHttpErrors] = useState(null);

  // Fetch carData
  const loadCars = async () => {
    try {
      const requestedCarsArray = await getCars();
      setCars(requestedCarsArray);
    } catch (error) {
      setHttpErrors(error.message);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  // Card element expand function
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })
    (({ theme, expand }) => ({
      transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    }));

  const handleExpandClick = (i) => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  return (
    <main className='container'>
      <div className='cardContainer'>
        {httpErrors
          && <Alert
            sx={{ maxWidth: 400 }}
            className='mx-auto'
            variant='outlined'
            severity="error"
          >{httpErrors}</Alert>}
        {
          cars.map((oneCar, i) => {
            let imageUrl = '';

            if (oneCar.image.includes('http')) {
              imageUrl = oneCar.image;
            } else {
              imageUrl = images(`./${oneCar.image}`);
            }

            return (
              <div key={oneCar.id} className='simpleCardContainer'>
                <Card>
                  <CardHeader titleTypographyProps={{ variant: 'h6' }} title={oneCar.advertTitle} />
                  <CardMedia
                    className='simpleCardImageContainer'
                    component="img"
                    height="200"
                    src={imageUrl}
                    alt={oneCar.brand}
                  />
                  <CardContent className='simpleCardContent'>
                    <Typography variant="body2" color="text.secondary">
                      Márka: {oneCar.brand}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Típus: {oneCar.model}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Évjárat: {oneCar.firstRegistration}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Futásteljesítmény: {oneCar.mileage} km
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Üzem: {oneCar.fuelType}
                    </Typography>
                    <Typography variant="h6" color="text.primary">
                      Vételár: {oneCar.cost} huf
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <ExpandMore
                      onClick={() => handleExpandClick(i)}
                      aria-expanded={expandedId === i}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
                    <CardContent className='simpleCardContent'>
                      <Typography variant="body2" color="text.secondary">
                        Teljesítmény: {oneCar.performance} le
                      </Typography>
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
              </div>
            )
          })
        }
      </div>
    </main>
  );
}

export default Search