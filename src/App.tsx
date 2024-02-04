import React, { useEffect, useState } from 'react';
import Home from './pages/home';
import Navigation from "./component/navigation"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fetchComID } from './function/function';
import { ComDcos } from './pages/comdocs';
function App() {
  const [cmoId, setComId] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const _id = await fetchComID();
      setComId(_id);
    }

    window.addEventListener('click', () => fetch());
    window.addEventListener("load", () => fetch())
    if (cmoId === "") {
      fetch();
    }
    fetch();
  }, [cmoId, setComId])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route index element={<Home />} />
            {
              cmoId === "" ? <></> :
                <Route path={`com-${cmoId}`} element={<ComDcos _page_id={`${cmoId}`} />} />
            }
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
