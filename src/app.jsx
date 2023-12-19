import React, { useEffect } from 'react'
import './app.css'
import {useSelector, useDispatch } from 'react-redux'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { checkLogin } from './redux/user/userSlice';
import Dashboard from './components/Dashboard';
import Landing_page from './components/Landing_page';

export function App() {

  const { logged_in, loading } = useSelector(state => state.user)
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin())
  },[])

  useEffect(() => {
    if(logged_in) {
      history('/dashboard')      
    } else if (logged_in === false) {
      history('/')
    }

  }, [logged_in])


  

  return (
    
    <>
    <Routes>
      <Route path='/' element={<Landing_page />} />  
      <Route path='/dashboard' element={<Dashboard />} /> 
    </Routes>
    </>
  )
}
