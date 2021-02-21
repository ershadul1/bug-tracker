import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchProjectBugs } from '../Redux/actions/projects';

const ProjectBugs = ({
  fetchProjectBugs, bugs, user, match,
}) => {
  useEffect(() => {
    fetchProjectBugs(user.token, parseInt(match.params.id, 10));
  }, []);

  if (!bugs.loaded) {
    return <div>Loading project bugs...</div>;
  }

  if (bugs.status === 'ERROR') {
    return <div>{bugs.message}</div>;
  }

  if (bugs.data.bugs.length === 0) {
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
      {bugs.data.bugs.map(item => (
        <Link to={`/bugs/${item.id}`} key={item.id}>
          <div key={item.id}>
            <p>
              Title:
              {item.title}
            </p>
            <p>
              Description:
              {item.description}
            </p>
            <br />
          </div>
        </Link>
      ))}
    </>
  );
};

ProjectBugs.propTypes = {
  fetchProjectBugs: PropTypes.func.isRequired,
  bugs: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  projects: state.projects,
  bugs: state.bugs,
});

const mapDispatchToProps = { fetchProjectBugs };
export default connect(mapStateToProps, mapDispatchToProps)(ProjectBugs);
