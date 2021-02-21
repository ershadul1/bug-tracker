import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import ProjectList from './containers/ProjectList';
import ProjectBugs from './containers/ProjectBugs';
import Bug from './containers/Bug';
import CreateProject from './containers/CreateProject';
import CreateBugReport from './containers/CreateBugReport';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Routes = ({ user }) => {
  const loggedIn = !!user.token || localStorage.getItem('bug-tracker');

  if (!loggedIn) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signup" exact component={SignUp} />
          <Route path="/" component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/projects/:id" exact component={ProjectBugs} />
        <Route path="/new/project" exact component={CreateProject} />
        <Route path="/projects" exact component={ProjectList} />
        <Route path="/bugs/:id" exact component={Bug} />
        <Route path="/new/bug" exact component={CreateBugReport} />
        <Route path="/" exact component={ProjectList} />
      </Switch>
    </BrowserRouter>
  );
};

Routes.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({ user: state.user });
export default connect(mapStateToProps, null)(Routes);
