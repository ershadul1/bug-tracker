import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { login } from '../../Redux/actions/users';
import { changeNavTitle } from '../../Redux/actions/route';
import styles from './Login.module.css';

const Login = props => {
  useEffect(() => {
    props.changeNavTitle('Log In');
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

  const handleSubmit = () => {
    props.login(state);
  };

  return (
    <>
      <form>
        <label htmlFor="username" className={styles['font-style']}>
          <p>Username:</p>
          <input className={styles.input} type="text" id="username" name="username" required onChange={handleChange} />
        </label>
        <label htmlFor="password" className={styles['font-style']}>
          <p>Password:</p>
          <input className={styles.input} type="password" id="password" name="password" required onChange={handleChange} />
        </label>
        <button className={styles['submit-btn']} type="button" onClick={handleSubmit}>Login</button>
      </form>
      <p className={styles['font-style']}>Don&apos;t have an account!</p>
      <Link to="/signup">
        <button className={styles.btn} type="button">SignUp</button>
      </Link>

    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  changeNavTitle: PropTypes.func.isRequired,
};

const mapDispatchToProps = { login, changeNavTitle };
export default connect(null, mapDispatchToProps)(Login);
