import React, { useState } from 'react';
import auth from '../auth';
import apiService from '../apiService';
import { useNavigate } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
};

const Login = (props) => {
  let navigate = useNavigate();
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;
    const user = { email, password };
    const res = await apiService.login(user);
    if (res.error){
      alert(`${res.message}`);
      setState(initialState);
    } else {
      props.setIsAuthenticated(true);
      auth.login(() => navigate('/profile'));
    }
  };

  const validateForm = () => {
    return !state.email || !state.password;
  }

  return (
    <section className='main'>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=VT323"></link>

      <h2 className='h2'>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input className='field'
          type="text"
          placeholder="name@mail.com"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input className='field'
          type="password"
          placeholder="supersecretthingy"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Login&nbsp;
        </button>
      </form>
    </section>
  );
}

export default Login;
