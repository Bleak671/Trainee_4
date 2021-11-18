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
import { setState } from '../../redux/Author/AddPhotoInfoReducer';
import { shiftChar } from '../../Utils/singleFunctions/shiftChar';
import { NotificationManager } from 'react-notifications';
import sha256 from 'crypto-js/sha256';
import { handleChangeLink, handleChangeName, handleSubmit } from '../../Utils/handlers/handleAddPhoto';

export function AuthorWorkAdd(props) {
  //const  
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state.AddPhotoInfo);
  const token = useSelector((state) => state.GlobalVar).value.accessToken.split("").map(shiftChar(-17)).join('');
  const guid = useSelector((state) => state.GlobalVar).value.guid;
  const isBanned = useSelector((state) => state.GlobalVar).value.isBanned;

  //render, depending on state of loading
  if (isBanned != "True")
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
  else {
    return (
      <div>
        <h1>YOU ARE BANNED!</h1>
      </div>
    );
  }
}