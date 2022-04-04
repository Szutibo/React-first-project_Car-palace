import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo/logo.png';
import './Navbar.css';

const Navbar = () => {
  return (
    < nav className='navbar'>
      <div className='nav-center'>
        <Link to='/'>
          <img src={logo} alt='Logó' title='Az oldal logója' className='logo'/>  
        </Link>
        <ul className='nav-links'>
          <li>
            <Link to='/'>
              Kezdőlap
            </Link>
          </li>
          <li>
            <Link to='/search'>
              Keresés
            </Link>
          </li>
          <li>
            <Link to='/sell'>
              Hirdetés feladása
            </Link>
          </li>
          <li>
            <Link to='/modify'>
              Hirdetés módosítása
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
};

export default Navbar;