import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchProjectBugs } from '../../Redux/actions/projects';
import styles from './ProjectBugs.module.css';
import { changeNavTitle } from '../../Redux/actions/route';
import capitalize from '../../helpers/capitalize';
import truncate from '../../helpers/truncate';

const ProjectBugs = ({
  fetchProjectBugs, currentProjectBugs, user, match, changeNavTitle,
}) => {
  useEffect(() => {
    fetchProjectBugs(user.token, match.params.project_id);
    changeNavTitle('Project Bugs');
  }, []);

  if (!currentProjectBugs.loaded) {
    return <div>Loading project bugs...</div>;
  }

  if (currentProjectBugs.status === 'ERROR') {
    return <div>{currentProjectBugs.message}</div>;
  }

  if (currentProjectBugs.data.bugs.length === 0) {
    return (
      <>
        <div>There are no bug reports for this project</div>
      </>
    );
  }

  return (
    <>
      <h1 className={styles['project-title']}>{currentProjectBugs.data.project.title}</h1>
      <p className={styles['project-description']}>{currentProjectBugs.data.project.description}</p>
      {currentProjectBugs.data.bugs.map(item => (
        <Link to={`/projects/${item.project_id}/bugs/${item.id}`} key={item.id} className={`${styles.card} ${item.priority} ${item.status}`}>
          <div key={item.id} className={styles.info}>
            <p>
              {capitalize(truncate(item.title, 20))}
            </p>
            <p>
              {item.status}
            </p>
          </div>
        </Link>
      ))}
    </>
  );
};

ProjectBugs.propTypes = {
  fetchProjectBugs: PropTypes.func.isRequired,
  changeNavTitle: PropTypes.func.isRequired,
  currentProjectBugs: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  projects: state.projects,
  currentProjectBugs: state.currentProjectBugs,
});

const mapDispatchToProps = { fetchProjectBugs, changeNavTitle };
export default connect(mapStateToProps, mapDispatchToProps)(ProjectBugs);
