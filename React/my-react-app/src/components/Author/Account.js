import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../../redux/Author/AccountReducer';
import { setState as setStateIn } from '../../redux/NoPageBind/FindReducer';
import { shiftChar } from '../../Utils/singleFunctions/shiftChar';
import { loadData } from '../../Utils/singleFunctions/loadData';
import { NotificationManager } from 'react-notifications';
import { handleChange, handleSubmit } from '../../Utils/handlers/handleUser';
import { host } from '../../Utils/constants/globals';

export function AuthorAccount(props) {  
  //const
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.AuthorAccount);
  const found = useSelector((state) => state.Find);
  const token = useSelector((state) => state.GlobalVar).value.accessToken.split("").map(shiftChar(-17)).join('');
  const id = useSelector((state) => state.GlobalVar).value.guid;

  //load data once
  useEffect(() => { loadData(token, host +  `AuthorAccount/${id}`, dispatch, setState) }, []);
     
  //render, depending on state of loading
  if (loading.value.error) {
    return <div>Ошибка: {loading.value.error.message}</div>;
  } else if (!loading.value.isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return(
      <div className="d-flex flex-column" margin-bottom="1000">
        <form onSubmit={ handleSubmit.bind(null, token, id, found, loading, dispatch, setState) }> 
          <Link to="/" className="w-25 mb-3 p-2 nav-link text-dark">Back</Link>
          <span className="pb-3 mb-3 text-dark">Email: {loading.value.data.email}</span>
          <div className="pb-3 pt-3">
            <span className="text-dark">Login: </span>
            <input id="in" className="ms-3" type="text" placeholder={loading.value.data.login} onChange={ handleChange.bind(null, dispatch, setStateIn) }></input>
          </div>
          <p className="text-dark">Admin: {loading.value.data.isAdmin ? "Yes" : "No"}</p>
          <p className="text-dark">Banned: {loading.value.data.isBanned ? "Yes" : "No"}</p>
          <div className="pt-2">
            <input className="w-25 pb-2 pt-2 ms-3 rounded-3 text-dark" type="submit" value="change"/>
          </div>
        </form>
      </div>
    );
  }    
}