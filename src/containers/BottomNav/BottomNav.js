import { Link, useLocation } from 'react-router-dom';
import styles from './BottomNav.module.css';
import add from '../../assets/add.svg';
import bug from '../../assets/bug.svg';
import project from '../../assets/project.svg';
import more from '../../assets/more.svg';

const BottomNav = () => {
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <>
      <div className={styles.container}>
        <Link to="/bugs/new" className={currentRoute === '/bugs/new' ? styles.selected : null}>
          <img src={add} alt="add-bug" className={styles.icon} />
          <div>Add Bug Report</div>
        </Link>
        <Link
          to="/projects"
          className={(currentRoute === '/projects' ? styles.selected : null)
      || (currentRoute === '/' ? styles.selected : null)}
        >
          <img src={project} alt="projects" className={styles.icon} />
          <div>Projects</div>
        </Link>
        <Link to="/bugs" className={currentRoute === '/bugs' ? styles.selected : null}>
          <img src={bug} alt="bugs" className={styles.icon} />
          <div>Bugs</div>
        </Link>
        <Link to="/more" className={currentRoute === '/more' ? styles.selected : null}>
          <img src={more} alt="more" className={styles.icon} />
          <div>More</div>
        </Link>
      </div>
    </>
  );
};

export default BottomNav;
