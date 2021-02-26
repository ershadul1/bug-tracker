const titles = {
  '/bugs/new': 'Report a bug',
  '/projects': 'All Projects',
  '/bugs': 'All Bug Reports',
  '/more': 'More',
};

const getNavTitle = route => titles[route];

export default getNavTitle;
