import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

function AppLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default AppLayout;
