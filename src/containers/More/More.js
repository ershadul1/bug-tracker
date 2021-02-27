import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../Redux/actions/users';
import styles from './More.module.css';

const More = ({
  user, logout,
}) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.user}>{user.user.username || ''}</div>
        <button className={styles.logout} type="button" onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

More.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = { logout };
export default connect(mapStateToProps, mapDispatchToProps)(More);
