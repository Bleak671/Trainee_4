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
import { shiftChar } from '../Utils/shiftChar';
import { loadData } from '../Utils/loadData';
import { changeAdmin, changeBanned } from '../Utils/editUserFunctions';

//Component for selected photo from Admin photo
export function AdminUser(props) {  
  //constants
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.AdminUser);
  const token = sessionStorage.getItem("accessToken").split("").map(shiftChar(-17)).join('');
  const id = props.match.params.UserId.toString();

  //load data once after rendering
  useEffect(() => { loadData(token, `https://localhost:44340/api/Admin/GetUser/${id}`, dispatch, setState) }, []);
     
  //render, depending on state of loading
  if (loading.value.error) {
    return <div>Ошибка: {loading.value.error.message}</div>;
  } else if (!loading.value.isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return(
      <div className="d-flex flex-column" margin-bottom="1000">
        <Link to="/admin/user" className="w-25 mb-3 p-2 nav-link text-dark">Back</Link>
        <span className="pb-3 text-dark">Login: {loading.value.data.Login}</span>
        <span className="pb-3 text-dark">Email: {loading.value.data.Email}</span>
        <div className="pb-3">
          <span className="text-dark">Admin: {loading.value.data.isAdmin ? "Yes" : "No"}</span>
          <button className="ms-3 rounded-3" onClick={changeAdmin.bind(null, token, loading, id, dispatch, setState)}>Change</button>
        </div>
        <div className="pb-3">
          <span className="text-dark">Banned: {loading.value.data.isBanned ? "Yes" : "No"}</span>
          <button className="ms-3 rounded-3" onClick={changeBanned.bind(null, token, loading, id, dispatch, setState)}>Change</button>
        </div>
      </div>
    );
  }    
}