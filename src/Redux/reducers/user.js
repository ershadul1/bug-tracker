const initialState = {
  user: { username: '' },
  token: localStorage.getItem('bug-tracker') || null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return { ...state, ...action.payload };
    }
    case 'AUTO_LOGIN': {
      return { ...state, ...action.payload };
    }
    case 'SIGNUP': {
      return { ...state, ...action.payload };
    }
    case 'LOGOUT': {
      return {};
    }
    default:
      return state;
  }
};

export default userReducer;
