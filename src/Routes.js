import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from './Redux/actions/users';
import Login from './containers/Login/Login';
import SignUp from './containers/Signup/SignUp';
import ProjectList from './containers/ProjectList/ProjectList';
import ProjectBugs from './containers/ProjectBugs/ProjectBugs';
import Bug from './containers/Bug/Bug';
import CreateProject from './containers/CreateProject/CreateProject';
import CreateBugReport from './containers/CreateBugReport/CreateBugReport';
import BottomNav from './containers/BottomNav/BottomNav';
import BugList from './containers/BugList/BugList';
import TopNav from './containers/TopNav/TopNav';
import More from './containers/More/More';

const Routes = ({ user, getUser, error }) => {
  const loggedIn = !!user.token;

  if (!loggedIn) {
    return (
      <BrowserRouter>
        <TopNav />
        <div className="error">{error}</div>
        <div className="app">
          <Switch>
            <Route path="/signup" exact component={SignUp} />
            <Route path="/" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

  useEffect(() => {
    getUser(user.token);
  }, []);

  return (
    <BrowserRouter>
      <TopNav />
      <div className="app">
        <Switch>
          <Route path="/more" exact component={More} />
          <Route path="/projects/new" exact component={CreateProject} />
          <Route path="/projects/:project_id" exact component={ProjectBugs} />
          <Route path="/projects" exact component={ProjectList} />
          <Route path="/bugs" exact component={BugList} />
          <Route path="/projects/:project_id/bugs/:bug_id" exact component={Bug} />
          <Route path="/bugs/new" exact component={CreateBugReport} />
          <Route path="/" exact component={ProjectList} />
        </Switch>
      </div>
      <BottomNav />
    </BrowserRouter>
  );
};

Routes.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  getUser: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({ user: state.user, error: state.error });

const mapDispatchToProps = { getUser };
export default connect(mapStateToProps, mapDispatchToProps)(Routes);
