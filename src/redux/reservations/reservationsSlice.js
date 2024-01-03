import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  reservations: [],
  created: false,
  status: 'idle',
  error: null,
};

export const reserve = createAsyncThunk('reservations/createReservation', async (payload) => {
  try {
    const response = await axios.post('http://localhost:3000/reservations', (payload));
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
});

export const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reserve.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(reserve.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload.result === 'Reservation created succesfully!') {
          state.created = true;
        }
      })

      .addCase(reserve.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
