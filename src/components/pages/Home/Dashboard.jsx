import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/user/userSlice';
import Cars from '../Car/Cars';

const Dashboard = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <button type="button" onClick={handleLogout}>Log Out</button>
      <Cars />
    </>
  );
};

export default Dashboard;
