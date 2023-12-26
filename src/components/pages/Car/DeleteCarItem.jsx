import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style/DeleteCarItem.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCars,
  deleteCar,
  selectCars,
  selectCarsStatus,
} from '../../../redux/cars/carsSlice';
import LoadingComponent from '../../shared/LoadingComponent';

const DeleteCarItem = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const cars = useSelector(selectCars);
  const status = useSelector(selectCarsStatus);

  useEffect(() => {
    dispatch(fetchCars({ page: currentPage, pageSize }));
  }, [dispatch, currentPage, pageSize]);

  const handleDeleteCar = async (id) => {
    try {
      await dispatch(deleteCar(id));
      dispatch(fetchCars({ page: currentPage, pageSize }));
      toast.success('Car deleted successfully!');
    } catch (error) {
      toast.error(`Error deleting car: ${error.message}`);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedCars = cars.slice(startIndex, endIndex);

  return (
    <div className="deleteCarContainer">
      <ToastContainer />
      <header>
        <h1>List of Cars</h1>
      </header>
      {status === 'loading' && <LoadingComponent />}
      {status === 'failed' && <p>Error loading cars.</p>}
      {status === 'succeeded' && (
        <div>
          <ul className="carList">
            {displayedCars.map((car) => (
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
          <div className="pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <span>{currentPage}</span>
            <button
              type="button"
              disabled={endIndex >= cars.length}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteCarItem;
