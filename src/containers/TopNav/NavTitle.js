const titles = {
  '/bugs/new': 'Report a bug',
  '/projects': 'All Projects',
  '/bugs': 'All Bug Reports',
  '/more': 'More',
  '/signup': 'Sign Up',
};

const getNavTitle = route => titles[route];

export default getNavTitle;
