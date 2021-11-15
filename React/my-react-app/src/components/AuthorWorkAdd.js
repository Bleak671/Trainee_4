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
import sha256 from 'crypto-js/sha256';

export function AuthorWorkAdd(props) {
  //const  
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.Photo);
  const token = sessionStorage.getItem("accessToken").split("").map(shiftChar(-17)).join('');
  const guid = sessionStorage.getItem("guid");

  var hash,link;

  function caller() {
    link = document.getElementById("link").value;
    fetch(link)
    .then(res => res.blob())
    .then((blob => { 
      var reader = new FileReader();

      reader.onload = function(event) {
        var binary = event.target.result;
        var md5 = sha256(binary).toString()
        hash = md5;
        addPhoto();
      };

      reader.readAsBinaryString(blob);
        }));
  }

  //sending reuest of adding
  function addPhoto() {
    var img = new Image();
    img.src = link;
    img.onload = () => {
      console.log(img);
    }
        var photo = {
          Link : document.getElementById("link").value,
          Name : document.getElementById("name").value,
          UserId : guid,
          Hash : hash
        }
        const requestOptions = {
          method: 'POST',
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
          (response) => { 
            if (response.status == 400)
              NotificationManager.error('Such photo already exists', '',2000);
            else
              history.push({
                pathname: '/authorWorks',
              });  
          },
          (error) => { NotificationManager.error('Unknown error: ' + error, '',2000) }
        )
  }

  //render, depending on state of loading
  return(
    <div className="d-flex flex-column" margin-bottom="1000">
      <Link className="w-25 mb-3 p-2 nav-link text-dark" to="/authorWorks" className="w-25 mb-3 p-2 nav-link text-dark">Back</Link>
      <input id="link" type="text" className="pb-3 rounded-3" placeholder="Photo link"/>
      <input id="name" type="text" className="pb-3 rounded-3" placeholder="Photo name"/>
      <button className="w-25 ms-5 mt-5 bg-info rounded-3" onClick={caller}>Add</button>
    </div>
  );
}