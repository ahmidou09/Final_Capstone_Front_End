import React from 'react';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCarDetails } from '../../../redux/cars/carsSlice';

import CustomArrow from '../../shared/CustomArrow';
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
    <div className='divider'>
      <div className="car-img margin">
      <img src={car.photo} alt={car.name} />
      </div>
      <div>
        <h3>
        {car.name}
        </h3>
        <p>-$350 deposit on any purchase</p>

        <div>
          {car.description}
        </div>
        <div>
          {car.price}
        </div>
      </div>
     
    </div>
  );
};
export default CarDetail;
