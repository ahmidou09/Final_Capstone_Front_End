import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Registrations from './Registrations';

const LandingPage = () => {
  const [login, setLogin] = useState(true);
  const { loading } = useSelector((state) => state.user);
  const history = useNavigate();

  if (loading) {
    return (<h1 className="loading">{loading ? 'Loading...' : ''}</h1>);
  }
  return (
    <>
      {login ? <Login /> : <Registrations />}
      <button
        type="button"
        className="toggleLogin"
        onClick={() => {
          setLogin(!login);
          if (login) {
            history('/register');
          } else {
            history('/login');
          }
        }}
      >
        {login ? 'Register' : 'Login'}
      </button>
    </>
  );
};

export default LandingPage;
