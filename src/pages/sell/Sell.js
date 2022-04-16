import React, { useState } from 'react';
import { Button } from 'react-bootstrap';


const Sell = () => {
  const [stateData, setStateData] = useState({
    brand:'',
    model:'',
    firstRegistration:'',
    mileage:'',
    fuelType:'',
    performance:'',
    cost:'',
    condition:'',
    advertText:'',
    advertTitle:'',
    image:''
  });

  const createAdvert = () => {
    fetch('http://localhost:3001/sell', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        brand: stateData.brand,
        model: stateData.model,
        firstRegistration: stateData.firstRegistration,
        mileage: stateData.mileage,
        fuelType: stateData.fuelType,
        performance: stateData.performance,
        cost: stateData.cost,
        condition: stateData.condition,
        advertTitle: stateData.advertTitle,
        advertText: stateData.advertText,
        image: stateData.image
      })
    })
    .then( alert('Sikeres hirdetésfeladás!'))
    .catch(error => console.log(`error: ${error}`))
  }  

  return (
    <main>
      <div className='sellingBox'>
        <form>
          <h1>Hirdetés feladása</h1>
          <div>
            <p>Típus:</p>
            <input
            className='brand input'
            onChange={(e) => setStateData({...stateData, brand:e.target.value})}
            />
          </div>
          <div>
            <p>Modell:</p>
            <input
            className='model input'
            onChange={(e) => setStateData({...stateData, model:e.target.value})}
            />
          </div>
          <div>
            <p>Évjárat:</p>
            <input
            className='firstRegistration input'
            onChange={(e) => setStateData({...stateData, firstRegistration:e.target.value})}
            />
          </div>
          <div>
            <p>Futásteljesítmény:</p>
            <input
            className='mileage input'
            onChange={(e) => setStateData({...stateData, mileage:e.target.value})}
            />
          </div>
          <div>
            <p>Üzemanyag típusa:</p>
            <input
            className='fuelType input'
            onChange={(e) => setStateData({...stateData, fuelType:e.target.value})}
            />
          </div>
          <div>
            <p>Teljesítmény:</p>
            <input
            className='performance input'
            onChange={(e) => setStateData({...stateData, performance:e.target.value})}
            />
          </div>
          <div>
            <p>Vételár:</p>
            <input
            className='cost input'
            onChange={(e) => setStateData({...stateData, cost:e.target.value})}
            />
          </div>
          <div>
            <p>Állapot:</p>
            <input
            className='condition input'
            onChange={(e) => setStateData({...stateData, condition:e.target.value})}
            />
          </div>
          <div>
            <p>Hirdetés címe:</p>
            <input
            className='advertTitle input'
            onChange={(e) => setStateData({...stateData, advertTitle:e.target.value})}
            />
          </div>
          <div>
            <p>Kép elérési útja:</p>
            <input
            className='image input'
            onChange={(e) => setStateData({...stateData, image:e.target.value})}
            />
          </div>
          <div>
            <p>Hirdetés szövege:</p>
            <textarea
            rows="4"
            cols="30"
            className='advertText input'
            onChange={(e) => setStateData({...stateData, advertText:e.target.value})}
            />
          </div>
          <Button variant='success' className='searchBtn ms-3' onClick={createAdvert} >Hirdetés feladása</Button>
        </form>
      </div>
    </main>
  )
}

export default Sell