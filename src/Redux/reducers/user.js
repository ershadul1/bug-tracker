const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return { ...action.payload };
    }
    case 'AUTO_LOGIN': {
      return { user: { ...action.payload } };
    }
    case 'SIGNUP': {
      return { ...action.payload };
    }
    default:
      return state;
  }
};

export default userReducer;
