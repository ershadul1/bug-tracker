import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchBugReport, createComment } from '../Redux/actions/bugs';
import { autoLogin } from '../Redux/actions/users';
import styles from './Bug.module.css';

const Bug = ({
  currentBugReport, createComment, autoLogin, match, user, fetchBugReport,
}) => {
  useEffect(() => {
    autoLogin(user.token);
    fetchBugReport(user.token, parseInt(match.params.id, 10));
  }, []);

  const [state, setState] = useState({
    content: null,
    user_id: null,
    bug_id: null,
  });

  const handleChange = e => {
    const { value, name } = e.target;
    setState({
      ...state,
      [name]: value,
      user_id: user.user.id,
      bug_id: currentBugReport.data.bug.id,
    });
  };

  const handleSubmit = () => {
    createComment(user.token, state);
  };

  if (!currentBugReport.loaded) {
    return <div>Loading bug report...</div>;
  }

  return (
    <>
      <div>
        <p>{currentBugReport.data.bug.title}</p>
        <p>{currentBugReport.data.bug.description}</p>
      </div>
      <div>
        <form>
          <label htmlFor="comment">
            <p>Write a comment</p>
            <input type="text" id="content" name="content" required onChange={handleChange} />
          </label>
          <button type="button" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
      <div>
        <p className={styles.ray}>Comments</p>
        {currentBugReport.data.comments.map(item => <p key={item.id}>{item.content}</p>)}
      </div>
    </>
  );
};

Bug.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  currentBugReport: PropTypes.instanceOf(Object).isRequired,
  fetchBugReport: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  autoLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  projects: state.projects,
  currentBugReport: state.currentBugReport,
});

const mapDispatchToProps = { fetchBugReport, createComment, autoLogin };
export default connect(mapStateToProps, mapDispatchToProps)(Bug);
