import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/user/userSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <h1>Dashboard</h1>
      <button type="button" onClick={handleLogout}>Log Out</button>
    </>
  );
};

export default Dashboard;
