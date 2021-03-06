import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../../Redux/actions/projects';
import styles from './ProjectList.module.css';

const ProjectList = ({
  fetchProjects, projects, user,
}) => {
  useEffect(() => {
    fetchProjects(user.token);
  }, []);

  if (!projects.loaded) {
    return <div>Loading project list...</div>;
  }

  if (projects.status === 'ERROR') {
    return <div>{projects.message}</div>;
  }

  if (projects.data.length === 0) {
    return (
      <>
        <Link to="/projects/new" className={styles.newproject}>
          Create a new project
        </Link>
        <br />
        <div>There are no projects</div>
      </>
    );
  }

  return (
    <>
      <Link to="/projects/new" className={styles.newproject}>
        Create a new project
      </Link>
      {projects.data.map(item => (
        <Link to={`/projects/${item.id}`} key={item.id} className={styles.card}>
          <div>
            <p>
              {item.title}
            </p>
          </div>
        </Link>
      ))}
    </>
  );
};

ProjectList.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
  projects: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  projects: state.projects,
});
const mapDispatchToProps = { fetchProjects };
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
