import { login } from './login'
import { register } from './register';

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

export function handleSubmitLogin(state, event) {
  event.preventDefault();
  login(state.value.Email, state.value.Password);
}

export function handleSubmitRegister(state, event) {
  event.preventDefault();
  register(state.value.Email, state.value.Password);
}