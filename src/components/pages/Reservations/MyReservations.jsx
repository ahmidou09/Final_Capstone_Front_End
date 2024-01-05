import './style/MyReservations.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getReservations, selectReservations, selectReservationsStatus, deleteReservation,
} from '../../../redux/reservations/reservationsSlice';
import { currentUser } from '../../../redux/user/userSlice';
import LoadingComponent from '../../shared/LoadingComponent';

const MyReservations = () => {
  const dispatch = useDispatch();
  const reservations = useSelector(selectReservations);
  const reservationsStatus = useSelector(selectReservationsStatus);
  const user = useSelector((state) => currentUser(state));

  useEffect(() => {
    dispatch(getReservations(user.id));
  }, [dispatch, user.id]);

  const handleDeleteReservation = async (reservationId) => {
    try {
      await dispatch(deleteReservation({ userId: user.id, reservationId }));
      dispatch(getReservations(user.id));
      throw new Error('Reservation deleted successfully!');
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (reservationsStatus === 'loading') {
    return <LoadingComponent />;
  }

  if (reservationsStatus === 'failed') {
    return <p>Error loading reservations.</p>;
  }

  return (
    <div className="my-reservations-container">
      <h2>My Reservations</h2>
      {Array.isArray(reservations) && reservations.length > 0 ? (
        <table className="reservations-table">
          <thead>
            <tr>
              <th>Start Date</th>
              <th>Finish Date</th>
              <th>City</th>
              <th>Day Cost</th>
              <th>Total Days</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {reservations
              .filter((reservation) => reservation.user_id === user.id)
              .map((userReservation) => (
                <tr key={userReservation.id}>
                  <td>{formatDate(userReservation.start)}</td>
                  <td>{formatDate(userReservation.finish)}</td>
                  <td>{userReservation.city}</td>
                  <td>{userReservation.day_cost}</td>
                  <td>{userReservation.total_days}</td>
                  <td>{userReservation.total_cost}</td>
                  <td>
                    <button
                      type="button"
                      className="resvation-delete-btn"
                      onClick={() => handleDeleteReservation(userReservation.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>No reservations found.</p>
      )}
    </div>
  );
};

export default MyReservations;
