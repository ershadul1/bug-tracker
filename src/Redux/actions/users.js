import URL from './url';

const login = credentials => dispatch => {
  fetch(`${URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      localStorage.setItem('bug-tracker', data.token);
      dispatch({ type: 'LOGIN', payload: data });
    })
    .catch(error => {
      console.error('Error:', error);
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
      console.log('Success:', data);
      localStorage.setItem('bug-tracker', data.token);
      dispatch({ type: 'SIGNUP', payload: data });
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const autoLogin = token => dispatch => {
  const pass = token || localStorage.getItem('bug-tracker');
  fetch(`${URL}/auto_login`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${pass}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      dispatch({ type: 'AUTO_LOGIN', payload: data });
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

export { login, signup, autoLogin };
