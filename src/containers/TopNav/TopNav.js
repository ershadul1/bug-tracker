import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './TopNav.module.css';
import arrow from '../../assets/left-arrow.svg';

const TopNav = ({ navTitle }) => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          {navTitle}
        </div>
        <button type="button" onClick={handleBack} className={styles.back}>
          <img className={styles.arrow} src={arrow} alt="back" />
        </button>
      </div>
    </>
  );
};

TopNav.propTypes = {
  navTitle: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  projects: state.projects,
  currentBugReport: state.currentBugReport,
  navTitle: state.navTitle,
});

export default connect(mapStateToProps, null)(TopNav);
