import React from 'react'
import { logout } from '../redux/user/userSlice'
import {useDispatch, useSelector} from 'react-redux'

const Dashboard = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Log Out</button>
    </>
  )
}

export default Dashboard