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

export function TrashPhoto(props) { 
  //constants 
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.Photo);
  const token = sessionStorage.getItem("accessToken").split("").map(shiftChar(-17)).join('');
  const id = props.match.params.PhotoId.toString();

  //load once after render
  useEffect(() => { loadData(token, `https://localhost:44340/api/Home/${id}`, dispatch, setState) }, []);

  //change state isTrash of loaded photo and send edit request
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
      () => { 
        loadData(token, `https://localhost:44340/api/Home/${id}`, dispatch, setState); 
        history.push({
          pathname: '/authorWorks',
        });  }
    )
  }

  //send delete request
  function deletePhoto() {
    const requestOptions = {
      method: 'DELETE',
      mode: 'cors',
      headers: {  
          'Content-Type': 'application/json',    
          'Access-Control-Allow-Origin':'*',
          "Authorization": "Bearer " + token  // using token
      }    
    };
    fetch( `https://localhost:44340/api/Trash/Delete/${id}`, requestOptions)
    .then(
      () => { history.push({
        pathname: '/trash',
      }); }
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
        <Link to="/trash" className="w-25 mb-3 p-2 nav-link text-dark">Back</Link>
        <img className="pb-3 rounded-3" width="100%" src={loading.value.data.Link}/>
        <span className="pb-3 text-dark">Name: {loading.value.data.Name}</span>
        <span className="pb-3 text-dark">Upload date: {loading.value.data.UploadDate}</span>
        <span className="pb-3 text-dark">Views: {loading.value.data.Views}</span>
        <span className="pb-3 text-dark">Photo ID: {loading.value.data.PhotoId}</span>
        <span className="pb-3 text-dark">Owner ID: {loading.value.data.UserId}</span>
        <span className="pb-3 text-dark">Published: {loading.value.data.isPublished.toString()}</span>
        <div>
          <span className="pb-3 text-dark">Trash: {loading.value.data.isTrash.toString()}</span>
          <button className="ms-3 rounded-3" onClick={changeTrash}>Change</button>
        </div>
        <button className="w-25 ms-5 mt-5 bg-danger rounded-3" onClick={deletePhoto}>Delete</button>
      </div>
    );
  }    
}