import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../auth/auth-context';

const LoginPage = () => {
  const auth = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
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
    if (!credentials.email || !credentials.password) {
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
      }),
    };

    try {
      setIsLoading(true);

      const authResponseData = await fetch(
        'http://127.0.0.1:5000/login',
        request
      );
      const authResponseJson = await authResponseData.json();
      setIsLoading(false);

      if (authResponseJson.error) {
        setErrorMsg(authResponseJson.error);
        return;
      }
    
      auth.login(authResponseJson.user_id, authResponseJson.access_token);
    } catch (err) {
      setErrorMsg(
        'Oops, something went wrong! Make sure you enter a valid email and password.'
      );
    }
  };

  return (
    <div className='container'>
      <div className='my-6 mx-6 columns is-centered'>
        <div className=' px-6 py-6 notification column is-half '>
          <h1 className='title is-2'>Login</h1>
          <p className='subtitle mt-1'>
            Don't have an account? {''}
            <Link to='/register'>Register here.</Link>
          </p>
          {!!errorMsg && (
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
            <button
              className={`button is-info is-medium mt-2 ${
                isLoading ? 'is-loading' : ''
              }`}
              type='submit'
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
