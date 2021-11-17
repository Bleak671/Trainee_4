import { login } from '../singleFunctions/login'
import { register } from '../singleFunctions/register';

export function handleChangeEmail(state, dispatch, setState, event) {
  var data = Object.assign({},state.value);
  data.Email = event.target.value;
  dispatch(setState(data));
}

export function handleChangePassword(state, dispatch, setState, event) {
  var data = Object.assign({},state.value);
  data.Password = event.target.value;
  dispatch(setState(data));
}

export function handleSubmitLogin(state, dispatch, setState, event) {
  event.preventDefault();
  login(state.value.Email, state.value.Password, dispatch, setState);
}

export function handleSubmitRegister(state, dispatch, setState, event) {
  event.preventDefault();
  register(state.value.Email, state.value.Password, dispatch, setState);
}