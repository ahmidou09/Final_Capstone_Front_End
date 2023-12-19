import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Login from './Login';
import Registrations from './Registrations';

const LandingPage = () => {
  const [login, setLogin] = useState(true);
  const { loading } = useSelector((state) => state.user);
  if (loading) {
    return (<h1 className="loading">{loading ? 'Loading...' : ''}</h1>);
  }
  return (
    <>

      {login ? <Login /> : <Registrations />}
      <button type="button" className='toggleLogin' onClick={() => setLogin(!login)}>{login ? 'Register' : 'Login'}</button>
    </>
  );
};

export default LandingPage;
