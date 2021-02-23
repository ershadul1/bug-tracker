const navTitleReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_NAV_TITLE': {
      return action.payload;
    }
    default:
      return state;
  }
};

export default navTitleReducer;
