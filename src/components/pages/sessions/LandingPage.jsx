import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Registrations from './Registrations';
import './Sessions.css';
import LoadingComponent from '../../shared/LoadingComponent';

const LandingPage = () => {
  const [isLogin, setLogin] = useState(true);
  const { loading } = useSelector((state) => state.user);
  const history = useNavigate();

  if (loading) {
    return <LoadingComponent />;
  }

  const toggleLogin = () => {
    setLogin(!isLogin);
    const destination = isLogin ? '/register' : '/login';
    history(destination);
  };

  return (
    <div className="sessions-container">
      {isLogin ? <Login /> : <Registrations />}
      <button type="button" onClick={toggleLogin} className="login-button">
        {isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default LandingPage;
