import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import Nav from './components/Nav';
import AuthProvider from './context/authContext';
import "./App.scss";
function App () {
  return (
    <AuthProvider>
      <Nav/>
      
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
