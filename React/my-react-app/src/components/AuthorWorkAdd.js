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
import { setState } from '../redux/AddPhotoInfoReducer';
import { shiftChar } from '../Utils/shiftChar';
import { NotificationManager } from 'react-notifications';
import sha256 from 'crypto-js/sha256';
import { handleChangeLink, handleChangeName, handleSubmit } from '../Utils/addPhotoFunctions';

export function AuthorWorkAdd(props) {
  //const  
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state.AddPhotoInfo);
  const token = sessionStorage.getItem("accessToken").split("").map(shiftChar(-17)).join('');
  const guid = sessionStorage.getItem("guid");

  //render, depending on state of loading
  return(
    <div className="d-flex flex-column" margin-bottom="1000">
      <Link className="w-25 mb-3 p-2 nav-link text-dark" to="/authorWorks" className="w-25 mb-3 p-2 nav-link text-dark">Back</Link>
      <form onSubmit={handleSubmit.bind(null, token, guid, history, state)}>
        <input id="link" type="text" className="pb-3 rounded-3" placeholder="Photo link" onChange={handleChangeLink.bind(null, state, dispatch, setState)}/>
        <input id="name" type="text" className="pb-3 rounded-3" placeholder="Photo name" onChange={handleChangeName.bind(null, state, dispatch, setState)}/>
        <input className="w-25 ms-5 mt-5 bg-info rounded-3" type="submit" value="Send"/>
      </form>
    </div>
  );
}