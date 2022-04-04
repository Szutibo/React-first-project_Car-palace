import React from 'react';
import img1 from './img/money-pile.jpg';
import img2 from './img/dream-car.jpg';
import './Home.css';

const Home = () => {
    return (
        <main>
            <div className='headerBox'>
                <div className='headerSizing'>
                    <h1>Tibi's Car Palace</h1>
                    <h4>Használt és új járművek adás-vétele!</h4>
                </div>
                <div className='imageBox'>
                    <div className='buyingBox'>
                        <div className='moneyBox'>
                            <img src={img1} alt='Egy halom pénz' title='Pénzhalom' />
                        </div>
                        <div className='arrowBox'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                            </svg>
                        </div>
                        <div className='dreamcarBox'>
                            <a href='/search'><img src={img2} alt='Luxusautó' title='Álomautó' onClick='/search' /></a>
                        </div>
                    </div>
                    <div className='sellingBox'>
                        <div className='dreamcarBox'>
                            <img src={img2} alt='Luxusautó' title='Álomautó' />
                        </div>
                        <div className='arrowBox'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                            </svg>
                        </div>
                        <div className='moneyBox'>
                            <a href='/sell'><img src={img1} alt='Egy halom pénz' title='Pénzhalom' onClick='/sell' /></a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home;