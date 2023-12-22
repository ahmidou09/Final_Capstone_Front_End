import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import carsReducer from './cars/carsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cars: carsReducer,
  },
});

export default store;
