import React, { useState, useContext } from 'react';
import axios from "axios";
import "./Login.scss";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../src/context/authContext';


const Login = () => {
  const { setCurrentUser, currentUser} = useContext(AuthContext);

  console.log(currentUser);

  console.log(currentUser);
  const [inputs, setInputs] = useState({
    userName: "",
    userPassword: ""
  });

  const handleChange = (e) => {
    setInputs({...inputs, [e.target.id]: e.target.value});
  }

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const setErrorMessage = (message) => {
    setError(message);

    setTimeout(()=>{
      setError("")
    }, 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(inputs.userName === ""){
      setErrorMessage("Не заполнено поле имени пользователя");
      return;
    } else if(inputs.userPassword === ""){
      setErrorMessage("Не заполнено поле пароля пользователя");
      return;
    }

    try {
      const response = await axios.post("http://localhost:7777/api/login", inputs, {withCredentials: true});
      localStorage.setItem("user", JSON.stringify(response.data.userName));
      setCurrentUser(response.data.userName);
      navigate("/");
    } catch (err) {
      setErrorMessage(err.response.data)
    }
  }

  return (
    <form className='login_form' onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <label htmlFor="userName">Имя пользователя</label>
      <input 
        id="userName" 
        type="text"
        onChange={handleChange} 
        value={inputs.userName}
      />
      <label htmlFor="userPassword">Пароль пользователя</label>
      <input 
        id="userPassword" 
        onChange={handleChange} 
        value={inputs.userPassword}
        type="password" 
      />
      <button type="submit">Вход</button>
      {error && <p>{error}</p>}
    </form>
  )
}

export default Login