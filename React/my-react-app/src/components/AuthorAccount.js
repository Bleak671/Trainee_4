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
import { setState } from '../redux/AuthorAccountReducer';
import { shiftChar, loadData } from '../Utils/businessLogic';
import { NotificationManager } from 'react-notifications';

export function AuthorAccount(props) {  
  //const
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.AuthorAccount);
  const token = sessionStorage.getItem("accessToken").split("").map(shiftChar(-17)).join('');
  const id = sessionStorage.getItem("guid");

  //load data once
  useEffect(() => { loadData(token, `https://localhost:44340/api/AuthorAccount/${id}`, dispatch, setState) }, []);

  //caller for updateData
  function change() {
    var photo = Object.assign({}, loading.value.data);
    photo.Login = document.getElementById("in").value;
    updateData(photo);
  }

  //editing data and refreshing
  function updateData(obj) {
    const requestOptions = {
        method: 'PUT',
        mode: 'cors',
        headers: {  
            'Content-Type': 'application/json',    
            'Access-Control-Allow-Origin':'*',
            "Authorization": "Bearer " + token  // using token
        },
        body: JSON.stringify(obj)     
      };
      fetch( `https://localhost:44340/api/AuthorAccount`, requestOptions)
      .then(
        () => { NotificationManager.success('Changed', '',2000); loadData(token, `https://localhost:44340/api/AuthorAccount/${id}`, dispatch, setState) },
        (error) => { NotificationManager.error('Something wrong: '+error, '',2000); }
      )
  }
     
  //render, depending on state of loading
  if (loading.value.error) {
    return <div>Ошибка: {loading.value.error.message}</div>;
  } else if (!loading.value.isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return(
      <div className="d-flex flex-column" margin-bottom="1000">
        <Link to="/" className="w-25 mb-3 p-2 nav-link text-dark">Back</Link>
        <span className="pb-3 text-dark">Id: {loading.value.data.UserId}</span>
        <div className="pb-3">
          <span className="text-dark">Login: </span>
          <input id="in" className="ms-3" type="text" placeholder={loading.value.data.Login}></input>
        </div>
        <span className="pb-3 text-dark">Admin: {loading.value.data.isAdmin.toString()}</span>
        <span className="pb-3 text-dark">Banned: {loading.value.data.isBanned.toString()}</span>
        <div>
          <button className="w-25 pb-2 pt-2 ms-3 rounded-3 text-dark" onClick={change} >Change</button>
        </div>
      </div>
    );
  }    
}