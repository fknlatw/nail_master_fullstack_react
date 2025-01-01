import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import { AuthContext } from '../context/authContext';
import axios from "axios";

const Nav = () => {
  const {currentUser, setCurrentUser} = useContext(AuthContext); 

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:7777/api/logout",{}, {withCredentials: true});
      localStorage.removeItem("user");
      console.log(response.data);
      setCurrentUser("");
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <nav className="nav">
      <div className="nav_container">
        <NavLink 
          to="/registration"
          className={({ isActive }) =>
          isActive ? "active" : ""}
        >Регистрация</NavLink>


        <NavLink to="/" 
          className={({ isActive }) =>
            isActive ? "active" : ""}
          >Приложение</NavLink>

        {!currentUser && <NavLink 
          to="/login"
          className={({ isActive }) =>
          isActive ? "active" : ""}
        >Вход</NavLink>}

        {currentUser && 
        <div>
          <p>{currentUser}</p>
          <button onClick={handleLogout}>
            Выйти
          </button>
        </div>
        }
      </div>
    </nav>
  )
}

export default Nav