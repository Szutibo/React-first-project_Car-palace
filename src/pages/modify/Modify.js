import React, { useEffect, useState } from 'react';
import '../ModifyAndSell.css';
import '../Pages.css';
import { Button } from 'react-bootstrap';
import {
  fetchCarById as getRequest,
  deleteCarById as deleteRequest,
  modifyCarById as putRequest
} from '../../components/fetch/Fetch';
import { validateModify as validate } from '../../components/utility/Utility';

// MUI imports
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';

let postBodyObject = {};

const Modify = () => {
  const [stateData, setStateData] = useState({
    id: '',
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
  const [fetchedCars, setFetchedCars] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [formErrors, setFormErrors] = useState([]);
  const [containerDisplay, setContainerDisplay] = useState('none');
  const [httpErrors, setHttpErrors] = useState(null);
  const [alertDisplay, setAlertDisplay] = useState('none');
  const [alertData, setAlertData] = useState('');
  const initialStateData = {
    id: '',
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

  const clearState = () => {
    setStateData({ ...initialStateData });
    setAlertDisplay('none');
  };

  const dataPusher = (value, nameOfInput) => {
    postBodyObject = {
      ...postBodyObject,
      [nameOfInput]: value
    }
  };

  const submitButtonChecker = () => {
    if (Object.keys(postBodyObject).length > 0) {
      Object.keys(formErrors).length === 0
        ? setButtonDisabled(false)
        : setButtonDisabled(true)
    } else {
      setButtonDisabled(true)
    }
  };

  useEffect(() => {
    if (stateData.fuelType) {
      dataPusher(stateData.fuelType, 'fuelType');
    }
  }, [stateData.fuelType])

  useEffect(() => {
    if (stateData.condition) {
      dataPusher(stateData.condition, 'condition');
    }
  }, [stateData.condition])

  useEffect(() => {
    setFormErrors(validate(stateData));
  }, [stateData])

  const fetchCarById = async () => {
    try {
      const result = await getRequest(stateData.id);
      if (result) {
        setFetchedCars(result);
        setContainerDisplay('flex');
      }
    } catch (error) {
      setHttpErrors(error.message);
    }
  }

  const deleteCarById = () => {
    deleteRequest(stateData.id);
  }

  const modifyCarById = async () => {
    try {
      const result = await putRequest(stateData.id, postBodyObject);
      if (result) {
        setAlertData('Sikeres m??dos??t??s!');
      }
    } catch (error) {
      setHttpErrors(error.message);
    }
  }

  return (
    <main>
      <div className='container'>
        <form onKeyUp={() => {
          submitButtonChecker();
          setHttpErrors(null);
        }}
        >
          <h1 className='mb-3'>Hirdet??s m??dos??t??sa</h1>
          <div>
            <TextField
              placeholder='Hirdet??s azonos??t??:'
              label='Azonos??t??'
              variant='outlined'
              onChange={(e) => setStateData({ ...stateData, id: e.target.value })}
              id='inputId'
              size='small'
              value={stateData.id}
              color='success'
            />
            <label className='errorContainer'>{formErrors.id}</label>
          </div>
          <Button
            variant='success'
            className='searchBtn mt-3 mb-3'
            onClick={() => {
              fetchCarById();
            }}
          >Keres??s</Button>
          <Alert
            sx={{ maxWidth: 400, display: alertDisplay }}
            className='mx-auto'
            variant='filled'
            severity='success'
          >{alertData}</Alert>
          {httpErrors
            && <Alert
              sx={{ maxWidth: 400 }}
              className='mx-auto'
              variant='outlined'
              severity='error'
            >{httpErrors}</Alert>}
          <hr></hr>
          <div className='inputContainer' style={{ display: containerDisplay }}>
            <div>
              <TextField
                placeholder={fetchedCars.brand}
                label='M??rka'
                variant='outlined'
                onChange={(e) => setStateData({ ...stateData, brand: e.target.value })}
                onKeyUp={() => dataPusher(stateData.brand, 'brand')}
                size='small'
                value={stateData.brand}
                color='success'
              />
              <label className='errorContainer'>{formErrors.brand}</label>
            </div>
            <div>
              <TextField
                placeholder={fetchedCars.model}
                label='Modell'
                variant='outlined'
                onChange={(e) => setStateData({ ...stateData, model: e.target.value })}
                onKeyUp={() => dataPusher(stateData.model, 'model')}
                size='small'
                value={stateData.model}
                color='success'
              />
              <label className='errorContainer'>{formErrors.model}</label>
            </div>
            <div>
              <TextField
                placeholder={fetchedCars.firstRegistration}
                label='??vj??rat'
                variant='outlined'
                onChange={(e) => setStateData({ ...stateData, firstRegistration: e.target.value })}
                onKeyUp={() => dataPusher(stateData.firstRegistration, 'firstRegistration')}
                size='small'
                value={stateData.firstRegistration}
                color='success'
              />
              <label className='errorContainer'>{formErrors.firstRegistration}</label>
            </div>
            <div>
              <TextField
                //placeholder={fetchedCars.mileage}
                label='Fut??steljes??tm??ny'
                variant='outlined'
                onChange={(e) => setStateData({ ...stateData, mileage: e.target.value })}
                onKeyUp={() => dataPusher(stateData.mileage, 'mileage')}
                size='small'
                InputProps={{
                  endAdornment: <InputAdornment position='end'>km</InputAdornment>,
                }}
                value={stateData.mileage}
                color='success'
              />
              <label className='errorContainer'>{formErrors.mileage}</label>
            </div>
            <Box >
              <FormControl sx={{ minWidth: 222 }} size='small'>
                <InputLabel>??zemanyag</InputLabel>
                <Select
                  value={stateData.fuelType}
                  label='??zemanyag'
                  onChange={(e) => {
                    setStateData({ ...stateData, fuelType: e.target.value });
                    setButtonDisabled(false);
                  }}
                  color='success'
                >
                  <MenuItem value='benzin'>benzin</MenuItem>
                  <MenuItem value='d??zel'>d??zel</MenuItem>
                  <MenuItem value='elektromos'>elektromos</MenuItem>
                  <MenuItem value='hybrid'>hybrid</MenuItem>
                </Select>
                <label className='errorContainer'>{formErrors.fuelType}</label>
              </FormControl>
            </Box>
            <Box>
              <FormControl sx={{ minWidth: 222 }} size='small'>
                <InputLabel>??llapot</InputLabel>
                <Select
                  value={stateData.condition}
                  label='??llapot'
                  onChange={(e) => {
                    setStateData({ ...stateData, condition: e.target.value });
                    setButtonDisabled(false);
                  }}
                  color='success'
                >
                  <MenuItem value='hib??tlan'>hib??tlan</MenuItem>
                  <MenuItem value='j??'>j??</MenuItem>
                  <MenuItem value='megviselt'>megviselt</MenuItem>
                  <MenuItem value='bont??sra'>bont??sra</MenuItem>
                </Select>
                <label className='errorContainer'>{formErrors.condition}</label>
              </FormControl>
            </Box>
            <div>
              <TextField
                placeholder={fetchedCars.image}
                label='K??p el??r??si ??tja'
                variant='outlined'
                onChange={(e) => setStateData({ ...stateData, image: e.target.value })}
                onKeyUp={() => dataPusher(stateData.image, 'image')}
                size='small'
                value={stateData.image}
                color='success'
              />
              <label className='errorContainer'>{formErrors.image}</label>
            </div>
            <div>
              <TextField
                //placeholder={fetchedCars.performance}
                label='Teljes??tm??ny'
                variant='outlined'
                onChange={(e) => setStateData({ ...stateData, performance: e.target.value })}
                onKeyUp={() => dataPusher(stateData.performance, 'performance')}
                size='small'
                InputProps={{
                  endAdornment: <InputAdornment position='end'>le</InputAdornment>,
                }}
                value={stateData.performance}
                color='success'
              />
              <label className='errorContainer'>{formErrors.performance}</label>
            </div>
            <div>
              <TextField
                placeholder={fetchedCars.advertTitle}
                label='Hirdet??s c??me'
                variant='outlined'
                onChange={(e) => setStateData({ ...stateData, advertTitle: e.target.value })}
                onKeyUp={() => dataPusher(stateData.advertTitle, 'advertTitle')}
                size='small'
                value={stateData.advertTitle}
                color='success'
              />
              <label className='errorContainer'>{formErrors.advertTitle}</label>
            </div>
            <div>
              <TextField
                placeholder={fetchedCars.advertText}
                label='Hirdet??s sz??vege'
                variant='outlined'
                onChange={(e) => setStateData({ ...stateData, advertText: e.target.value })}
                onKeyUp={() => dataPusher(stateData.advertText, 'advertText')}
                size='small'
                value={stateData.advertText}
                color='success'
              />
              <label className='errorContainer'>{formErrors.advertText}</label>
            </div>
            <div>
              <TextField
                //placeholder={fetchedCars.cost}
                label='V??tel??r'
                variant='outlined'
                onChange={(e) => setStateData({ ...stateData, cost: e.target.value })}
                onKeyUp={() => dataPusher(stateData.cost, 'cost')}
                size='small'
                InputProps={{
                  endAdornment: <InputAdornment position='end'>huf</InputAdornment>,
                }}
                value={stateData.cost}
                color='success'
              />
              <label className='errorContainer'>{formErrors.cost}</label>
            </div>
            <div className='actionButtonContainer'>
              <Button
                variant='success'
                className='ms-2 mt-2 mb-2'
                disabled={buttonDisabled}
                onClick={() => {
                  modifyCarById();
                  setContainerDisplay('none');
                  setAlertDisplay('flex');
                  setTimeout(() => {
                    clearState();
                  }, 2000);
                }}
              >M??dos??t??s</Button>
              <Button
                className='m-2'
                variant='warning'
                onClick={() => {
                  clearState();
                  setContainerDisplay('none');
                }}
              >M??gse</Button>
              <Button
                variant='danger'
                onClick={() => {
                  setContainerDisplay('none');
                  deleteCarById();
                  setAlertDisplay('flex');
                  setAlertData('Sikeres t??rl??s!');
                  setTimeout(() => {
                    clearState();
                  }, 2000);
                }}
              >T??rl??s</Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Modify;