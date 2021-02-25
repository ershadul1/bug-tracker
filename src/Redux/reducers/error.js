const errorReducer = (state = '', action) => {
  switch (action.type) {
    case 'ERROR': {
      return action.payload;
    }
    case 'REMOVE_ERROR': {
      return '';
    }
    default:
      return state;
  }
};

export default errorReducer;
