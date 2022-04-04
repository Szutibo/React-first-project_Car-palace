import React, { useState } from 'react';
import './Modify.css';
import { Button } from 'react-bootstrap';

// Components
import InputComponent from './Input';
//import AuthenticationComponent from '../../components/authentication/AuthenticationComponent';

const Modify = () => {
  const [id, setID] = useState();  

  /*useEffect(() => {
    fetch(`http://localhost:3001/search`)
     .then((response) => {
       if (!response.ok) {
         throw new Error(
           `HTTP hiba történt: státuszkód: ${response.status}`
         );
       }
       return response.json();
     })
     .then((actualData) => console.log(actualData))
     .catch((err) => console.log(err.message))
   }, []);*/

   const fetchCar = (id) => {
    fetch(`http://localhost:3001/modify/search/:${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `HTTP hiba történt: státuszkód ${response.status}`
        );
      }
      return response.json();
    })
    .then((actualData) => console.log(actualData))
    .catch((err) => alert(err.message))
   }

  return (
    <main>
      <div className='modifyBox mx-auto'>
        <div className='searchFieldBox mb-4 mx-auto col-8'>
          <h1 className='mb-3'>Hirdetés módosítása</h1>
          <InputComponent onInputChange={setID} value={id} />
          <Button variant='success' className='searchBtn ms-3' onClick={fetchCar} >Keresés</Button>
        </div>
        <div className='modifyItemBox col-8 mx-auto'>
          <div className='modifyItemImgBox'>
            <img src='' /*{url}*/ alt='' /*{url.split('.')[0]}*/ title='' />
          </div>
          <div className='modifyItemPropertyBox ms-4'>
            <div>
              <input className='brand' placeholder='' />
            </div>
            <div>
              <input className='model' placeholder='' />
            </div>
            <div>
              <input className='firstRegistration' placeholder='' />
            </div>
            <div>
              <input className='mileage' placeholder='' />
            </div>
            <div>
              <input className='fuelType' placeholder='' />
            </div>
            <div>
              <input className='performance' placeholder='' />
            </div>
            <div>
              <input className='cost' placeholder='' />
            </div>
            <div>
              <input className='condition' placeholder='' />
            </div>
            <div>
              <input className='advertText' placeholder='' />
            </div>
            <div>
              <input className='advertTitle' placeholder='' />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Modify;
