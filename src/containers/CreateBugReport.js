import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createBugReport } from '../Redux/actions/bugs';
import { fetchProjects } from '../Redux/actions/projects';
import { autoLogin } from '../Redux/actions/users';

const CreateBugReport = ({
  user, projects, createBugReport, history, fetchProjects, autoLogin,
}) => {
  useEffect(() => {
    autoLogin(user.token);
    fetchProjects(user.token);
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
    return <div>Loading projects list</div>;
  }

  return (
    <>
      <h1>Create a bug report</h1>
      <form>
        <label htmlFor="title">
          <p>title</p>
          <input type="text" id="title" name="title" required onChange={handleChange} />
        </label>
        <label htmlFor="description">
          <p>description</p>
          <input type="text" id="description" name="description" required onChange={handleChange} />
        </label>

        <select name="project_id" onChange={handleChange}>
          <option>Select a project</option>
          {projects.data.map(item => (
            <option key={item.id} value={parseInt(item.id, 10)}>
              {item.title}
            </option>
          ))}
        </select>

        <select name="priority" onChange={handleChange}>
          <option>Select a priority</option>
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

        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
};

CreateBugReport.propTypes = {
  createBugReport: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  autoLogin: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  projects: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  projects: state.projects,
});

const mapDispatchToProps = { createBugReport, fetchProjects, autoLogin };
export default connect(mapStateToProps, mapDispatchToProps)(CreateBugReport);
