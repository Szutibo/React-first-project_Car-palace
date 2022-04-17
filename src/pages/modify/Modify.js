import React, { useEffect, useState } from 'react';
import './Modify.css';
import { Button } from 'react-bootstrap';

// MUI imports
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

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
  const [formErrors, setFormErrors] = useState({});

  const validate = (values) => {
    const errors = {};
    const regexForDateFormat = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    const regexUrlFormat = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    const regexNumberFormat = /^\d+$/;

    if (values.brand) {
      if (values.brand.length > 30) {
        errors.brand = 'A gépjármű márkája nem lehet hosszabb 30 karakternél!'
      }
    } 

    if (values.model) {
      if (values.model.length > 40) {
        errors.model = 'A gépjármű típusa nem lehet hosszabb 40 karakternél!'
      }
    } 

    if (values.firstRegistration) {
      if (!regexForDateFormat.test(values.firstRegistration)) {
        errors.firstRegistration = 'Nem megfelelő dátum!'
      }
    } 

    if (values.mileage) {
      if (values.mileage > 1500000) {
        errors.mileage = 'A jármű futásteljesítménye nem lehet nagyobb, mint 1,5millió km!'
      } else if (values.mileage < 0) {
        errors.mileage = 'A futott km nem lehet negatív szám!'
      } else if (!regexNumberFormat.test(values.mileage)) {
        errors.mileage = 'Csak egész szám adható meg!'
      }
    }

    if (values.performance) {
      if (values.performance > 2500) {
        errors.performance = 'A gépjármű teljesítménye nem lehet több, mint 2500 le!'
      } else if (values.performance < 0) {
        errors.performance = 'A gépjármű teljesítménye nem lehet negatív szám!'
      } else if (!regexNumberFormat.test(values.performance)) {
        errors.performance = 'Csak egész szám adható meg!'
      }
    }

    if (values.cost) {
      if (values.cost < 0) {
        errors.cost = 'A vételár nem lehet negatív szám!'
      } else if (values.cost.length > 9) {
        errors.cost = 'A vételár maximum 9 számjegyű lehet!'
      } else if (values.cost.length < 5) {
        errors.cost = 'A vételárnak minimum 5 számjegyűnek kell lennie!'
      } else if (!regexNumberFormat.test(values.cost)) {
        errors.cost = 'Csak egész szám adható meg!'
      }
    }

    if (values.advertTitle) {
      if (values.advertTitle.length > 100) {
        errors.advertTitle = 'A hirdetés címe nem lehet hosszabb, mint 100 karakter!'
      }
    }

    if (values.image) {
      if (!regexUrlFormat.test(values.image)) {
        errors.image = 'Nem megfelelő URL formátum!'
      }
    }

    if (values.advertText) {
      if (values.advertText.length > 150) {
        errors.advertText = 'A hirdetés szövege nem lehet több, mint 150 karakter!'
      }
    }

    return errors;
  }

  const submitButtonChecker = () => {
    if (Object.keys(postBodyObject).length > 0) {
      if (Object.keys(formErrors).length === 0) {
        setButtonDisabled(false)
      } else {
        setButtonDisabled(true)
      }
    } else {
      setButtonDisabled(true)
    }
  }

  useEffect(() => {
    dataPusher(stateData.fuelType, 'fuelType');
  }, [stateData.fuelType])

  useEffect(() => {
    dataPusher(stateData.condition, 'condition');
  }, [stateData.condition])

  useEffect(() => {
    setFormErrors(validate(stateData));
  }, [stateData])

  const fetchCarById = () => {
    fetch(`http://localhost:3001/search/${stateData.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Nem szerepel ilyen azonosítóval jármű az adatbázisban!`
          );
        } else {
          modifyItemBoxShower();
          return response.json();
        }
      })
      .then((actualData) => {
        setFetchedCars(actualData);
      })
      .catch((err) => alert(err.message))
  }

  const deleteCarById = () => {
    fetch(`http://localhost:3001/modify/${stateData.id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: [],
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP hiba történt: státuszkód ${response.status}`
          );
        }
        return response;
      })
      .then(alert('Sikeres törlés!'))
      .then(modifyItemBoxHider())
      .catch((err) => alert(err.message))
  }

  const modifyCarById = () => {
    fetch(`http://localhost:3001/modify/${stateData.id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBodyObject),
    })
      .then(alert('Sikeres módosítás!'))
      .catch((err) => alert(err.message))
  }

  return (
    <main>
      <div className='modifyBox mx-auto'>
        <form
        onChange={() => submitButtonChecker()}
        className='searchFieldBox mb-4 mx-auto col-8'
        >
          <h1 className='mb-3'>Hirdetés módosítása</h1>
          <TextField
            placeholder='Hirdetés azonosító:'
            label="Azonosító"
            variant="outlined"
            onChange={(e) => setStateData({ ...stateData, id: e.target.value })}
            id='inputId'
            size='small'
            value={stateData.id}
            color='success'
            type='number'
          />
          <Button variant='success' className='searchBtn ms-3' onClick={fetchCarById} >Keresés</Button>
          <div id='modifyItemBox' className='modifyItemBox col-8 mx-auto'>
            <div className='modifyItemPropertyBox ms-4'>
              <div>
              <TextField
                placeholder={fetchedCars.brand}
                label="Márka"
                variant="outlined"
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
                label="Modell"
                variant="outlined"
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
                label="Évjárat"
                variant="outlined"
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
                label="Futásteljesítmény"
                variant="outlined"
                onChange={(e) => setStateData({ ...stateData, mileage: e.target.value })}
                onKeyUp={() => dataPusher(stateData.mileage, 'mileage')}
                size='small'
                value={stateData.mileage}
                color='success'
              />
              <label className='errorContainer'>{formErrors.mileage}</label>
              </div>
              <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ minWidth: 180 }} size='small'>
                  <InputLabel>Üzemanyag típusa:</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={stateData.fuelType}
                    label="üzemanyag"
                    onChange={(e) => {
                      setStateData({ ...stateData, fuelType: e.target.value });
                      //setButtonDisabled(false);
                    }}
                  >
                    <MenuItem value='benzin'>benzin</MenuItem>
                    <MenuItem value='dízel'>dízel</MenuItem>
                    <MenuItem value='elektromos'>elektromos</MenuItem>
                    <MenuItem value='hybrid'>hybrid</MenuItem>
                  </Select>
                  <label className='errorContainer'>{formErrors.fuelType}</label>
                </FormControl>
              </Box>
              <div>
              <TextField
                //placeholder={fetchedCars.performance}
                label="Teljesítmény"
                variant="outlined"
                onChange={(e) => setStateData({ ...stateData, performance: e.target.value })}
                onKeyUp={() => dataPusher(stateData.performance, 'performance')}
                size='small'
                value={stateData.performance}
                color='success'
              />
              <label className='errorContainer'>{formErrors.performance}</label>
              </div>
              <div>
              <TextField
                //placeholder={fetchedCars.cost}
                label="Vételár"
                variant="outlined"
                onChange={(e) => setStateData({ ...stateData, cost: e.target.value })}
                onKeyUp={() => dataPusher(stateData.cost, 'cost')}
                size='small'
                value={stateData.cost}
                color='success'
              />
              <label className='errorContainer'>{formErrors.cost}</label>
              </div>
              <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ minWidth: 180 }} size='small'>
                  <InputLabel>Állapot:</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={stateData.condition}
                    label="állapot"
                    onChange={(e) => {
                      setStateData({ ...stateData, condition: e.target.value });
                      //setButtonDisabled(false);
                    }}
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
                //placeholder={fetchedCars.advertTitle}
                label="Hirdetés címe"
                variant="outlined"
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
              //  placeholder={fetchedCars.image}
                label="Kép elérési útja"
                variant="outlined"
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
                //placeholder={fetchedCars.advertText}
                label="Hirdetés szövege"
                variant="outlined"
                onChange={(e) => setStateData({ ...stateData, advertText: e.target.value })}
                onKeyUp={() => dataPusher(stateData.advertText, 'advertText')}
                size='small'
                value={stateData.advertText}
                color='success'
              />
              <label className='errorContainer'>{formErrors.advertText}</label>
              </div>
              <div>
                <Button
                  variant='success'
                  className='searchBtn mt-2'
                  disabled={buttonDisabled}
                  onClick={() => {
                    modifyCarById();
                    inputEraser();
                  }}
                >Módosítás</Button>
                <Button variant='warning' className='searchBtn ms-2 mt-2' onClick={inputEraser} >Mégse</Button>
                <Button variant='danger' className='searchBtn ms-2 mt-2' onClick={deleteCarById} >Törlés</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

// Utility functions
function inputEraser() {
  let input = document.getElementById('inputId');
  input.value = '';
  modifyItemBoxHider();
}

function modifyItemBoxHider() {
  const modifyItemBox = document.getElementById('modifyItemBox');
  modifyItemBox.style.display = 'none';
}

function modifyItemBoxShower() {
  const modifyItemBox = document.getElementById('modifyItemBox');
  modifyItemBox.style.display = 'flex';
}

function dataPusher(value, nameOfInput) {
  postBodyObject = {
    ...postBodyObject,
    [nameOfInput]: value
  }
}

export default Modify;