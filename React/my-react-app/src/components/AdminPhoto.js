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

//Component for selected photo from Admin photo
export function AdminPhoto(props) { 
  //initializing constants
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.Photo);
  const token = sessionStorage.getItem("accessToken").split("").map(shiftChar(-17)).join('');
  const id = props.match.params.PhotoId.toString();

  //once loaded after rendering
  useEffect(() => { loadData(token, `https://localhost:44340/api/Home/${id}`, dispatch, setState) }, []);

  //change field isPublished of currently downloaded photo and upload it
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
    fetch( `https://localhost:44340/api/Admin/EditPhoto`, requestOptions)
    .then(
      () => { loadData(token, `https://localhost:44340/api/Home/${id}`, dispatch, setState) }
    )
  }

  //change field isTrash of currently downloaded photo and upload it
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
    fetch( `https://localhost:44340/api/Admin/EditPhoto`, requestOptions)
    .then(
      () => { loadData(token, `https://localhost:44340/api/Home/${id}`, dispatch, setState) }
    )
  }

  //sending request to delete photo
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
    fetch( `https://localhost:44340/api/Admin/DeletePhoto/${id}`, requestOptions)
    .then(
      () => { history.push({
        pathname: '/admin/photo',
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
        <Link className="w-25 mb-3 p-2 nav-link text-dark" to="/admin/photo" className="w-25 mb-3 p-2 nav-link text-dark">Back</Link>
        <img className="pb-3 rounded-3" width="100%" src={loading.value.data.Link}/>
        <span className="pb-3 text-dark">Name: {loading.value.data.Name}</span>
        <span className="pb-3 text-dark">Upload date: {loading.value.data.UploadDate}</span>
        <span className="pb-3 text-dark">Views: {loading.value.data.Views}</span>
        <span className="pb-3 text-dark">Photo ID: {loading.value.data.PhotoId}</span>
        <div className="pb-3">
          <span className="text-dark">Owner ID: {loading.value.data.UserId}</span>
          <Link className="ms-3" to={"/admin/user/" + loading.value.data.UserId}>to User</Link>
        </div>
        <div className="pb-3">
          <span className="pb-3 text-dark">Published: {loading.value.data.isPublished.toString()}</span>
          <button className="ms-3 rounded-3" onClick={changePublished}>Change</button>
        </div>
        <div>
          <span className="pb-3 text-dark">Trash: {loading.value.data.isTrash.toString()}</span>
          <button className="ms-3 rounded-3" onClick={changeTrash}>Change</button>
        </div>
        <button className="w-25 ms-5 mt-5 bg-danger rounded-3" onClick={deletePhoto}>Delete</button>
      </div>
    );
  }    
}