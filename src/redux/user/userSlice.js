import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const login = createAsyncThunk('users/login', async (payload) => {
  try {
    const response = await axios.post("http://localhost:3000/sessions", payload, {withCredentials: true})
    return response.data
  } catch (error) {
    return error.message
  }
})

export const checkLogin = createAsyncThunk('user/checkLogin', async() => {
  try {
    const response = await axios.get('http://localhost:3000/sessions/logged_in', {withCredentials: true})
    return response.data
  } catch(error) {
    return error.message
  }
})


export const register = createAsyncThunk('user/register', async(payload) => {
  try {
    const response = await axios.post('http://localhost:3000/registrations', (payload), {withCredentials: true})
    return response.data
  } catch(error) {
    return error.message
  }
})

export const logout = createAsyncThunk('user/logout', async () => {
  try {
    const response = axios.delete('http://localhost:3000/sessions/log_out', {withCredentials: true})
    return response.data
  } catch(error) {
    return error.message
  }
})

const initialState = {
  user: {},
  logged_in: false,
  loading: false,
  wrongData: '',
  error: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })

      .addCase(login.fulfilled, (state, action) => {
        if(action.payload.status === 'created') {
          state.logged_in = true;
          state.user = (action.payload.user);
          state.logged_in = (action.payload.logged_in)
          state.wrongData = ''
        } else if (action.payload.status === 401 ) {
          state.wrongData = 'Wrong password or email'
        }
      })

      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(checkLogin.pending, (state) => {
        state.loading = true;
      })

      .addCase(checkLogin.fulfilled, (state, action) => {
        state.logged_in = action.payload.logged_in
        state.loading = false
      })

      .addCase(checkLogin.rejected, (state, {payload}) => {
        state.loading = false
        state.error = payload
      })

      .addCase(register.pending, state => {
        state.loading = true
      })

      .addCase(register.fulfilled, (state, action) => {
        if(action.payload.status === 'created') {
          state.logged_in = true;
          state.user = (action.payload.user);
          state.wrongData = ''
          state.loading = false
        } else if (action.payload.status === 500 ) {
          state.wrongData = action.payload.errors[0]
          state.loading = false
        }
      })

      .addCase(register.rejected, (state, {payload}) => {
        state.error = payload
        state.loading = false
      })

      .addCase(logout.pending, (state) => {
        state.loading = true;
      })

      .addCase(logout.fulfilled, (state) => {
        state.logged_in = false;
        state.loading = false
      })

      .addCase(logout.rejected, (state, {payload}) => {
        state.error = payload;
        state.loading = false;
      })
  },
})

export default userSlice.reducer;