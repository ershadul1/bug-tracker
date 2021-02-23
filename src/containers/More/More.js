import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { changeRoute, changeNavTitle } from '../../Redux/actions/route';
import { logout } from '../../Redux/actions/users';
import styles from './More.module.css';

const More = ({
  user, changeRoute, match, changeNavTitle, logout,
}) => {
  useEffect(() => {
    changeRoute(match.url);
    changeNavTitle('More');
  }, []);

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
  changeRoute: PropTypes.func.isRequired,
  changeNavTitle: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = { changeRoute, changeNavTitle, logout };
export default connect(mapStateToProps, mapDispatchToProps)(More);
