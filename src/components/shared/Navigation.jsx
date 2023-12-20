import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav>
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
  </nav>
);

export default Navigation;
