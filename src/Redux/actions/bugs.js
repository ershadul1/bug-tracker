import URL from '../../url';

const fetchBugs = token => dispatch => {
  fetch(`${URL}/projects/1/bugs`, {
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

const fetchBugReport = (token, params) => dispatch => {
  fetch(`${URL}/projects/${params.project_id}/bugs/${params.bug_id}`, {
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
  fetch(`${URL}/projects/${data.project_id}/bugs`, {
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

const createComment = (token, data) => dispatch => {
  fetch(`${URL}/projects/${data.project_id}/bugs/${data.bug_id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content: data.content }),
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

const assignBug = (token, data) => dispatch => {
  fetch(`${URL}/projects/${data.project_id}/bugs/${data.bug_id}/assigns`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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

const resolveBug = (token, data) => dispatch => {
  fetch(`${URL}/projects/${data.project_id}/bugs/${data.bug_id}/resolves`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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

const cancelResolve = (token, data) => dispatch => {
  fetch(`${URL}/projects/${data.project_id}/bugs/${data.bug_id}/resolves`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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

const cancelAssign = (token, data) => dispatch => {
  fetch(`${URL}/projects/${data.project_id}/bugs/${data.bug_id}/assigns`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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
