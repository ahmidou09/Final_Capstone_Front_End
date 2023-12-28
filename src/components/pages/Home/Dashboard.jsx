import React from 'react';
import Cars from '../Car/Cars';
import './Dashboard.css';

const Dashboard = () => (
  <div className="home-page-container">
    <header>
      <h2>
        Lastest Models
      </h2>
      <h3>
        Please select a Car Model
      </h3>
    </header>
    <Cars />
  </div>
);

export default Dashboard;
