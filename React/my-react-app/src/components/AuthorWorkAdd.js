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
import { shiftChar } from '../Utils/businessLogic';
import { NotificationManager } from 'react-notifications';

export function AuthorWorkAdd(props) {
  //const  
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.Photo);
  const token = sessionStorage.getItem("accessToken").split("").map(shiftChar(-17)).join('');
  const guid = sessionStorage.getItem("guid");

  //sending reuest of adding
  function addPhoto() {
    var photo = {
        Link : document.getElementById("link").value,
        Name : document.getElementById("name").value,
        UserId : guid
    }
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
        history.push({
          pathname: '/authorWorks',
        });  
      },
      (error) => { NotificationManager.error('Incorrect email/Error while adding: ' + error, '',2000) }
    )
  }

  //render, depending on state of loading
  return(
    <div className="d-flex flex-column" margin-bottom="1000">
      <Link className="w-25 mb-3 p-2 nav-link text-dark" to="/authorWorks" className="w-25 mb-3 p-2 nav-link text-dark">Back</Link>
      <input id="link" type="text" className="pb-3 rounded-3" placeholder="Photo link"/>
      <input id="name" type="text" className="pb-3 rounded-3" placeholder="Photo name"/>
      <button className="w-25 ms-5 mt-5 bg-info rounded-3" onClick={addPhoto}>Add</button>
    </div>
  );
}