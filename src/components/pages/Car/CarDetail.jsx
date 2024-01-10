import React from 'react';

import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectCarDetails } from '../../../redux/cars/carsSlice';
import './style/CarDetail.css';

const CarDetail = () => {
  const { carId } = useParams();
  const car = useSelector((state) => selectCarDetails(state, Number(carId)));

  if (!car) {
    return (
      <div>
        <h3>car not found!</h3>
      </div>
    );
  }

  return (
    <div className="car-details-container">
      <div className="car-details">
        <h1>{car.name}</h1>
        <div className="car-image-table-container">
          <div className="car-image-container">
            <img
              src={car.photo}
              alt={car.name}
              className="car-image-details"
            />
          </div>
          <div className="car-details-container-table">
            <table className="car-details-table">
              <tbody>
                <tr>
                  <th>Type</th>
                  <td>SUV</td>
                </tr>
                <tr>
                  <th>Daily Rate</th>
                  <td>{car.cost}</td>
                </tr>
              </tbody>
            </table>
            <div className="car-description">
              <h3 className="car-name-details">Description</h3>
              <p>{car.description}</p>
            </div>
          </div>
        </div>
        <div className="reserve-button-container">
          <Link className="reserve-link" to={`/reserve-form/${carId}`}>
            <button type="button" className="reserve-btn">
              Rent
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
};
export default CarDetail;
