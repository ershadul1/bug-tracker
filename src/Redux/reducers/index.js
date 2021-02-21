import { combineReducers } from 'redux';
import userReducer from './user';
import projectsReducer from './projects';
import bugsReducer from './bugs';
import currentBugReducer from './currentBug';

const rootReducer = combineReducers({
  user: userReducer,
  projects: projectsReducer,
  bugs: bugsReducer,
  currentBugReport: currentBugReducer,
});

export default rootReducer;
