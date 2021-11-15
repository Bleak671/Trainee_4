import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../redux/PhotoReducer';
import { NotificationManager } from 'react-notifications';
import { shiftChar, loadData } from '../Utils/businessLogic';

export function Photo(props) {  
  //const
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.Photo);
  const token = "";
  const id = props.match.params.PhotoId.toString();

  //load once
  useEffect(() => { loadData(token, `https://localhost:44340/api/Home/${id}`, dispatch, setState)  }, []);
   
  //render, depending on state of loading
  if (loading.value.error) {
    return <div>Ошибка: {loading.value.error.message}</div>;
  } else if (!loading.value.isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return(
      <div className="d-flex flex-column" margin-bottom="1000">
        <Link to="/" className="w-25 mb-3 p-2 nav-link text-dark">Back</Link>
        <img className="pb-3 rounded-3" width="100%" src={loading.value.data.Link}/>
        <span className="pb-3 text-dark">Name: {loading.value.data.Name}</span>
        <span className="pb-3 text-dark">Upload date: {loading.value.data.UploadDate}</span>
        <span className="pb-3 text-dark">Views: {loading.value.data.Views}</span>
        <span className="pb-3 text-dark">Photo ID: {loading.value.data.PhotoId}</span>
        <span className="pb-3 text-dark">Owner ID: {loading.value.data.UserId}</span>
      </div>
    );
  }    
}