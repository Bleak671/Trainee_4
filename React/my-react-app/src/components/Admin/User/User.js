import React, { useEffect } from 'react';
import {
  Link,
  useHistory
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../../../redux/Admin/UserReducer';
import { shiftChar } from '../../../Utils/singleFunctions/shiftChar';
import { loadData } from '../../../Utils/singleFunctions/loadData';
import { changeAdmin, changeBanned } from '../../../Utils/multiplyFunctions/editUserFunctions';
import { host } from '../../../Utils/constants/globals';

//Component for selected photo from Admin photo
export function AdminUser(props) {  
  //constants
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.AdminUser);
  const globals = useSelector((state) => state.GlobalVar).value;
  const id = props.match.params.UserId.toString();
  if (globals.accessToken != null)
    var token = globals.accessToken.split("").map(shiftChar(-17)).join('');
  else
    history.push({
      pathname: '/',
    });  

  //load data once after rendering
  useEffect(() => { loadData(token, host +  `Admin/GetUser/${id}`, dispatch, setState) }, []);
     
  //render, depending on state of loading
  if (!loading.value.isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return(
      <div className="d-flex flex-column" margin-bottom="1000">
        <Link to="/admin/user" className="w-25 mb-3 p-2 nav-link text-dark">Back</Link>
        <span className="pb-3 text-dark">Login: {loading.value.data.login}</span>
        <span className="pb-3 text-dark">Email: {loading.value.data.email}</span>
        <div className="pb-3">
          <span className="text-dark">Admin: {loading.value.data.isAdmin ? "Yes" : "No"}</span>
          <button className="ms-3 rounded-3" onClick={changeAdmin.bind(null, token, loading, id, dispatch, setState)}>Change</button>
        </div>
        <div className="pb-3">
          <span className="text-dark">Banned: {loading.value.data.isBanned ? "Yes" : "No"}</span>
          <button className="ms-3 rounded-3" onClick={changeBanned.bind(null, token, loading, id, dispatch, setState)}>Change</button>
        </div>
      </div>
    );
  }    
}