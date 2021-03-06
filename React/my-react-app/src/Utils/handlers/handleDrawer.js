export function handleChangeRemoveNoise(state, dispatch, setState, event) {
  var data = Object.assign({},state.value);
  data.removeNoise = event.target.value;
  dispatch(setState(data));
}

export function handleChangeRegion(state, dispatch, setState, event) {
  var data = Object.assign({},state.value);
  data.region = event.target.value;
  dispatch(setState(data));
}