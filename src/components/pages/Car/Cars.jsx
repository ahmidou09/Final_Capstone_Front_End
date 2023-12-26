import React, { useEffect } from 'react';
import './Cars.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCars, selectCars, selectCarsStatus,
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
      <h1>List of Cars</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error loading cars.</p>}
      {status === 'succeeded' && (
        <div>
          <ul>
            {cars.map((car) => (
              <li key={car.id} className="car-item">
                {car.name}
                {' '}
                - $
                {car.cost}
                {' '}
                {car.availability ? 'available' : 'not available'}
                {' '}
                {car.photo}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cars;
