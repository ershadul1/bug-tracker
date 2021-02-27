const projectsReducer = (state = { loaded: false }, action) => {
  switch (action.type) {
    case 'FETCH_PROJECTS': {
      return { loaded: true, ...action.payload };
    }
    default:
      return state;
  }
};

export default projectsReducer;
