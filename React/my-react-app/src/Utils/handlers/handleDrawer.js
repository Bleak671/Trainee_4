import { saltPepperRemoval, getRegion } from '../multiplyFunctions/drawFunctions';

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

export function handleSubmitRemoveNoise(payload) {
  return new Promise((resolve, reject) => {
    try {
      saltPepperRemoval(payload.drawerIn.value);
      resolve();
    }
    catch(e) {
      reject(e);
    }
  });
}

export function handleSubmitRegion(payload) {
  return new Promise((resolve, reject) => {
    try {
      getRegion(payload.drawerIn.value, payload.originalImg);
      resolve();
    }
    catch(e) {
      reject(e);
    }
  });
}