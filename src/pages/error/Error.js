import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Pages.css';

const Error = () => {
    return (
        <main>
            <div className='box'>
                <h1 className='m-4'>Hopsz! Ez egy zsákutca!</h1>
                <Link to='/'>
                    <button type='submit' className='ms-4 btn btn-success'> Vissza a kezdőlapra!</button>
                </Link>
            </div>
        </main>
    );
};

export default Error;