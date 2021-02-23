const changeRoute = route => ({
  type: 'CHANGE_ROUTE',
  payload: route,
});

const changeNavTitle = title => ({
  type: 'CHANGE_NAV_TITLE',
  payload: title,
});

export { changeRoute, changeNavTitle };
