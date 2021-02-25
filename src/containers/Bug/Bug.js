import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchBugReport, createComment, assignBug, resolveBug, cancelResolve, cancelAssign,
} from '../../Redux/actions/bugs';
import styles from './Bug.module.css';
import send from '../../assets/send.svg';

const Bug = ({
  currentBugReport, createComment, match, user,
  fetchBugReport, assignBug, resolveBug, cancelResolve, cancelAssign,
}) => {
  useEffect(() => {
    fetchBugReport(user.token, match.params);
  }, []);

  const [state, setState] = useState({
    content: null,
    user_id: null,
    bug_id: null,
  });

  if (!currentBugReport.loaded) {
    return <div>Loading bug report...</div>;
  }

  const handleChange = e => {
    const { value, name } = e.target;
    setState({
      ...state,
      [name]: value,
      user_id: user.user.id,
      bug_id: currentBugReport.data.bug.id,
      project_id: currentBugReport.data.bug.project_id,
    });
  };

  const data = {
    user_id: user.user.id,
    bug_id: currentBugReport.data.bug.id,
    project_id: currentBugReport.data.bug.project_id,
  };

  const handleAssign = () => {
    assignBug(user.token, data);
  };

  const handleCancelAssign = () => {
    cancelAssign(user.token, data);
  };

  const handleResolve = () => {
    resolveBug(user.token, data);
  };

  const handleCancelResolve = () => {
    cancelResolve(user.token, data);
  };

  const handleSubmit = () => {
    createComment(user.token, state);
  };

  let bugControlls;

  if (currentBugReport.data.bug.status === 'open') {
    bugControlls = (
      <div>
        <button className={styles['yes-btn']} type="button" onClick={handleAssign}>Assign to me</button>
      </div>
    );
  } else if (currentBugReport.data.bug.status === 'assigned') {
    if (currentBugReport.data.assign.user_id === user.user.id) {
      bugControlls = (
        <div>
          <p className={styles['font-style']}>
            <b>Assined to:</b>
            {currentBugReport.data.assignee_name}
          </p>
          <button className={styles['cancel-btn']} type="button" onClick={handleCancelAssign}>I don&apos;t want to resolve the bug</button>
          <button className={styles['yes-btn']} type="button" onClick={handleResolve}>I have resolved the bug</button>
        </div>
      );
    } else {
      bugControlls = (
        <div>
          <p className={styles['font-style']}>
            <b>Assigned to:</b>
            {currentBugReport.data.assignee_name}
          </p>
        </div>
      );
    }
  } else if (currentBugReport.data.bug.status === 'resolved') {
    if (currentBugReport.data.assign.user_id === user.user.id) {
      bugControlls = (
        <div>
          <p className={styles['font-style']}>
            <b>Resolved by:</b>
            {currentBugReport.data.assignee_name}
          </p>
          <button className={styles['cancel-btn']} type="button" onClick={handleCancelResolve}>I didn&apos;t resolve the bug</button>
        </div>
      );
    } else {
      bugControlls = (
        <div>
          <p className={styles['font-style']}>
            <b>Resolved by:</b>
            {currentBugReport.data.assignee_name}
          </p>
        </div>
      );
    }
  }

  return (
    <>
      <div className={styles.details}>
        <p className={styles['font-style-title']}>{currentBugReport.data.bug.title}</p>
        <p className={styles['font-style']}>
          <b>Description:</b>
          <br />
          {currentBugReport.data.bug.description}
        </p>
        <p className={styles['font-style']}>
          <b>Author:</b>
          {currentBugReport.data.author_name || ''}
        </p>
        <p className={styles['font-style']}>
          <b>Status:</b>
          {currentBugReport.data.bug.status}
        </p>
        {bugControlls}
      </div>
      <div className={styles['comments-container']}>
        <div>
          <p className={styles['comment-header']}>Comments</p>
          <form className={styles['comment-form']}>
            <textarea placeholder="Write your comment here.." type="text" id="content" name="content" required onChange={handleChange} />
            <button type="button" onClick={handleSubmit}>
              <img className={styles.send} src={send} alt="send" />
            </button>
          </form>
        </div>
        <div>
          {currentBugReport.data.comments.map(
            item => (
              <div key={item.id} className={styles.comment}>
                <p>{item.content}</p>
              </div>
            ),
          )}
        </div>
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
  assignBug: PropTypes.func.isRequired,
  resolveBug: PropTypes.func.isRequired,
  cancelResolve: PropTypes.func.isRequired,
  cancelAssign: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  projects: state.projects,
  currentBugReport: state.currentBugReport,
});

const mapDispatchToProps = {
  fetchBugReport, createComment, assignBug, resolveBug, cancelResolve, cancelAssign,
};
export default connect(mapStateToProps, mapDispatchToProps)(Bug);
