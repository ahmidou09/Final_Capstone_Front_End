import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars } from '../../../redux/cars/carsSlice';
import 'react-multi-carousel/lib/styles.css';
import { reserve } from '../../../redux/reservations/reservationsSlice';
import './ReserveForm.css';

const ReserveForm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const { items } = useSelector((state) => state.cars);
  const { images } = useSelector((state) => state.cars);
  const { user } = useSelector((state) => state.user);
  const [itemId, setItemId] = useState(null);

  const city = useRef();
  const start = useRef();
  const finish = useRef();

  const selectCar = (e) => {
    e.target.style.border = '3px solid #bcbcbc';
    setItemId(parseInt(e.target.getAttribute('data-id'), 10));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reserve({
      user_id: user.id,
      item_id: itemId,
      start: start.current.value,
      finish: finish.current.value,
      city: city.current.value,
    }));
  };

  return (
    <>
      <h1>ReserveForm</h1>
      <form className="reserveForm" onSubmit={handleSubmit}>
        <h2 className="select">Select a car</h2>
        <div className="cars">
          {items.map((car, index) => (
            <>
              {car.availability
            && (
            <div className="car-item"  role="button" onKeyDown={selectCar} onClick={selectCar} data-id={car.id} style={{ width: 330 }}>
              <div className="car-image">
                <img src={images[index]} alt={car.name} data-id={car.id} />
              </div>
              <div className="car-details" data-id={car.id}>
                <h3 className="car-model" data-id={car.id}>{car.name}</h3>
                ............................................
                <p data-id={car.id}>
                  Cost per day:
                  $
                  {car.cost}
                </p>
                <p data-id={car.id}>
                  {car.description.length > 100
                    ? `${car.description.substring(0, 100)}...`
                    : car.description}
                </p>
              </div>
            </div>
            )}
            </>
          )) }

        </div>
        <div className="dates">
          <label htmlFor="startTime">Start (date and time):</label>
          <input type="datetime-local" id="startTime" required ref={start} className="date" name="startTime" />
          <label htmlFor="startTime">Finish (date and time):</label>
          <input type="datetime-local" id="FinishTime" ref={finish} required className="date" name="FinishTime" />
        </div>
        <input type="text" name="city" required id="city" ref={city} className="city" placeholder="City" />
        <button type="submit" className="reserve">Reserve</button>
      </form>
    </>
  );
};

export default ReserveForm;
