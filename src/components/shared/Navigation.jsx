import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/user/userSlice';

const Navigation = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/dashboard">Home</Link>
        </li>
        <li>
          <Link to="/reserve-form">Reserve Form</Link>
        </li>
        <li>
          <Link to="/my-reservations">My Reservations</Link>
        </li>
        <li>
          <Link to="/add-car-item">Add Car Item</Link>
        </li>
        <li>
          <Link to="/delete-car-item">Delete Car Item</Link>
        </li>
      </ul>
      <button type="button" onClick={handleLogout}>Log Out</button>
    </nav>
  );
};

export default Navigation;
