import URL from './url';

const fetchBugs = token => dispatch => {
  fetch(`${URL}/projects/bugs/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      dispatch({ type: 'FETCH_ALL_BUGS', payload: data.data });
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const fetchBugReport = (token, id) => dispatch => {
  console.log('inside fetchBugReport');
  const pass = token || localStorage.getItem('bug-tracker');
  fetch(`${URL}/projects/bugs?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${pass}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      dispatch({ type: 'FETCH_BUG', payload: data });
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const createBugReport = (token, data) => dispatch => {
  const pass = token || localStorage.getItem('bug-tracker');
  fetch(`${URL}/projects/bugs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${pass}`,
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      dispatch({ type: 'CREATE_BUG_REPORT', payload: data });
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const createComment = (token, comment) => dispatch => {
  const pass = token || localStorage.getItem('bug-tracker');
  fetch(`${URL}/projects/bugs/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${pass}`,
    },
    body: JSON.stringify(comment),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      window.location.reload();
      dispatch({ type: 'TRIGGER_CHANGE', payload: data });
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

export {
  fetchBugs, fetchBugReport, createBugReport, createComment,
};
