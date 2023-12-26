import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Registrations from './Registrations';
import './Sessions.css';

const LandingPage = () => {
  const [isLogin, setLogin] = useState(true);
  const { loading } = useSelector((state) => state.user);
  const history = useNavigate();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const toggleLogin = () => {
    setLogin(!isLogin);
    const destination = isLogin ? '/register' : '/login';
    history(destination);
  };

  return (
    <div className="sessions-container">
      {isLogin ? <Login /> : <Registrations />}
      <button type="button" onClick={toggleLogin}>
        {isLogin ? 'Register' : 'Login'}
      </button>
    </div>
  );
};

export default LandingPage;
