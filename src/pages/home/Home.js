import React from 'react';
import img1 from './img/money-pile.jpg';
import img2 from './img/dream-car.jpg';
import '../Pages.css';
import './Home.css';

const Home = () => {
    return (
        <main>
            <div className='container'>
                <div className='headerSizing'>
                    <h1>Tibi's Car Palace</h1>
                    <h4>Használt és új járművek adás-vétele!</h4>
                    <hr></hr>
                </div>
                <div className='imageBox'>
                    <div className='buyingBox'>
                        <div className='moneyBox'>
                            <img src={img1} alt='pile of money' title='pile of money' />
                        </div>
                        <div className='arrowBox'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' fill='currentColor' className='bi bi-arrow-down' viewBox='0 0 16 16'>
                                <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z' />
                            </svg>
                        </div>
                        <div className='buyDreamcarBox'>
                            <a href='/search'><img src={img2} alt='dreamcar' title='dreamcar' /></a>
                            <label>Kereséshez kattintson a képre!</label>
                        </div>
                    </div>
                    <div className='sellingBox'>
                        <div className='dreamcarBox'>
                            <img src={img2} alt='dreamcar' title='dreamcar' />
                        </div>
                        <div className='arrowBox'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' fill='currentColor' className='bi bi-arrow-down' viewBox='0 0 16 16'>
                                <path fillRule='evenodd' d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z' />
                            </svg>
                        </div>
                        <div className='getMoneyBox'>
                            <a href='/sell'><img src={img1} alt='pile of money' title='pile of money' /></a>
                            <label>Hirdetés feladásához kattintson a képre!</label>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home;