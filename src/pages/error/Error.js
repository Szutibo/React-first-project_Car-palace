import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Error = () => {
    return (
        <div>
            <div>
                <h1 className='m-4'>Hopsz! Ez egy zsákutca!</h1>
                <Link to='/'>
                   <button type='submit' className='ms-4 btn btn-success'> Vissza a kezdőlapra!</button>
                </Link>
            </div>
        </div>
    );
};

export default Error;