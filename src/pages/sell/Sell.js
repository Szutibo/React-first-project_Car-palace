import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import '../Pages.css';
import '../ModifyAndSell.css';
import './Sell.css';
import { createAdvert as postRequest } from '../../components/fetch/Fetch';
import { validateSell as validate } from '../../components/utility/Utility';

// MUI imports
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Sell = () => {
  const [stateData, setStateData] = useState({
    brand: '',
    model: '',
    firstRegistration: '',
    mileage: '',
    fuelType: '',
    performance: '',
    cost: '',
    condition: '',
    advertText: '',
    advertTitle: '',
    image: ''
  });
  const [createdCar, setCreatedCar] = useState({});
  const [formErrors, setFormErrors] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [alertDisplay, setAlertDisplay] = useState('none');
  const [alertData, setAlertData] = useState('');
  const [httpErrors, setHttpErrors] = useState(null);
  const [open, setOpen] = useState(false);
  const initialStateData = {
    brand: '',
    model: '',
    firstRegistration: '',
    mileage: '',
    fuelType: '',
    performance: '',
    cost: '',
    condition: '',
    advertText: '',
    advertTitle: '',
    image: ''
  };

  const createAdvert = async () => {
    try {
      const result = await postRequest(stateData);
      if (result) {
        setAlertData('Sikeres hirdetésfeladás!');
        setCreatedCar(result);
        setOpen(true);
      }
    } catch (error) {
      setHttpErrors(error.message);
    }
  }

  const clearState = () => {
    setStateData({ ...initialStateData });
  };

  const handleClose = () => {
    setOpen(false);
    clearState();
    setButtonDisabled(true);
  };

  const submitButtonChecker = () => {
    Object.keys(formErrors).length === 0 ? setButtonDisabled(false) : setButtonDisabled(true);
  }

  useEffect(() => {
    setFormErrors(validate(stateData));
  }, [stateData])

  return (
    <main>
      <div className='container'>
        <form>
          <h1>Hirdetés feladása</h1>
          <div className='feedbackContainer'>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
              className='modalContainer'
            >
              <Box>
                <Card>
                  <Alert
                    sx={{ maxWidth: 400, display: alertDisplay }}
                    className='mx-auto'
                    variant='filled'
                    severity='success'
                  >{alertData}</Alert>
                  <CardHeader titleTypographyProps={{ variant: 'h4' }} title={createdCar.advertTitle} />
                  <CardMedia
                    className='simpleCardImageContainer'
                    component='img'
                    height='300'
                    src={createdCar.image}
                    alt={createdCar.brand}
                  />
                  <CardContent className='feedbackCardContent'>
                    <div>
                      <Typography variant='body2' color='text.secondary'>
                        Márka: {createdCar.brand}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Típus: {createdCar.model}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Évjárat: {createdCar.firstRegistration}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Futásteljesítmény: {createdCar.mileage} km
                      </Typography>
                      <Typography variant='h6' color='text.primary'>
                        Vételár: {createdCar.cost} huf
                      </Typography>
                    </div>
                    <div>
                      <Typography variant='body2' color='text.secondary'>
                        Üzem: {createdCar.fuelType}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Teljesítmény: {createdCar.performance} le
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Állapot: {createdCar.condition}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Hirdetésazonosító: {createdCar.id}
                      </Typography>
                      <Typography paragraph>Hirdetés szövege:</Typography>
                      <Typography paragraph>
                        {createdCar.advertText}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Box>
            </Modal>
          </div>
          {httpErrors
            && <Alert
              sx={{ maxWidth: 400 }}
              className='mx-auto'
              variant='outlined'
              severity='error'
            >{httpErrors}</Alert>}
          <hr></hr>
          <div
            onKeyUp={() => {
              setHttpErrors(null);
              submitButtonChecker();
            }}
            className='inputContainer'
          >
            <div>
              <TextField
                label='Márka'
                variant='outlined'
                onChange={(e) => setStateData({ ...stateData, brand: e.target.value })}
                size='small'
                required
                color='success'
                value={stateData.brand}
              />
              <label style={{ display: 'block' }} className='errorContainer'>{formErrors.brand}</label>
            </div>
            <div>
              <TextField
                label='Modell'
                variant='outlined'
                onChange={(e) => setStateData({ ...stateData, model: e.target.value })}
                size='small'
                required
                color='success'
                value={stateData.model}
              />
              <label className='errorContainer'>{formErrors.model}</label>
            </div>
            <div>
              <TextField
                label='Évjárat'
                placeholder='YYYY-MM-DD'
                variant='outlined'
                onChange={(e) => setStateData({ ...stateData, firstRegistration: e.target.value })}
                size='small'
                required
                color='success'
                value={stateData.firstRegistration}
              />
              <label className='errorContainer'>{formErrors.firstRegistration}</label>
            </div>
            <div>
              <TextField
                label='Futásteljesítmény'
                variant='outlined'
                onChange={(e) => setStateData({ ...stateData, mileage: e.target.value })}
                size='small'
                required
                InputProps={{
                  endAdornment: <InputAdornment position='end'>km</InputAdornment>,
                }}
                color='success'
                value={stateData.mileage}
              />
              <label className='errorContainer'>{formErrors.mileage}</label>
            </div>
            <Box>
              <FormControl sx={{ minWidth: 222 }} size='small'>
                <InputLabel>Üzemanyag típusa</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  value={stateData.fuelType}
                  label='Üzemanyag'
                  onChange={(e) => setStateData({ ...stateData, fuelType: e.target.value })}
                  color='success'
                >
                  <MenuItem value='benzin'>benzin</MenuItem>
                  <MenuItem value='dízel'>dízel</MenuItem>
                  <MenuItem value='elektromos'>elektromos</MenuItem>
                  <MenuItem value='hybrid'>hybrid</MenuItem>
                </Select>
                <label className='errorContainer'>{formErrors.fuelType}</label>
              </FormControl>
            </Box>
            <Box>
              <FormControl sx={{ minWidth: 222 }} size='small'>
                <InputLabel>Állapot</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  value={stateData.condition}
                  label='állapot'
                  onChange={(e) => setStateData({ ...stateData, condition: e.target.value })}
                  color='success'
                >
                  <MenuItem value='hibátlan'>hibátlan</MenuItem>
                  <MenuItem value='jó'>jó</MenuItem>
                  <MenuItem value='megviselt'>megviselt</MenuItem>
                  <MenuItem value='bontásra'>bontásra</MenuItem>
                </Select>
                <label className='errorContainer'>{formErrors.condition}</label>
              </FormControl>
            </Box>
            <div>
              <TextField
                label='Kép elérési útja'
                variant='outlined'
                onChange={(e) => setStateData({ ...stateData, image: e.target.value })}
                size='small'
                required
                color='success'
                value={stateData.image}
              />
              <label className='errorContainer'>{formErrors.image}</label>
            </div>
            <div>
              <TextField
                label='Teljesítmény'
                variant='outlined'
                onChange={(e) => setStateData({ ...stateData, performance: e.target.value })}
                size='small'
                required
                InputProps={{
                  endAdornment: <InputAdornment position='end'>le</InputAdornment>,
                }}
                color='success'
                value={stateData.performance}
              />
              <label className='errorContainer'>{formErrors.performance}</label>
            </div>
            <div>
              <TextField
                label='Hirdetés címe'
                variant='outlined'
                onChange={(e) => setStateData({ ...stateData, advertTitle: e.target.value })}
                size='small'
                required
                color='success'
                value={stateData.advertTitle}
              />
              <label className='errorContainer'>{formErrors.advertTitle}</label>
            </div>
            <div>
              <TextField
                label='Hirdetés szövege'
                variant='outlined'
                onChange={(e) => setStateData({ ...stateData, advertText: e.target.value })}
                size='small'
                required
                color='success'
                value={stateData.advertText}
              />
              <label className='errorContainer'>{formErrors.advertText}</label>
            </div>
            <div>
              <TextField
                label='Vételár'
                variant='outlined'
                onChange={(e) => setStateData({ ...stateData, cost: e.target.value })}
                size='small'
                required
                InputProps={{
                  endAdornment: <InputAdornment position='end'>huf</InputAdornment>,
                }}
                color='success'
                value={stateData.cost}
              />
              <label className='errorContainer'>{formErrors.cost}</label>
            </div>
            <div className='actionButtonContainer'>
              <Button
                disabled={buttonDisabled}
                variant='success'
                className='ms-3'
                onClick={() => {
                  setAlertDisplay('flex');
                  createAdvert(stateData);
                }}
              >Hirdetés feladása</Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Sell