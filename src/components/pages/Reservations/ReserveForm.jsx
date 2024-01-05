import React, { useState, useEffect } from 'react';
import './style/ReserveForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { createReserve, getReservations } from '../../../redux/reservations/reservationsSlice';
import { currentUser } from '../../../redux/user/userSlice';
import { selectCarsStatus } from '../../../redux/cars/carsSlice';

const ReserveForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => currentUser(state));
  const cars = useSelector((state) => state.cars.items);
  const status = useSelector(selectCarsStatus);
  const { carId } = useParams();
  const car = status === 'succeeded' && cars.find((car) => car.id === Number(carId));

  const cities = [
    { name: 'Tokyo', country: 'Japan' },
    { name: 'Delhi', country: 'India' },
    { name: 'Shanghai', country: 'China' },
    { name: 'Sao Paulo', country: 'Brazil' },
    { name: 'Mexico City', country: 'Mexico' },
    { name: 'Cairo', country: 'Egypt' },
    { name: 'Beijing', country: 'China' },
  ];

  const [formData, setFormData] = useState({
    start: '',
    finish: '',
    city: '',
    item_id: car.id,
    user_id: user.id,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      user_id: user.id,
    }));
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calcTimeDiff = () => {
    const startTime = new Date(formData.start).getTime();
    const finishTime = new Date(formData.finish).getTime();
    const timeDifference = finishTime - startTime;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return Math.abs(daysDifference);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that finish is greater than start
    if (new Date(formData.finish) <= new Date(formData.start)) {
      toast.error('Finish date must be greater than start date.');
      return;
    }

    try {
    // Dispatch the createReserve action
      await dispatch(createReserve(formData));

      // Clear the form fields
      setFormData({
        start: '',
        finish: '',
        city: '',
        item_id: car.id,
        user_id: user.id,
      });

      // Fetch and update reservations
      dispatch(getReservations(user.id));

      // Show success message
      toast.success('Reservation created successfully!');
    } catch (error) {
      toast.error(`Error creating reservation: ${error.message}`);
    }
  };

  return (
    status === 'loading' ? (
      <div>Loading...</div>
    ) : (
      <div className="reserve-container">
        <ToastContainer />
        <h1>Reserve a Car</h1>
        <div className="car-details-form-container">
          <div className="car-details-container">
            <h3>{car.name}</h3>
            <img src={car.photo} alt={car.name} className="car-image-details" />
          </div>
          <form onSubmit={handleSubmit} className="reserve-form-container">
            <label htmlFor="start">
              Start Date:
              <input type="datetime-local" id="start" name="start" value={formData.start} onChange={handleChange} required />
            </label>

            <label htmlFor="finish">
              Finish Date:
              <input type="datetime-local" id="finish" name="finish" value={formData.finish} onChange={handleChange} required />
            </label>

            <label htmlFor="city">
              Select City:
              <select id="city" name="city" value={formData.city} onChange={handleChange} required>
                <option value="" disabled>Select City</option>
                {cities.map((el) => (
                  <option key={el.name} value={`${el.name} - ${el.country}`}>
                    {el.name}
                    {' '}
                    -
                    {el.country}
                  </option>
                ))}
              </select>
            </label>
            <div className="cost-details">
              <div>
                <strong>Total Days (Days):</strong>
                <span>{Number.isNaN(calcTimeDiff()) ? 0 : calcTimeDiff()}</span>
              </div>

              <div>
                <strong>Day Cost:</strong>
                <span>
                  $
                  {car.cost}
                </span>
              </div>

              <div>
                <strong>Total Cost:</strong>
                <span>
                  $
                  {Number.isNaN(calcTimeDiff() * car.cost) ? 0 : calcTimeDiff() * car.cost}
                </span>
              </div>
            </div>

            <button type="submit">Reserve Now</button>
          </form>
        </div>

      </div>
    )
  );
};

export default ReserveForm;
