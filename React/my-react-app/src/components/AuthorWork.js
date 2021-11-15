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
import { shiftChar, loadData } from '../Utils/businessLogic';
import { NotificationManager } from 'react-notifications';

export function AuthorWork(props) { 
  //const 
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.Photo);
  const token = sessionStorage.getItem("accessToken").split("").map(shiftChar(-17)).join('');
  const id = props.match.params.PhotoId.toString();

  //load once
  useEffect(() => { loadData(token, `https://localhost:44340/api/Home/${id}`, dispatch, setState) }, []);

  //redirect to editing
  function toEdit() {
    sessionStorage.setItem("link", loading.value.data.Link)
    history.push({
      pathname: `/edit/${loading.value.data.PhotoId}`,
    });
  }

  //change isPublished of loaded photo and sending request
  function changePublished() {
    var photo = Object.assign({}, loading.value.data);
    photo.isPublished = !photo.isPublished;
    const requestOptions = {
      method: 'PUT',
      mode: 'cors',
      headers: {  
          'Content-Type': 'application/json',    
          'Access-Control-Allow-Origin':'*',
          "Authorization": "Bearer " + token  // using token
      },
      body: JSON.stringify(photo)     
    };
    fetch( `https://localhost:44340/api/Trash`, requestOptions)
    .then(
      () => { loadData(token, `https://localhost:44340/api/Home/${id}`, dispatch, setState) }
    )
  }

  //change isTrash of loaded photo and sending request
  function changeTrash() {
    var photo = Object.assign({}, loading.value.data);
    photo.isTrash = !photo.isTrash;
    const requestOptions = {
      method: 'PUT',
      mode: 'cors',
      headers: {  
          'Content-Type': 'application/json',    
          'Access-Control-Allow-Origin':'*',
          "Authorization": "Bearer " + token  // using token
      },
      body: JSON.stringify(photo)     
    };
    fetch( `https://localhost:44340/api/Trash`, requestOptions)
    .then(
      () => { loadData(token, `https://localhost:44340/api/Home/${id}`, dispatch, setState) }
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
        <Link className="w-25 mb-3 p-2 nav-link text-dark" to="/authorWorks" className="w-25 mb-3 p-2 nav-link text-dark">Back</Link>
        <img className="pb-3 rounded-3" width="100%" src={loading.value.data.Link} onClick={toEdit}/>
        <span className="pb-3 text-dark">Name: {loading.value.data.Name}</span>
        <span className="pb-3 text-dark">Upload date: {loading.value.data.UploadDate}</span>
        <span className="pb-3 text-dark">Views: {loading.value.data.Views}</span>
        <span className="pb-3 text-dark">Photo ID: {loading.value.data.PhotoId}</span>
        <span className="pb-3 text-dark">Owner ID: {loading.value.data.UserId}</span>
        <div className="pb-3">
          <span className="pb-3 text-dark">Published: {loading.value.data.isPublished.toString()}</span>
          <button className="ms-3 rounded-3" onClick={changePublished}>Change</button>
        </div>
        <div>
          <span className="pb-3 text-dark">Trash: {loading.value.data.isTrash.toString()}</span>
          <button className="ms-3 rounded-3" onClick={changeTrash}>Change</button>
        </div>
      </div>
    );
  }    
}