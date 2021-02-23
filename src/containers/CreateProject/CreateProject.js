import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProject } from '../../Redux/actions/projects';
import { changeNavTitle } from '../../Redux/actions/route';
import styles from './CreateProject.module.css';

const CreateProject = props => {
  useEffect(() => {
    props.changeNavTitle('Create a project');
  }, []);

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
      <form>
        <label htmlFor="title">
          <p className={styles['font-style']}>Title:</p>
          <input placeholder="Write a project title" className={styles.input} type="text" id="title" name="title" required onChange={handleChange} />
        </label>
        <label htmlFor="description">
          <p className={styles['font-style']}>Description:</p>
          <textarea placeholder="Write details of the project" className={styles.description} type="text" id="description" name="description" required onChange={handleChange} />
        </label>
        <button className={styles['submit-btn']} type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
};

CreateProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  changeNavTitle: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = { createProject, changeNavTitle };
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
