import React, {useState} from 'react'
import Login from './Login';
import Registrations from './Registrations';
import {useSelector} from 'react-redux'

const Landing_page = () => {
  const [login, setLogin] = useState(true)
  const {loading}  = useSelector(state => state.user)
  if(loading) {
    return (<h1 className='loading'>{loading ? 'Loading...' : ''}</h1>)
  }
  return (
    <>
    
    {login ? <Login /> : <Registrations />}
    <button onClick={() => setLogin(!login)}>{login ? 'Register' : 'Login'}</button>
    </>
  )
}

export default Landing_page