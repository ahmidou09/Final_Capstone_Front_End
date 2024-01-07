import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Cars from '../components/pages/Car/Cars';
import { fetchCars } from '../redux/cars/carsSlice';
import { configureStore } from '@reduxjs/toolkit';

const mockAxios = new MockAdapter(axios);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('Cars component', () => {
  it('renders correctly when cars are loaded', async () => {
    const initialState = { cars: { items: [], status: 'idle', error: null } };
    const dispatch = jest.fn();

    jest.spyOn(require('react-redux'), 'useDispatch').mockReturnValue(dispatch);
    // const store = mockStore(initialState);

    const mockCars = {
      result: {
        items: [
          {
            id: 1,
            name: 'Car 1',
            photo: 'car1.jpg',
            cost: 50,
            availability: true,
            description: 'This is a description for Car 1',
          },
          {
            id: 2,
            name: 'Car 2',
            photo: 'car2.jpg',
            cost: 60,
            availability: false,
            description: 'This is a description for Car 2',
          },
        ],
      },
    };

    mockAxios.onGet('http://127.0.0.1:3000/items/').reply(200, { result: { items: mockCars } });

    await fetchCars()(dispatch);

    const store = configureStore({ reducer: { cars: initialState.cars } });

    render(
      <Provider store={store}>
        <Cars />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    console.log(dispatch.mock.calls);
    console.log(store.getState().payload);
  });
});
