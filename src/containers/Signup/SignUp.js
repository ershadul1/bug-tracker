import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { signup } from '../../Redux/actions/users';
import { changeNavTitle } from '../../Redux/actions/route';
import styles from './SignUp.module.css';

const SignUp = props => {
  useEffect(() => {
    props.changeNavTitle('Sign Up');
  }, []);

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
    props.signup(state);
    setTimeout(() => { props.history.push('/projects'); }, 3000);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className={styles['font-style']}>
          <p>Username</p>
          <input className={styles.input} type="text" id="username" name="username" required onChange={handleChange} />
        </label>
        <label htmlFor="password" className={styles['font-style']}>
          <p>Password</p>
          <input className={styles.input} type="password" id="password" name="password" required onChange={handleChange} />
        </label>
        <input className={styles['submit-btn']} type="submit" />
      </form>
      <p className={styles['font-style']}>Already have an account!</p>
      <Link to="/">
        <button className={styles.btn} type="button">Login</button>
      </Link>
    </>
  );
};

SignUp.propTypes = {
  signup: PropTypes.func.isRequired,
  changeNavTitle: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

const mapDispatchToProps = { signup, changeNavTitle };
export default connect(null, mapDispatchToProps)(SignUp);
