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
    <div className='flex divider'>
      
      <div className="car-img flex">
      <img src={car.photo} alt={car.name} />
      </div>
      <div className='text-div margin'>
        <h3 className='text'>
        {car.name}
        </h3>
        <h4 className='text'>-$350 deposit on any purchase</h4>

        <div>
          <p className='text'>{car.description}</p>
        </div>
        <div>
        <p className='text grey pad margin
        '>
         Cost per day:
                  $
          {car.cost}
          </p>
        </div>

        <div className="text-div auto-margin bckgrnd text">
          <Link to={`/reserve-form`} key={car.id} className="link-to-reserve text-div"> Rent
          </Link>
        </div>
      </div>
     
    </div>
  );
};
export default CarDetail;
