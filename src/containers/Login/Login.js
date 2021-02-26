import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { login } from '../../Redux/actions/users';
import styles from './Login.module.css';

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

  const handleSubmit = e => {
    e.preventDefault();
    props.login(state);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className={styles['font-style']}>
          <p>Username:</p>
          <input className={styles.input} type="text" id="username" name="username" required onChange={handleChange} />
        </label>
        <label htmlFor="password" className={styles['font-style']}>
          <p>Password:</p>
          <input className={styles.input} type="password" id="password" name="password" required onChange={handleChange} />
        </label>
        <input className={styles['submit-btn']} type="submit" value="Login" />
      </form>
      <p className={styles['font-style']}>Don&apos;t have an account!</p>
      <Link to="/signup">
        <button className={styles.btn} type="button">Sign Up</button>
      </Link>

    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = { login };
export default connect(null, mapDispatchToProps)(Login);
