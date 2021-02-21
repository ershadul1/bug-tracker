import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { signup } from '../Redux/actions/users';

const SignUp = props => {
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
    props.signup(state);
  };

  return (
    <>
      <h1>Sign Up Page</h1>
      <form>
        <label htmlFor="username">
          <p>Username</p>
          <input type="text" id="username" name="username" required onChange={handleChange} />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input type="password" id="password" name="password" required onChange={handleChange} />
        </label>
        <button type="button" onClick={handleSubmit}>Sign Up</button>
      </form>
      <p>Already have an account!</p>
      <Link to="/">
        <button type="button">Login</button>
      </Link>
    </>
  );
};

SignUp.propTypes = {
  signup: PropTypes.func.isRequired,
};

const mapDispatchToProps = { signup };
export default connect(null, mapDispatchToProps)(SignUp);
