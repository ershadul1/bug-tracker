import URL from '../../url';

const login = credentials => dispatch => {
  fetch(`${URL}/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'SUCCESS') {
        localStorage.setItem('bug-tracker', data.token);
        dispatch({ type: 'LOGIN', payload: data });
      } else {
        dispatch({
          type: 'ERROR',
          payload: data.error,
        });
      }
    })
    .catch(error => {
      throw new Error('Error:', error);
    });
};

const signup = credentials => dispatch => {
  fetch(`${URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'SUCCESS') {
        localStorage.setItem('bug-tracker', data.token);
        dispatch({ type: 'SIGNUP', payload: data });
      } else {
        dispatch({
          type: 'ERROR',
          payload: data.error,
        });
      }
    })
    .catch(error => {
      throw new Error('Error:', error);
    });
};

const getUser = token => dispatch => {
  fetch(`${URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'SUCCESS') {
        dispatch({ type: 'AUTO_LOGIN', payload: data });
        dispatch({ type: 'REMOVE_ERROR', payload: data });
      } else {
        localStorage.removeItem('bug-tracker');
      }
    })
    .catch(error => {
      throw new Error('Error:', error);
    });
};

const logout = () => {
  localStorage.removeItem('bug-tracker');
  return ({
    type: 'LOGOUT',
  });
};

export {
  login, signup, getUser, logout,
};
