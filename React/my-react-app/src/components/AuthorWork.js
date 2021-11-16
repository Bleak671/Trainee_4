import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../redux/PhotoReducer';
import { shiftChar } from '../Utils/shiftChar';
import { loadData } from '../Utils/loadData';
import { NotificationManager } from 'react-notifications';
import { changePublished, changeTrash } from '../Utils/editPhotoFuntions';
import { toEdit } from '../Utils/toEdit';

export function AuthorWork(props) { 
  //const 
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.Photo);
  const token = sessionStorage.getItem("accessToken").split("").map(shiftChar(-17)).join('');
  const id = props.match.params.PhotoId.toString();
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  //load once
  useEffect(() => { loadData(token, `https://localhost:44340/api/Home/${id}`, dispatch, setState) }, []);
     
  //render, depending on state of loading
  if (loading.value.error) {
    return <div>Ошибка: {loading.value.error.message}</div>;
  } else if (!loading.value.isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    var date = new Date(loading.value.data.UploadDate);
    return(
      <div className="d-flex flex-column" margin-bottom="1000">
        <Link className="w-25 mb-3 p-2 nav-link text-dark" to="/authorWorks" className="w-25 mb-3 p-2 nav-link text-dark">Back</Link>
        <img className="pb-3 rounded-3" width="100%" src={loading.value.data.Link} onClick={toEdit.bind(null, loading, history)}/>
        <span className="pb-3 text-dark">Name: {loading.value.data.Name}</span>
        <span className="pb-3 text-dark">Upload date: {date.toLocaleString("en-US", options)}</span>
        <span className="pb-3 text-dark">Views: {loading.value.data.Views}</span>
        <div className="pb-3">
          <span className="pb-3 text-dark">Published: {loading.value.data.isPublished ? "Yes" : "No"}</span>
          <button className="ms-3 rounded-3" onClick={changePublished.bind(null, token, loading, `https://localhost:44340/api/Trash`, `https://localhost:44340/api/Home/${id}`, dispatch, setState)}>Change</button>
        </div>
        <div>
          <span className="pb-3 text-dark">Trash: {loading.value.data.isTrash ? "Yes" : "No"}</span>
          <button className="ms-3 rounded-3" onClick={changeTrash.bind(null, token, loading, `https://localhost:44340/api/Trash`, `https://localhost:44340/api/Home/${id}`, dispatch, setState)}>Change</button>
        </div>
      </div>
    );
  }    
}