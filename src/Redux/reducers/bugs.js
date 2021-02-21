const bugsReducer = (state = { loaded: false }, action) => {
  switch (action.type) {
    case 'FETCH_PROJECT_BUGS': {
      return { loaded: true, ...action.payload };
    }
    default:
      return state;
  }
};

export default bugsReducer;
