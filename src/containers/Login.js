import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { login } from '../Redux/actions/users';

const Login = props => {
  const [state, setState] = useState({
    username: null,
    password: null,
  });

  const handleChange = e => {
    const { value, name } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    props.login(state);
  };

  return (
    <>
      <h1>Login Page</h1>
      <form>
        <label htmlFor="username">
          <p>Username</p>
          <input type="text" id="username" name="username" required onChange={handleChange} />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input type="password" id="password" name="password" required onChange={handleChange} />
        </label>
        <button type="button" onClick={handleSubmit}>Login</button>
      </form>
      <p>Don&apos;t have an account!</p>
      <Link to="/signup">
        <button type="button">SignUp</button>
      </Link>

    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = { login };
export default connect(null, mapDispatchToProps)(Login);
