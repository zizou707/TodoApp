import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setInfo } from '../redux/Slices/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Add your login logic here
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {email,password} )
            console.log(response)
            dispatch(setInfo(response.data))
            navigate('/home')
        } catch (error) {
            console.log(error)
        }
    };
   

    return (
        <div className='authPage'>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@example.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button className='btn' type="submit">Login</button>
            </form>
            <div className='absolute top-5 right-5'>
                <p >Dont have an account ?</p>
                <button className='btn' onClick={() =>navigate('/register') }> Register</button>
            </div>
        </div>
    );
};

export default Login;