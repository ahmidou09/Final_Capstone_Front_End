import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import carsReducer from './cars/carsSlice';
import reservationsReducer from './reservations/reservationsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cars: carsReducer,
    reservations: reservationsReducer,
  },
});

export default store;
