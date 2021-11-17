import { saltPepperRemoval, getRegion } from '../multiplyFunctions/drawFunctions';

export function handleChangeRemoveNoise(state, dispatch, setState, event) {
  var data = Object.assign({},state.value);
  data.RemoveNoise = event.target.value;
  dispatch(setState(data));
}

export function handleChangeRegion(state, dispatch, setState, event) {
  var data = Object.assign({},state.value);
  data.Region = event.target.value;
  dispatch(setState(data));
}

export function handleSubmitRemoveNoise(state, event) {
  event.preventDefault();
  saltPepperRemoval();
}

export function handleSubmitRegion(state, event) {
  event.preventDefault();
  getRegion();
}