import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  images: [],
  status: 'idle',
  error: null,
};

export const fetchCars = createAsyncThunk('cars/fetchCars',
  async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:3000/items/',
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );
      const data = await response.data.result;
      return data;
    } catch (error) {
      throw new Error(error);
    }
  });

export const addCar = createAsyncThunk('cars/addCar', async (newCar) => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:3000/items/',
      newCar,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteCar = createAsyncThunk('cars/deleteCar', async (id) => {
  try {
    await axios.delete(`http://127.0.0.1:3000/items/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return id;
  } catch (error) {
    throw new Error(error);
  }
});

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload.item_image_urls;
        state.items = action.payload.items;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.items = state.items.filter((car) => car.id !== action.payload);
      });
  },
});

export const selectCars = (state) => state.cars.items;
export const selectImages = (state) => state.cars.images;
export const selectCarsStatus = (state) => state.cars.status;
export const selectCarDetails = (state, carId) => state.cars.items.find((car) => car.id === carId);
export default carsSlice.reducer;
