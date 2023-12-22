import React, { useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  Routes, Route, useNavigate, Outlet,
} from 'react-router-dom';
import { checkLogin } from './redux/user/userSlice';
import Dashboard from './components/pages/Home/Dashboard';
import LandingPage from './components/pages/sessions/LandingPage';
import ReserveForm from './components/pages/Reservations/ReserveForm';
import MyReservations from './components/pages/Reservations/MyReservations';
import AddCarItem from './components/pages/Car/AddCarItem';
import DeleteCarItem from './components/pages/Car/DeleteCarItem';
import AppLayout from './components/shared/AppLayout';
import CarDetail from './components/pages/Car/CarDetail';

const App = () => {
  const { loggedIn } = useSelector((state) => state.user);
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history('/dashboard');
    } else if (loggedIn === false) {
      history('/login');
    }
  }, [loggedIn]);

  return (
    <Routes>
      <Route path="/login" element={<LandingPage />} />
      <Route path="/register" element={<LandingPage />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reserve-form" element={<ReserveForm />} />
        <Route path="/my-reservations" element={<MyReservations />} />
        <Route path="/add-car-item" element={<AddCarItem />} />
        <Route path="/delete-car-item" element={<DeleteCarItem />} />

        <Route path="/items" element={<Outlet />}>
          <Route path=":id" element={<CarDetail />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
