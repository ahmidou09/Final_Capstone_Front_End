import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CustomArrow from '../../shared/CustomArrow';
import './style/Cars.css';

const responsive = {
  desktop: { breakpoint: { max: 2000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

const carPropTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  availability: PropTypes.bool.isRequired,
});

const CarsList = ({ cars, images }) => (

  <div className="car-slider">
    <ul className="car-list">
      <Carousel
        responsive={responsive}
        customRightArrow={<CustomArrow direction="right" />}
        customLeftArrow={<CustomArrow direction="left" />}
        infinite
      >
        {cars.map((car, index) => (

          <Link to={`/items/${car.id}`} key={car.id} className="link-to-detail">
            <div className="car-item">
              <div className="car-image">
                <img src={images[index]} alt={car.name} />
              </div>
              <div className="car-details">
                <h3 className="car-model">{car.name}</h3>
                ............................................
                <p>
                  Cost per day:
                  $
                  {car.cost}
                </p>

                <span
                  style={{
                    background: car.availability ? 'green' : 'orangered',
                    padding: '10px',
                    color: 'white',
                  }}
                  className="availability"
                >
                  {car.availability ? 'Available' : 'Not Available'}
                </span>

                <p>
                  {car.description.length > 100
                    ? `${car.description.substring(0, 100)}...`
                    : car.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </ul>
  </div>
);

CarsList.propTypes = {
  cars: PropTypes.arrayOf(carPropTypes).isRequired,
};

export default CarsList;
