import React, { useState } from 'react';
import './AppLayout.css';
import { Outlet } from 'react-router-dom';
import { FaAlignJustify } from 'react-icons/fa6';
import Navigation from './Navigation';

function AppLayout() {
  const [isNavigationOpen, setNavigationOpen] = useState(true);

  const toggleNavigation = () => {
    setNavigationOpen((prev) => !prev);
  };

  return (
    <div className="container">
      <Navigation isNavigationOpen={isNavigationOpen} />
      <div className="main">
        <div className="toggle-container">
          <button
            type="button"
            className="toggle-btn"
            aria-label="Toggle navigation"
            onClick={toggleNavigation}
          >
            <FaAlignJustify />
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
