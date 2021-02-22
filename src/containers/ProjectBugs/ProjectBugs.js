import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchProjectBugs } from '../../Redux/actions/projects';
import styles from './ProjectBugs.module.css';

const ProjectBugs = ({
  fetchProjectBugs, currentProjectBugs, user, match,
}) => {
  useEffect(() => {
    fetchProjectBugs(user.token, parseInt(match.params.id, 10));
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
        <Link to="/new/bug">
          Create a new bug report
        </Link>
        <div>There are no bug reports for this project</div>
      </>
    );
  }

  return (
    <>
      <Link to="/new/bug">
        Create a new bug report
      </Link>
      {currentProjectBugs.data.bugs.map(item => (
        <Link to={`/bugs/${item.id}`} key={item.id} className={styles.card}>
          <div key={item.id}>
            <p>
              Title:
              {item.title}
            </p>
            <p>
              Description:
              {item.description}
            </p>
          </div>
        </Link>
      ))}
    </>
  );
};

ProjectBugs.propTypes = {
  fetchProjectBugs: PropTypes.func.isRequired,
  currentProjectBugs: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  projects: state.projects,
  currentProjectBugs: state.currentProjectBugs,
});

const mapDispatchToProps = { fetchProjectBugs };
export default connect(mapStateToProps, mapDispatchToProps)(ProjectBugs);
