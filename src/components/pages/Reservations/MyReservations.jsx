import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReservations, selectReservations, selectReservationsStatus } from '../../../redux/reservations/reservationsSlice';
import { currentUser } from '../../../redux/user/userSlice';
import LoadingComponent from '../../shared/LoadingComponent';
import './style/MyReservations.css';

const MyReservations = () => {
  const dispatch = useDispatch();
  const reservations = useSelector(selectReservations);
  const reservationsStatus = useSelector(selectReservationsStatus);
  const user = useSelector((state) => currentUser(state));

  useEffect(() => {
    dispatch(getReservations(user.id));
  }, [dispatch, user.id]);

  if (reservationsStatus === 'loading') {
    return <LoadingComponent />;
  }

  if (reservationsStatus === 'failed') {
    return <p>Error loading reservations.</p>;
  }

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

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
            </tr>
          </thead>
          <tbody>
            {reservations
              .filter((reservation) => reservation.user_id === user.id)
              .map((filteredReservation) => (
                <tr key={filteredReservation.id}>
                  <td>{formatDate(filteredReservation.start)}</td>
                  <td>{formatDate(filteredReservation.finish)}</td>
                  <td>{filteredReservation.city}</td>
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
