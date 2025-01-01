import React, { useState }  from 'react';
import { useNavigate } from "react-router-dom";
import "./Registration.scss";
import axios from "axios";

const Registration = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    userName: "",
    userPassword: ""
  });

  const [error, setError] = useState("");

  const setErrorMessage = (message) => {
    setError(message);

    setTimeout(()=>{
      setError("")
    }, 3000)
  }
  const handleChange = (e) => {
    setInputs({...inputs, [e.target.id]: e.target.value});
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
      await axios.post("http://localhost:7777/api/register", inputs, {withCredentials: true});
      navigate("/");
    } catch (err) {
      setErrorMessage(err.reponse.data)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="register_form">
      <h2>Регистрация</h2>
      <label htmlFor="userName">Имя пользователя</label>
      <input 
         
        id="userName" 
        type="text" 
        value={inputs.userName}
        onChange={handleChange} 
      />
      <label htmlFor="userPassword">Пароль пользователя</label>
      <input 
        
        id="userPassword" 
        type="password"
        value={inputs.userPassword}
        onChange={handleChange} 
      />
      <button type="submit">Зарегистрироваться</button>
      {error && <p>{error}</p>}
    </form>
  )
}

export default Registration