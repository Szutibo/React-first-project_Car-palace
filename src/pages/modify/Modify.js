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

  function inputDataChecker(value, nameOfInput) {

    if (value.length > 0) {
      setButtonDisabled(false);
      postBodyObject = {
        ...postBodyObject,
        [nameOfInput]: value
      }
    } else {
      setButtonDisabled(true);
    }
  }

  useEffect(() => {
    dataPusher(stateData.fuelType, 'fuelType');
  }, [stateData.fuelType])

  useEffect(() => {
    dataPusher(stateData.condition, 'condition');
  }, [stateData.condition])

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
        <form className='searchFieldBox mb-4 mx-auto col-8'>
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
              <TextField
                placeholder={fetchedCars.brand}
                label="Márka"
                variant="outlined"
                onChange={(e) => setStateData({ ...stateData, brand: e.target.value })}
                onKeyUp={() => inputDataChecker(stateData.brand, 'brand')}
                size='small'
                value={stateData.brand}
                color='success'
              />
              <TextField
                placeholder={fetchedCars.model}
                label="Modell"
                variant="outlined"
                onChange={(e) => setStateData({ ...stateData, model: e.target.value })}
                onKeyUp={() => inputDataChecker(stateData.model, 'model')}
                size='small'
                value={stateData.model}
                color='success'
              />
              <TextField
                placeholder={fetchedCars.firstRegistration}
                label="Évjárat"
                variant="outlined"
                onChange={(e) => setStateData({ ...stateData, firstRegistration: e.target.value })}
                onKeyUp={() => inputDataChecker(stateData.firstRegistration, 'firstRegistration')}
                size='small'
                value={stateData.firstRegistration}
                color='success'
              />
              <TextField
                //placeholder={fetchedCars.mileage}
                label="Futásteljesítmény"
                variant="outlined"
                onChange={(e) => setStateData({ ...stateData, mileage: e.target.value })}
                onKeyUp={() => inputDataChecker(stateData.mileage, 'mileage')}
                size='small'
                value={stateData.mileage}
                color='success'
              />
              <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ minWidth: 180 }} size='small'>
                  <InputLabel>Üzemanyag típusa:</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={stateData.fuelType}
                    label="üzemanyag"
                    onChange={(e) => {
                      setStateData({ ...stateData, fuelType: e.target.value });
                      setButtonDisabled(false);
                    }}
                  >
                    <MenuItem value='benzin'>benzin</MenuItem>
                    <MenuItem value='dízel'>dízel</MenuItem>
                    <MenuItem value='elektromos'>elektromos</MenuItem>
                    <MenuItem value='hybrid'>hybrid</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <TextField
                //placeholder={fetchedCars.performance}
                label="Teljesítmény"
                variant="outlined"
                onChange={(e) => setStateData({ ...stateData, performance: e.target.value })}
                onKeyUp={() => inputDataChecker(stateData.performance, 'performance')}
                size='small'
                value={stateData.performance}
                color='success'
              />
              <TextField
                //placeholder={fetchedCars.cost}
                label="Vételár"
                variant="outlined"
                onChange={(e) => setStateData({ ...stateData, cost: e.target.value })}
                onKeyUp={() => inputDataChecker(stateData.cost, 'cost')}
                size='small'
                value={stateData.cost}
                color='success'
              />
              <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ minWidth: 180 }} size='small'>
                  <InputLabel>Állapot:</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={stateData.condition}
                    label="állapot"
                    onChange={(e) => {
                      setStateData({ ...stateData, condition: e.target.value });
                      setButtonDisabled(false);
                    }}
                  >
                    <MenuItem value='hibátlan'>hibátlan</MenuItem>
                    <MenuItem value='jó'>jó</MenuItem>
                    <MenuItem value='megviselt'>megviselt</MenuItem>
                    <MenuItem value='bontásra'>bontásra</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <TextField
                //placeholder={fetchedCars.advertTitle}
                label="Hirdetés címe"
                variant="outlined"
                onChange={(e) => setStateData({ ...stateData, advertTitle: e.target.value })}
                onKeyUp={() => inputDataChecker(stateData.advertTitle, 'advertTitle')}
                size='small'
                value={stateData.advertTitle}
                color='success'
              />
              <TextField
              //  placeholder={fetchedCars.image}
                label="Kép elérési útja"
                variant="outlined"
                onChange={(e) => setStateData({ ...stateData, image: e.target.value })}
                onKeyUp={() => inputDataChecker(stateData.image, 'image')}
                size='small'
                value={stateData.image}
                color='success'
              />
              <TextField
                //placeholder={fetchedCars.advertText}
                label="Hirdetés szövege"
                variant="outlined"
                onChange={(e) => setStateData({ ...stateData, advertText: e.target.value })}
                onKeyUp={() => inputDataChecker(stateData.advertText, 'advertText')}
                size='small'
                value={stateData.advertText}
                color='success'
              />
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