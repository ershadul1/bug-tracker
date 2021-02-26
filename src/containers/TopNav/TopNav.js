import { useHistory, useLocation } from 'react-router-dom';
import getNavTitle from './NavTitle';
import styles from './TopNav.module.css';
import arrow from '../../assets/left-arrow.svg';

const TopNav = () => {
  const location = useLocation();
  const currentRoute = location.pathname;
  const navTitle = getNavTitle(currentRoute);
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

export default TopNav;
