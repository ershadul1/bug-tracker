import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../../Redux/actions/projects';
import { changeRoute, changeNavTitle } from '../../Redux/actions/route';
import styles from './ProjectList.module.css';

const ProjectList = ({
  fetchProjects, projects, user, match, changeRoute, changeNavTitle,
}) => {
  useEffect(() => {
    fetchProjects(user.token);
    changeRoute(match.url);
    changeNavTitle('Projects');
  }, []);

  if (!projects.loaded) {
    return <div>Loading project list...</div>;
  }

  if (projects.status === 'ERROR') {
    return <div>{projects.message}</div>;
  }

  if (projects.data.length === 0) {
    return <div>There are no projects</div>;
  }

  return (
    <>
      <Link to="/new/project" className={styles.newproject}>
        Create a new project
      </Link>
      {projects.data.map(item => (
        <Link to={`/projects/${item.id}`} key={item.id} className={styles.card}>
          <div>
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

ProjectList.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
  changeNavTitle: PropTypes.func.isRequired,
  projects: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  projects: state.projects,
});
const mapDispatchToProps = { fetchProjects, changeRoute, changeNavTitle };
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
