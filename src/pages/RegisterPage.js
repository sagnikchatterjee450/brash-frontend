import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    restaurantName: '',
    restaurantLocation: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    //TODO: Validate
    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.restaurantName ||
      !credentials.restaurantLocation
    ) {
      setErrorMsg('Email and password are required.');
      return;
    }

    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        restaurantName: credentials.restaurantName,
        restaurantLocation: credentials.restaurantLocation,
      }),
    };

    try {
      setIsLoading(true);
      const responseData = await fetch(
        'http://127.0.0.1:5000/register',
        request
      );

      const responseJson = await responseData.json();
      setIsLoading(false);

      if (responseJson.error) {
        setIsLoading(false)
        setErrorMsg(responseJson.error);
        return;
      }

      setErrorMsg('');
      setDisplaySuccess(true);
    } catch (err) {
      //TODO handle errors
      console.log(err);
      setIsLoading(false)
      setErrorMsg(
        'Oops, something went wrong! Make sure your information is valid.'
      );
      return;
    }
  };

  return (
    <div className='container'>
      <div className='my-6 mx-6 columns is-centered'>
        <div className=' px-6 py-6 notification column is-half '>
          <h1 className='title is-2'>Register</h1>
          <p className='subtitle mt-1'>
            Already have an account? {''}
            <Link to='/login'>Login here.</Link>
          </p>
          {displaySuccess && (
            <article className='message is-success'>
              <div className='message-body'>
                Register success! <Link to='/login'>Login</Link> to get started.
              </div>
            </article>
          )}
          {errorMsg && (
            <article className='message is-danger'>
              <div className='message-body'>{errorMsg}</div>
            </article>
          )}
          <form onSubmit={handleLoginSubmit}>
            <div className='field'>
              <label className='label'>Email</label>
              <div className='control'>
                <input
                  className='input'
                  type='email'
                  id='email'
                  placeholder='Email'
                  value={credentials.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Password</label>
              <div className='control'>
                <input
                  className='input'
                  type='password'
                  id='password'
                  placeholder='Password'
                  value={credentials.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Restaurant Name</label>
              <div className='control'>
                <input
                  className='input'
                  id='restaurantName'
                  placeholder='Restaurant Name'
                  value={credentials.restaurantName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Restaurant Location</label>
              <div className='control'>
                <input
                  className='input'
                  id='restaurantLocation'
                  placeholder='Restaurant Location'
                  value={credentials.restaurantLocation}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button
              className={`button is-info is-medium mt-2 ${
                isLoading ? 'is-loading' : ''
              }`}
              type='submit'
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
