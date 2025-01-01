import React, {useContext} from 'react';
import { AuthContext } from '../../src/context/authContext';

import "./Home.scss";
const Home = () => {
  const {currentUser} = useContext(AuthContext);
  console.log(currentUser);
  if(!currentUser){
    return <div className="not_authenticated_banner">
      <p>Вход не выполнен
      Перейдите по ссылкам в шапке сайта для регистрации или входа</p>
      
    </div>
  }
  return (
    <div>home</div>
  )
}

export default Home