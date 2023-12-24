import React, { useEffect } from 'react';
import './style/DeleteCarItem.css';
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
    <div className="deleteCarContainer">
      <h1>List of Cars</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error loading cars.</p>}
      {status === 'succeeded' && (
        <div>
          <ul className="carList">
            {cars.map((car) => (
              <li key={car.id} className="carItem">
                <div className="carImage">
                  <img src={car.photo} alt={car.name} />
                </div>
                <div className="carDetails">
                  <p>{car.name}</p>
                  <p>
                    $
                    {car.cost}
                  </p>
                  <p>{car.availability ? 'Available' : 'Not Available'}</p>
                </div>
                <button
                  type="button"
                  className="deleteButton"
                  onClick={() => handleDeleteCar(car.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DeleteCarItem;
