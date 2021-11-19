import React, { useEffect } from 'react';
import {
  Link,
  useHistory
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../../redux/Author/AccountReducer';
import { setState as setStateIn } from '../../redux/NoPageBind/FindReducer';
import { shiftChar } from '../../Utils/singleFunctions/shiftChar';
import { loadData } from '../../Utils/singleFunctions/loadData';
import { handleChange, handleSubmit } from '../../Utils/handlers/handleUser';
import { host } from '../../Utils/constants/globals';

export function AuthorAccount(props) {  
  //const
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.AuthorAccount);
  const found = useSelector((state) => state.Find);
  const globals = useSelector((state) => state.GlobalVar).value;
  const id = useSelector((state) => state.GlobalVar).value.guid;
  if (globals.accessToken != null)
    var token = globals.accessToken.split("").map(shiftChar(-17)).join('');
  else
    history.push({
      pathname: '/',
    });  

  //load data once
  useEffect(() => { loadData(token, host +  `AuthorAccount/${id}`, dispatch, setState) }, []);
     
  //render, depending on state of loading
  if (!loading.value.isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return(
      <div className="d-flex flex-column" margin-bottom="1000"> 
        <Link to="/" className="w-25 mb-3 p-2 nav-link text-dark">Back</Link>
        <span className="pb-3 text-dark">Email: {loading.value.data.email}</span>
        <div className="pb-3">
          <span className="text-dark">Login: </span>
          <input id="in" className="ms-3" type="text" placeholder={loading.value.data.login} onChange={ handleChange.bind(null, dispatch, setStateIn) }></input>
        </div>
        <p className="text-dark">Admin: {loading.value.data.isAdmin ? "Yes" : "No"}</p>
        <p className="text-dark">Banned: {loading.value.data.isBanned ? "Yes" : "No"}</p>
        <div className="pt-2">
          <button className="w-25 pb-2 pt-2 ms-3 rounded-3 text-dark" onClick={dispatch.bind(null,{type: 'USER_UPD_REQUESTED', payload: {token, id, found, loading, dispatch, setState}})}>Change</button>
        </div>
      </div>
    );
  }    
}