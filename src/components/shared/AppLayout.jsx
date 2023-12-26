import React from 'react';
import './AppLayout.css';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

function AppLayout() {
  return (
    <div className="container">
      <Navigation />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
