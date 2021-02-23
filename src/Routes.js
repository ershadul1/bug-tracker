import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { autoLogin } from './Redux/actions/users';
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

const Routes = ({ user, autoLogin }) => {
  useEffect(() => {
    autoLogin(user.token);
  }, []);

  const loggedIn = !!user.token;

  if (!loggedIn) {
    return (
      <BrowserRouter>
        <TopNav />
        <div className="app">
          <Switch>
            <Route path="/signup" exact component={SignUp} />
            <Route path="/" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <TopNav />
      <div className="app">
        <Switch>
          <Route path="/more" exact component={More} />
          <Route path="/projects/:id" exact component={ProjectBugs} />
          <Route path="/new/project" exact component={CreateProject} />
          <Route path="/projects" exact component={ProjectList} />
          <Route path="/bugs" exact component={BugList} />
          <Route path="/bugs/:id" exact component={Bug} />
          <Route path="/new/bug" exact component={CreateBugReport} />
          <Route path="/" exact component={ProjectList} />
        </Switch>
      </div>
      <BottomNav />
    </BrowserRouter>
  );
};

Routes.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  autoLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = { autoLogin };
export default connect(mapStateToProps, mapDispatchToProps)(Routes);
