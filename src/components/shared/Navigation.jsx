import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaTwitter, FaFacebookF } from 'react-icons/fa6';
import { TfiGoogle } from 'react-icons/tfi';
import { FaPinterestP } from 'react-icons/fa';
import { logout } from '../../redux/user/userSlice';
import logo from '../../assets/logo.png';

const Navigation = ({ isNavigationOpen }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={`navigation ${isNavigationOpen ? 'navigation-open' : ''}`}>

      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <ul className="navigation-list">
        <li className="navigation-item">
          <NavLink to="/dashboard">Cars</NavLink>
        </li>
        {/* <li className="navigation-item">
          <NavLink to="/reserve-form">Reserve Form</NavLink>
        </li> */}
        <li className="navigation-item">
          <NavLink to="/my-reservations">My Reservations</NavLink>
        </li>
        <li className="navigation-item">
          <NavLink to="/add-car-item">Add Car Item</NavLink>
        </li>
        <li className="navigation-item">
          <NavLink to="/delete-car-item">Delete Car Item</NavLink>
        </li>
      </ul>

      <button type="button" className="btn log-out" onClick={handleLogout}>Log Out</button>

      <ul className="social-media-icons">
        <li><FaFacebookF /></li>
        <li><FaTwitter /></li>
        <li><TfiGoogle /></li>
        <li><FaPinterestP /></li>
      </ul>

      <div className="copyright"><p>&copy; 2023 cruise fleet</p></div>
    </nav>
  );
};

Navigation.propTypes = {
  isNavigationOpen: PropTypes.bool.isRequired,
};

export default Navigation;
