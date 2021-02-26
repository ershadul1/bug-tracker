import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchBugs } from '../../Redux/actions/bugs';
import capitalize from '../../helpers/capitalize';
import truncate from '../../helpers/truncate';
import styles from './BugList.module.css';

const BugList = ({
  fetchBugs, bugs, user,
}) => {
  useEffect(() => {
    fetchBugs(user.token);
  }, []);

  if (!bugs.loaded) {
    return <div>Loading bug reports...</div>;
  }

  if (bugs.status === 'ERROR') {
    return <div>{bugs.message}</div>;
  }

  if (bugs.data.length === 0) {
    return (
      <>
        <div>There are no bug reports yet</div>
      </>
    );
  }

  return (
    <>
      {bugs.data.map(item => (
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

BugList.propTypes = {
  fetchBugs: PropTypes.func.isRequired,
  bugs: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  projects: state.projects,
  bugs: state.bugs,
});

const mapDispatchToProps = { fetchBugs };
export default connect(mapStateToProps, mapDispatchToProps)(BugList);
