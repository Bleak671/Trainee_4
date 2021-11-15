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
import { setState } from '../redux/AdminUserReducer';
import { shiftChar, loadData } from '../Utils/businessLogic';
import { NotificationManager } from 'react-notifications';

//Component for selected photo from Admin photo
export function AdminUser(props) {  
  //constants
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.AdminUser);
  const token = sessionStorage.getItem("accessToken").split("").map(shiftChar(-17)).join('');
  const id = props.match.params.UserId.toString();

  //load data once after rendering
  useEffect(() => { loadData(token, `https://localhost:44340/api/Admin/GetUser/${id}`, dispatch, setState) }, []);

  //switch state isBanned of loaded user and sends it
  function changeBanned() {
    var photo = Object.assign({}, loading.value.data);
    photo.isBanned = !photo.isBanned;
    updateData(photo);
  }

  //switch state isAdmin of loaded user and sends it
  function changeAdmin() {
    var photo = Object.assign({}, loading.value.data);
    photo.isAdmin = !photo.isAdmin;
    updateData(photo);
  }

  //sending edit request and refresing data
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
      fetch( `https://localhost:44340/api/Admin/EditUser`, requestOptions)
      .then(
        () => { loadData(token, `https://localhost:44340/api/Admin/GetUser/${id}`, dispatch, setState) }
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
        <Link to="/admin/user" className="w-25 mb-3 p-2 nav-link text-dark">Back</Link>
        <span className="pb-3 text-dark">Id: {loading.value.data.UserId}</span>
        <span className="pb-3 text-dark">Login: {loading.value.data.Login}</span>
        <div className="pb-3">
          <span className="text-dark">Admin: {loading.value.data.isAdmin.toString()}</span>
          <button className="ms-3 rounded-3" onClick={changeAdmin}>Change</button>
        </div>
        <div className="pb-3">
          <span className="text-dark">Banned: {loading.value.data.isBanned.toString()}</span>
          <button className="ms-3 rounded-3" onClick={changeBanned}>Change</button>
        </div>
      </div>
    );
  }    
}