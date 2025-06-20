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
  return (
    <Router>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="about"> About </Link>
        <Link to="portails-de-création"> Portails </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="portails-de-création" element={<Portails />}>
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App