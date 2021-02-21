const currentBugReducer = (state = { loaded: false }, action) => {
  switch (action.type) {
    case 'FETCH_BUG': {
      return { loaded: true, ...action.payload };
    }
    default:
      return state;
  }
};

export default currentBugReducer;
