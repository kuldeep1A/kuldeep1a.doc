import React from 'react';
import Home from './pages/home';
import Navigation from "./component/navigation"
import P1 from './pages/p-1-docs'
import P2 from './pages/p-2-docs'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path='/p1' element={<P1 />} />
            <Route path='/p2' element={<P2 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
