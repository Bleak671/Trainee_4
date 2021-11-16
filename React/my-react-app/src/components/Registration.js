import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams
} from "react-router-dom";
import { shiftChar } from '../Utils/shiftChar';
import { NotificationManager } from 'react-notifications';
import { getHash } from '../Utils/getHash';
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../redux/AuthInfoReducer';
import { handleChangeEmail, handleChangePassword, handleSubmitRegister } from '../Utils/formFunctions';

export function Registration() {   
  const dispatch = useDispatch();
  const state = useSelector((state) => state.AuthInfo);
  //render or redirect, depending on authorizing 
  var token = sessionStorage.getItem("accessToken") == null
  if (token)
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