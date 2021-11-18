export function toEdit(loading, history, global, dispatch, setState) {
  var state = Object.assign({}, global.value);
  state.link = loading.value.data.link;
  dispatch(setState(state));
  history.push({
    pathname: `/edit/${loading.value.data.photoId}`,
  });
}