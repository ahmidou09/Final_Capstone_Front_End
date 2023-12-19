import React, { useRef } from 'react'
import { register } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux'

const Registrations = () => {
    const email = useRef();
    const password = useRef();
    const pass_confirm = useRef();

    const { wrongData } = useSelector(state => state.user);

    const dispatch = useDispatch()
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(register({
        user: {
          email: email.current.value,
          password: password.current.value,
          password_confirmation: pass_confirm.current.value
        }
      }))
    }
    return (
        <form onSubmit={handleSubmit}>
            {wrongData}
            <h2>Create a new account</h2>
            <input type="email" name="email" placeholder='email@example.com' ref={email} />
            <input type="password" name="password" placeholder='Your password' ref={password} />
            <input type="password" name="password_confirmation" placeholder='Confirm your password' ref={pass_confirm} />
            <button type="submit">Register</button>
        </form>
    )
}

export default Registrations