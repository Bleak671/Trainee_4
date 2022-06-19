import React, { useEffect } from 'react';
import {
  Link,
  useHistory
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../../redux/User/UserReducer';
import { shiftChar } from '../../Utils/singleFunctions/shiftChar';
import { loadData, loadDataWithData } from '../../Utils/singleFunctions/loadData';
import { host, timeOptions } from '../../Utils/constants/globals';
import { handleChangeMessage } from '../../Utils/handlers/handleAddPhoto';

export function User(props) { 
  //constants 
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.User);
  const globals = useSelector((state) => state.GlobalVar).value;
  const id = props.match.params.UserId.toString();
  if (globals.accessToken != null)
    var token = globals.accessToken.split("").map(shiftChar(-17)).join('');
  else
    history.push({
      pathname: '/',
    }); 

  //load once after render
  useEffect(() => { loadData(token, host +  `User?id1=` + id + `&&id2=` + globals.guid, dispatch, setState)}, []);
     
  //render, depending on state of loading
  if (!loading.value.isLoaded && loading.value.data !== undefined) {
    return <div>Loading...</div>;
  } else {
    return(
      <div className="p-3 d-flex flex-column bg-white bg-opacity-25 rounded-3" margin-bottom="1000"> 
        <Link to="/" className="w-25 mb-3 p-2 nav-link text-dark">Back</Link>
        <p className="text-dark">Login: {loading.value.data.user.login}</p>
        <p className="text-dark">Admin: {loading.value.data.user.isAdmin ? "Yes" : "No"}</p>
        <p className="text-dark">Banned: {loading.value.data.user.isBanned ? "Yes" : "No"}</p>
        <div className="p-5 w-100 d-flex flex-column justify-content-between">
          {loading.value.data !== undefined ? loading.value.data.messages.map(item => (
            <div className={"ms-1 p-2 rounded-3 bg-info flex-columnrounded-3 mb-3 row" + (item.fromUserId == globals.guid ? " justify-content-md-end" : "")}>
              {item.text}
            </div>
          )) : ""}
        </div>
        <div class="m-5">
          <input id="message" type="text" className="rounded-3 w-50 h-100 ms-5" placeholder="Message..." onChange={handleChangeMessage.bind(null, loading, dispatch, setState)}/>
          <button className="w-auto h-50 mt-5 ms-3 bg-info rounded-3" onClick={token != null ? dispatch.bind(null,{type: 'MESSAGE_ADD_REQUESTED', payload: {token, id : id, guid : globals.guid, history, state : loading}}) : dispatch.bind(null,{type: 'NOTIFY_REQUESTED', payload: "You must sign in to do that"})}>Send</button> 
        </div>
      </div>
    );
  }    
}