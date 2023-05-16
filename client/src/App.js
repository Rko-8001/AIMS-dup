import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from "./components/NavBar";
import AboutA from './components/AboutA';
import AboutS from './components/AboutS';
import AboutI from './components/AboutI';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';


function App() {

  const [loginEmail, setLoginEmail] = useState("");

  const getLoginEmail = (e) => {
    setLoginEmail(e);
  }
  return (
    <>
      <NavBar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/abouti' element={<AboutI emailWeGot={loginEmail} />} />
          <Route path='/abouts' element={<AboutS emailWeGot={loginEmail} />} />
          <Route path='/abouta' element={<AboutA emailWeGot={loginEmail} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login getLoginEmail={getLoginEmail} /> } />
        </Routes>

    </>
  );
}

export default App;
