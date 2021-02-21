import URL from './url';

const fetchProjects = token => dispatch => {
  const pass = token || localStorage.getItem('bug-tracker');
  fetch(`${URL}/projects/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${pass}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      dispatch({ type: 'FETCH_PROJECTS', payload: data });
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const fetchProjectBugs = (token, id) => dispatch => {
  const pass = token || localStorage.getItem('bug-tracker');
  fetch(`${URL}/projects?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${pass}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      dispatch({ type: 'FETCH_PROJECT_BUGS', payload: data });
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const createProject = (token, data) => dispatch => {
  const pass = token || localStorage.getItem('bug-tracker');
  fetch(`${URL}/projects`, {
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
      dispatch({ type: 'CREATE_PROJECT', payload: data });
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

export { fetchProjects, fetchProjectBugs, createProject };
