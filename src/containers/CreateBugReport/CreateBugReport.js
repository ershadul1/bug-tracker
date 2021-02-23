import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createBugReport } from '../../Redux/actions/bugs';
import { fetchProjects } from '../../Redux/actions/projects';
import { changeRoute, changeNavTitle } from '../../Redux/actions/route';
import styles from './CreateBugReport.module.css';

const CreateBugReport = ({
  user, projects, createBugReport, history,
  fetchProjects, changeRoute, match, changeNavTitle,
}) => {
  useEffect(() => {
    fetchProjects(user.token);
    changeRoute(match.url);
    changeNavTitle('Report A Bug');
  }, []);

  const [state, setState] = useState({
    title: null,
    description: null,
    author_id: null,
    project_id: null,
    priority: null,
  });

  const handleChange = e => {
    const { value, name } = e.target;
    setState({
      ...state,
      [name]: value,
      author_id: user.user.id,
    });
  };

  const handleSubmit = () => {
    createBugReport(user.token, state);
    history.push(`/projects/${state.project_id}`);
  };

  if (!projects.loaded) {
    return <div>Loading project list</div>;
  }

  return (
    <>
      <form>
        <label htmlFor="title">
          <p className={styles['font-style']}>Title:</p>
          <input placeholder="Give a title to the bug..." className={styles.input} type="text" id="title" name="title" required onChange={handleChange} />
        </label>
        <label htmlFor="description">
          <p className={styles['font-style']}>Description:</p>
          <textarea placeholder="Write some details..." className={styles.description} type="text" id="description" name="description" required onChange={handleChange} />
        </label>

        <div className={styles['select-container']}>
          <select className={styles.select} name="project_id" onChange={handleChange}>
            <option>Select a project</option>
            {projects.data.map(item => (
              <option key={item.id} value={parseInt(item.id, 10)}>
                {item.title}
              </option>
            ))}
          </select>

          <select className={styles.select} name="priority" onChange={handleChange}>
            <option>Select priority</option>
            <option value="high">
              high
            </option>
            <option value="medium">
              medium
            </option>
            <option value="low">
              low
            </option>
          </select>
        </div>
        <button className={styles['submit-btn']} type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
};

CreateBugReport.propTypes = {
  createBugReport: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
  changeNavTitle: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  projects: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  projects: state.projects,
});

const mapDispatchToProps = {
  createBugReport, fetchProjects, changeRoute, changeNavTitle,
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateBugReport);
