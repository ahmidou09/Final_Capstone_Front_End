import React, { useEffect } from 'react';
import './Cars.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCars, deleteCar, selectCars, selectCarsStatus,
} from '../../../redux/cars/carsSlice';

const DeleteCarItem = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const status = useSelector(selectCarsStatus);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleDeleteCar = async (id) => {
    await dispatch(deleteCar(id));
    dispatch(fetchCars());
  };

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
                <button type="button" onClick={() => handleDeleteCar(car.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DeleteCarItem;
