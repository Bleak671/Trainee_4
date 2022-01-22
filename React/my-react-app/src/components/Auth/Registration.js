import React from 'react';
import {
  useHistory
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../../redux/Auth/AuthInfoReducer';
import { setState as setStateGlobal } from '../../redux/Global/GlobalVarReducer';
import { handleChangeEmail, handleChangePassword } from '../../Utils/handlers/handleAuth';

export function Registration() {   
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state.AuthInfo);
  const globals = useSelector((state) => state.GlobalVar);
  //render or redirect, depending on authorizing 
  if (globals.value.accessToken == null)
    return(
      <div className="mt-5 pt-5 pb-5 w-100 border rounded-3 bg-info bg-gradient d-flex align-items-center flex-column">
        <input id="email" className="w-25 mt-2" type="email" placeholder="Email" onChange={handleChangeEmail.bind(null, state, dispatch, setState)}></input>
        <input id="password" className="w-25 mt-2" type="password" placeholder="Password" onChange={handleChangePassword.bind(null, state, dispatch, setState)}></input>
        <button className="w-25 mt-2" onClick={dispatch.bind(null,{type: 'USER_REGISTER_REQUESTED', payload: {state, dispatch, setState:setStateGlobal}})}>Register</button>
      </div>
    )
  else {
    history.push({
      pathname: `/`,
    });
    return null;
  }
}    