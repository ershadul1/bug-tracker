import { combineReducers } from 'redux';
import userReducer from './user';
import projectsReducer from './projects';
import bugsReducer from './bugs';
import currentBugReducer from './currentBug';
import currentProjectBugsReducer from './currentProjectBugs';
import currentRouteReducer from './currentRoute';
import navTitleReducer from './navTitle';
import errorReducer from './error';

const rootReducer = combineReducers({
  user: userReducer,
  projects: projectsReducer,
  bugs: bugsReducer,
  currentProjectBugs: currentProjectBugsReducer,
  currentBugReport: currentBugReducer,
  currentRoute: currentRouteReducer,
  navTitle: navTitleReducer,
  error: errorReducer,
});

export default rootReducer;
