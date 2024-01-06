import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTwitter, FaFacebookF } from 'react-icons/fa6';
import { TfiGoogle } from 'react-icons/tfi';
import { FaPinterestP } from 'react-icons/fa';
import { logout } from '../../redux/user/userSlice';
import logo from '../../assets/logo.png';
import { selectCarsStatus } from '../../redux/cars/carsSlice';

const Navigation = ({ isNavigationOpen }) => {
  const dispatch = useDispatch();
  const status = useSelector(selectCarsStatus);
  const cars = useSelector((state) => state.cars.items);
  const id = status === 'succeeded' && (cars[0]?.id);
  const pathname = window.location.pathname.split('/')[1];
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
          <Link className={pathname === 'dashboard' || pathname === 'items' ? 'active' : ''} to="/dashboard">Cars</Link>
        </li>
        <li className="navigation-item">
          <Link className={pathname === 'reserve-form' ? 'active' : ''} to={id ? `/reserve-form/${id}` : '/dashboard'}>Reserve Form</Link>
        </li>
        <li className="navigation-item">
          <Link className={pathname === 'my-reservations' ? 'active' : ''} to="/my-reservations">My Reservations</Link>
        </li>
        <li className="navigation-item">
          <Link className={pathname === 'add-car-item' ? 'active' : ''} to="/add-car-item">Add Car Item</Link>
        </li>
        <li className="navigation-item">
          <Link className={pathname === 'delete-car-item' ? 'active' : ''} to="/delete-car-item">Delete Car Item</Link>
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
