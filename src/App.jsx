import React from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Home/>
    </BrowserRouter>
  )
}

export default App