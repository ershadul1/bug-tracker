const currentRouteReducer = (state = '/projects', action) => {
  switch (action.type) {
    case 'CHANGE_ROUTE': {
      return action.payload;
    }
    default:
      return state;
  }
};

export default currentRouteReducer;
