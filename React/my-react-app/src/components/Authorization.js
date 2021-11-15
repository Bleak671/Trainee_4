import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams
} from "react-router-dom";
import { shiftChar } from '../Utils/businessLogic';
import { NotificationManager } from 'react-notifications';

export function Authorization() {  
  //hash function for password
  function getHash(str) {
      var hash = 0, i, chr;
      for (i = 0; i < str.length; i++) {
        chr   = str[i];
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return String(hash);
    
  }

  //just auth
  function login() {
    // gathering data
    var email = document.getElementById("email").value;
    var hashedPassword = getHash(document.getElementById("password").value);

    // отправляет запрос и получаем ответ
    fetch(`https://localhost:44340/api/Authorization/${email}`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',    
        'Access-Control-Allow-Origin':'*'},
        body: hashedPassword
    })
    .then(res => res.json())
    .then(
      (response) => {
          if (response.access_token != null) {
            let base64ToString = Buffer.from(response.access_token.split('.')[1], "base64").toString();
            base64ToString = JSON.parse(base64ToString);
            sessionStorage.setItem("accessToken", response.access_token.split("").map(shiftChar(17)).join(''));
            sessionStorage.setItem("guid", base64ToString["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
            sessionStorage.setItem("isAdmin", base64ToString["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
            window.location.reload();
          }
          else {
            NotificationManager.error('Incorrect email/password', 'Log In',2000);
          }     
      }
      ,(error) => {
        NotificationManager.error('Fetch error', '',2000);
        console.log("Error: ", error.message);
      } 
    );
  }

  //creating user and auth
  function register() {
    var email = document.getElementById("email").value;
    var hashedPassword = getHash(document.getElementById("password").value);
    var json = { "Email": email, "HashedPassword":hashedPassword }
    const response = fetch(`https://localhost:44340/api/Authorization/`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',    
        'Access-Control-Allow-Origin':'*'},
        body: JSON.stringify(json)
    })
    .then(res => res.json())
    .then(
      (response) => {
        if (response.access_token != null) {
          sessionStorage.setItem("accessToken", response.access_token);
          let base64ToString = Buffer.from(response.access_token.split('.')[1], "base64").toString();
          base64ToString = JSON.parse(base64ToString);
          sessionStorage.setItem("guid", base64ToString.Guid);
          sessionStorage.setItem("isAdmin", base64ToString.isAdmin);
          window.location.reload();
        }
        else {
          NotificationManager.error('Registration error, try another email', 'Registration', 2000);
        }
      }
      ,(error) => {
        NotificationManager.error('Fetch error', '',2000);
          console.log("Error: ", error.message);
      } 
    ); 
  }

  //render or redirect, depending on authorizing 
  var token = sessionStorage.getItem("accessToken") == null
  if (token)
    return(
      <div className="mt-5 pt-5 pb-5 w-100 border rounded-3 bg-info bg-gradient d-flex align-items-center flex-column">
        <input id="email" className="w-25 mt-2" type="text" placeholder="Email"></input>
        <input id="password" className="w-25 mt-2" type="text" placeholder="Password"></input>
        <div className="w-25">
          <input className="w-50 mt-2" type="button" value="Login" onClick={login}></input>
          <input className="w-50 mt-2" type="button" value="Registrate" onClick={register}></input>
        </div>
      </div>
    )
  else {
    return <Redirect to="/" />
  }
}    