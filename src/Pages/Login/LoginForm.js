import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import Navbar from '../../Components/Navbar/Navbar';

const Login = ({ users, setLogUser }) => {
    // const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const [formError, setFormError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
        setFormError('');
    };

    const handlePasswordChange = (e) => {
        setPass(e.target.value);
        setPassError('');
        setFormError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Find the user by email
        const user = users.find((user) => user.email === email);

        if(email.trim() === '') {
            setEmailError('Email is required!');
            return;
        }

        if (pass.trim() === '') {
            setPassError('Password is required!');
            return;
        }
        if (!user) {
            setEmailError('User does not exist!');
            return;
        }

        if (user.password !== pass) {
            setPassError('Password does not match!');
            return;
        }

        // Successful login
        setLogUser(user);

        // Clear the input fields
        setEmail('');
        setPass('');
    }
    return (
        <div>
            <Navbar />
            <div className='login-section'>
                <div className='form-container'>
                    <form className='login-form' onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <h3>LOGIN</h3>
                        {/* <label htmlFor="email">Email</label> */}
                        <input
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Email'
                            onChange={handleEmailChange}
                        />
                        {emailError && <span className='error'>{emailError}</span>}

                        {/* Password Input */}
                        {/* <label htmlFor="password">Password</label> */}
                        <input
                            type='password'
                            name='password'
                            value={pass}
                            placeholder='Password'
                            onChange={handlePasswordChange}
                        />
                        {passError && <span className='error'>{passError}</span>}

                        <button className='login-btn' type='submit'>LOGIN</button>
                        {formError && <span className='error'>{formError}</span>}

                        <button className='link-btn'><span>Don't have an account? Create one</span></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login