import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './BottomNav.module.css';
import add from '../../assets/add.svg';
import bug from '../../assets/bug.svg';
import project from '../../assets/project.svg';
import more from '../../assets/more.svg';

const BottomNav = ({ currentRoute }) => (
  <>
    <div className={styles.container}>
      <Link to="/new/bug" className={currentRoute === '/new/bug' ? styles.selected : null}>
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

BottomNav.propTypes = {
  currentRoute: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  projects: state.projects,
  currentBugReport: state.currentBugReport,
  currentRoute: state.currentRoute,
});

export default connect(mapStateToProps, null)(BottomNav);
