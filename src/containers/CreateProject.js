import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProject } from '../Redux/actions/projects';

const CreateProject = props => {
  const [state, setState] = useState({
    title: null,
    description: null,
  });

  const handleChange = e => {
    const { value, name } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    props.createProject(props.user.token, state);
    props.history.push('/projects');
  };

  return (
    <>
      <h1>Create a project</h1>
      <form>
        <label htmlFor="title">
          <p>title</p>
          <input type="text" id="title" name="title" required onChange={handleChange} />
        </label>
        <label htmlFor="description">
          <p>description</p>
          <input type="text" id="description" name="description" required onChange={handleChange} />
        </label>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
};

CreateProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = { createProject };
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
