export function toEdit(loading, history, globals, dispatch, setState) {
  var state = Object.assign({}, globals);
  state.link = loading.value.data.photo.link;
  dispatch(setState(state));
  history.push({
    pathname: `/edit/${loading.value.data.photo.photoId}`,
  });
}