import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(formState);
      try {
        const { data } = await login({
          variables: { ...formState },
        });
  
        Auth.login(data.login.token);
      } catch (e) {
        console.error(e);
      }
  
      setFormState({
        email: '',
        password: '',
      });
    };
  
    return (
      <main className="flex-row justify-center mb-4 login">
        <div className="login-container">
          <div className="card">
            <h4 className="card-header bg-dark text-light p-2">Login</h4>
            <div className="card-body">
              {data ? (
                <p>
                  Success! You may now head{' '}
                  <Link to="/profile">Now to the profile page</Link>
                </p>
              ) : (
                <form onSubmit={handleFormSubmit} className="login-inputs">
                  <input
                    className="form-input"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <button
                    className="btn btn-block btn-primary login-btn"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              )}
  
              {error && (
                <div className="my-3 p-3 bg-danger text-white">
                  {error.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  };
  
  export default Login;