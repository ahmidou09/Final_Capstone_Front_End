import React, { useEffect } from 'react';
import './app.css';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { checkLogin } from './redux/user/userSlice';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';

const App = () => {
  const { loggedIn } = useSelector((state) => state.user);
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history('/dashboard');
    } else if (loggedIn === false) {
      history('/');
    }
  }, [loggedIn]);

  return (

    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};
export default App;
