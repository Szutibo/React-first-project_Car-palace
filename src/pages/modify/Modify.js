import React, { useState } from 'react';
import './Modify.css';
import { Button } from 'react-bootstrap';

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

  // Kezdetleges validáció, refactopringot igényel
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
          <input
            type='number'
            placeholder='Kérem adja meg a keresett hirdetés azonosítóját!'
            onChange={(e) => setStateData({ ...stateData, id: e.target.value })}
            value={stateData.id}
            id='inputId'
          />          
          <Button variant='success' className='searchBtn ms-3' onClick={fetchCarById} >Keresés</Button>
        </form>
        <div id='modifyItemBox' className='modifyItemBox col-8 mx-auto'>
          <div className='modifyItemPropertyBox ms-4'>
            <div>
              <p>Típus:</p>
              <input
                value={stateData.brand}
                placeholder={fetchedCars.brand}
                className='brand'
                onKeyUp={() => inputDataChecker(stateData.brand, 'brand')}
                onChange={(e) => setStateData({ ...stateData, brand: e.target.value })}
              />
            </div>
            <div>
              <p>Modell:</p>
              <input
                value={stateData.model}
                className='model'
                placeholder={fetchedCars.model}
                onKeyUp={() => inputDataChecker(stateData.model, 'model')}
                onChange={(e) => setStateData({ ...stateData, model: e.target.value })}
              />
            </div>
            <div>
              <p>Évjárat:</p>
              <input
                value={stateData.firstRegistration}
                className='firstRegistration'
                placeholder={fetchedCars.firstRegistration}
                onKeyUp={() => inputDataChecker(stateData.firstRegistration, 'firstRegistration')}
                onChange={(e) => setStateData({ ...stateData, firstRegistration: e.target.value })}
              />
            </div>
            <div>
              <p>Futásteljesítmény:</p>
              <input
                value={stateData.mileage}
                className='mileage'
                placeholder={fetchedCars.mileage}
                onKeyUp={() => inputDataChecker(stateData.mileage, 'mileage')}
                onChange={(e) => setStateData({ ...stateData, mileage: e.target.value })}
              />
            </div>
            <div>
              <p>Üzemanyag típusa:</p>
              <input
                value={stateData.fuelType}
                className='fuelType'
                placeholder={fetchedCars.fuelType}
                onKeyUp={() => inputDataChecker(stateData.fuelType, 'fuelType')}
                onChange={(e) => setStateData({ ...stateData, fuelType: e.target.value })}
              />
            </div>
            <div>
              <p>Teljesítmény:</p>
              <input
                value={stateData.performance}
                className='performance'
                placeholder={fetchedCars.performance}
                onKeyUp={() => inputDataChecker(stateData.performance, 'performance')}
                onChange={(e) => setStateData({ ...stateData, performance: e.target.value })}
              />
            </div>
            <div>
              <p>Vételár:</p>
              <input
                value={stateData.cost}
                className='cost'
                placeholder={fetchedCars.cost}
                onKeyUp={() => inputDataChecker(stateData.cost, 'cost')}
                onChange={(e) => setStateData({ ...stateData, cost: e.target.value })}
              />
            </div>
            <div>
              <p>Állapot:</p>
              <input
                value={stateData.condition}
                className='condition'
                placeholder={fetchedCars.condition}
                onKeyUp={() => inputDataChecker(stateData.condition, 'condition')}
                onChange={(e) => setStateData({ ...stateData, condition: e.target.value })}
              />
            </div>
            <div>
              <p>Hirdetés címe:</p>
              <input
                value={stateData.advertTitle}
                className='advertTitle'
                placeholder={fetchedCars.advertTitle}
                onKeyUp={() => inputDataChecker(stateData.advertTitle, 'advertTitle')}
                onChange={(e) => setStateData({ ...stateData, advertTitle: e.target.value })}
              />
            </div>
            <div>
              <p>Hirdetés szövege:</p>
              <textarea
                value={stateData.advertText}
                rows="4"
                cols="30"
                className='advertText'
                placeholder={fetchedCars.advertText}
                onKeyUp={() => inputDataChecker(stateData.advertText, 'advertText')}
                onChange={(e) => setStateData({ ...stateData, advertText: e.target.value })}
              />
            </div>
            <div>
              <p>Kép elérési útja:</p>
              <input
                value={stateData.image}
                className='image'
                placeholder={fetchedCars.image}
                onKeyUp={() => inputDataChecker(stateData.image, 'image')}
                onChange={(e) => setStateData({ ...stateData, image: e.target.value })}
              />
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

export default Modify;