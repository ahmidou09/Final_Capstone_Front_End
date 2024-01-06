import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true;

const baseUrl = 'http://127.0.0.1:3000';

const initialState = {
  reservations: [],
  status: 'idle',
  error: null,
};

export const createReserve = createAsyncThunk('reservations/createReserve', async (reservationData) => {
  try {
    const response = await fetch(`${baseUrl}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        reservation: {
          ...reservationData,
          day_cost: reservationData.dayCost,
          total_days: reservationData.totalDays,
          total_cost: reservationData.totalCost,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getReservations = createAsyncThunk('reservations/getReservations', async () => {
  try {
    const response = await axios.get('http://localhost:3000/reservations');
    return response.data.result;
  } catch (err) {
    return err.message;
  }
});

export const deleteReservation = createAsyncThunk('reservations/deleteReservation', async ({ userId, reservationId }) => {
  try {
    const response = await fetch(`${baseUrl}/reservations/${reservationId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReserve.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createReserve.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reservations.push(action.payload);
      })
      .addCase(createReserve.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getReservations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getReservations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reservations = action.payload;
      })
      .addCase(getReservations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reservations = state.reservations
          .filter((reservation) => reservation.id !== action.payload.deletedReservationId);
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectReservations = (state) => state.reservations.reservations;
export const selectReservationsStatus = (state) => state.reservations.status;
export default reservationsSlice.reducer;
