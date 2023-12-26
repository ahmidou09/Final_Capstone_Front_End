import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../shared/LoadingComponent';
import CarsList from './CarsList';
import {
  fetchCars,
  selectCars,
  selectCarsStatus,
} from '../../../redux/cars/carsSlice';

const Cars = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const status = useSelector(selectCarsStatus);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <div className="cars-container">
      {status === 'loading' && <LoadingComponent />}
      {status === 'failed' && <p>Error loading cars.</p>}
      {status === 'succeeded' && <CarsList cars={cars} />}
    </div>
  );
};

export default Cars;
