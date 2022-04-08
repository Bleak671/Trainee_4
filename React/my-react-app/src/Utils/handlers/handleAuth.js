import { NotificationManager } from 'react-notifications';
import { login } from '../singleFunctions/login'
import { register } from '../singleFunctions/register';

export function handleChangeEmail(state, dispatch, setState, event) {
  var data = Object.assign({},state.value);
  data.email = event.target.value;
  dispatch(setState(data));
}

export function handleChangePassword(state, dispatch, setState, event) {
  var data = Object.assign({},state.value);
  data.password = event.target.value;
  dispatch(setState(data));
}

export function handleSubmitLogin(payload) {
  return new Promise((resolve, reject) => {
    login(payload.state.value.email, payload.state.value.password, payload.dispatch, payload.setState)
    .then(res => resolve(res))
    .catch(e => reject(e));
  });
}

export function handleSubmitRegister(payload) {
  return new Promise((resolve, reject) => {
    register(payload.state.value.email, payload.state.value.password, payload.dispatch, payload.setState)
    .then(res => resolve(res))
    .catch(e => reject(e));
  });
}