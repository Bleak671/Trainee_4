import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams
} from "react-router-dom";
import { shiftChar } from '../../Utils/singleFunctions/shiftChar';
import { NotificationManager } from 'react-notifications';
import { getHash } from '../../Utils/singleFunctions/getHash';
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../../redux/Auth/AuthInfoReducer';
import { handleChangeEmail, handleChangePassword, handleSubmitRegister } from '../../Utils/handlers/handleAuth';

export function Registration() {   
  const dispatch = useDispatch();
  const state = useSelector((state) => state.AuthInfo);
  const globals = useSelector((state) => state.GlobalVar);
  //render or redirect, depending on authorizing 
  if (globals.value.accessToken == null)
    return(
      <div className="mt-5 pt-5 pb-5 w-100 border rounded-3 bg-info bg-gradient d-flex align-items-center flex-column">
        <form onSubmit={handleSubmitRegister.bind(null, state)}>
          <input id="email" className="w-25 mt-2" type="email" placeholder="Email" onChange={handleChangeEmail.bind(null, state, dispatch, setState)}></input>
          <input id="password" className="w-25 mt-2" type="password" placeholder="Password" onChange={handleChangePassword.bind(null, state, dispatch, setState)}></input>
          <div className="w-100">
            <input className="w-50 mt-2" type="submit" value="Register"></input>
          </div>
        </form>
      </div>
    )
  else {
    return <Redirect to="/" />
  }
}    