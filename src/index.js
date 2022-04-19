import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Pages
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import Sell from './pages/sell/Sell';
import Modify from './pages/modify/Modify';
import Error from './pages/error/Error';

// Components
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';


const setBgColorForWebsite = () => {
  const element = document.getElementById('root');
  element.style.backgroundColor = 'rgba(124, 252, 160, 0.3)';
};

setBgColorForWebsite();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/sell' element={<Sell />} />
        <Route path='/modify' element={<Modify />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
