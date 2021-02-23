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
      dispatch({ type: 'FETCH_ALL_BUGS', payload: data });
    })
    .catch(error => {
      throw new Error('Error:', error);
    });
};

const fetchBugReport = (token, id) => dispatch => {
  fetch(`${URL}/projects/bugs?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      dispatch({ type: 'FETCH_BUG', payload: data });
    })
    .catch(error => {
      throw new Error('Error:', error);
    });
};

const createBugReport = (token, data) => dispatch => {
  fetch(`${URL}/projects/bugs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      dispatch({ type: 'CREATE_BUG_REPORT', payload: data });
    })
    .catch(error => {
      throw new Error('Error:', error);
    });
};

const createComment = (token, comment) => dispatch => {
  fetch(`${URL}/projects/bugs/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comment),
  })
    .then(response => response.json())
    .then(data => {
      window.location.reload();
      dispatch({ type: 'TRIGGER_CHANGE', payload: data });
    })
    .catch(error => {
      throw new Error('Error:', error);
    });
};

const assignBug = (token, assign) => dispatch => {
  fetch(`${URL}/projects/bugs/assigns`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(assign),
  })
    .then(response => response.json())
    .then(data => {
      window.location.reload();
      dispatch({ type: 'ASSIGN_BUG', payload: data });
    })
    .catch(error => {
      throw new Error('Error:', error);
    });
};

const resolveBug = (token, resolve) => dispatch => {
  fetch(`${URL}/projects/bugs/resolves`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(resolve),
  })
    .then(response => response.json())
    .then(data => {
      window.location.reload();
      dispatch({ type: 'RESOLVE_BUG', payload: data });
    })
    .catch(error => {
      throw new Error('Error:', error);
    });
};

const cancelResolve = (token, resolve) => dispatch => {
  fetch(`${URL}/projects/bugs/resolves`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(resolve),
  })
    .then(response => response.json())
    .then(data => {
      window.location.reload();
      dispatch({ type: 'CANCEL_RESOLVE', payload: data });
    })
    .catch(error => {
      throw new Error('Error:', error);
    });
};

const cancelAssign = (token, assign) => dispatch => {
  fetch(`${URL}/projects/bugs/assigns`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(assign),
  })
    .then(response => response.json())
    .then(data => {
      window.location.reload();
      dispatch({ type: 'CANCEL_ASSIGN', payload: data });
    })
    .catch(error => {
      throw new Error('Error:', error);
    });
};

export {
  fetchBugs, fetchBugReport, createBugReport, createComment,
  assignBug, resolveBug, cancelResolve, cancelAssign,
};
