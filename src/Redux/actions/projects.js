import URL from '../../url';

const fetchProjects = token => dispatch => {
  fetch(`${URL}/projects`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      dispatch({ type: 'FETCH_PROJECTS', payload: data });
    })
    .catch(error => {
      throw new Error('Error:', error);
    });
};

const fetchProjectBugs = (token, id) => dispatch => {
  fetch(`${URL}/projects/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      dispatch({ type: 'FETCH_PROJECT_BUGS', payload: data });
    })
    .catch(error => {
      throw new Error('Error:', error);
    });
};

const createProject = (token, data) => dispatch => {
  fetch(`${URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      dispatch({ type: 'CREATE_PROJECT', payload: data });
    })
    .catch(error => {
      throw new Error('Error:', error);
    });
};

export { fetchProjects, fetchProjectBugs, createProject };
