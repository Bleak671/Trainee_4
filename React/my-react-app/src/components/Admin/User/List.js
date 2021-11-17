import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../../../redux/Admin/UserListReducer';
import { shiftChar } from '../../../Utils/singleFunctions/shiftChar';
import { loadData } from '../../../Utils/singleFunctions/loadData';
import { host } from '../../../Utils/constants/globals'; 

export function AdminUserList() {  
  //const
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.AdminUserList);
  const token = useSelector((state) => state.GlobalVar).value.accessToken.split("").map(shiftChar(-17)).join('');
  const globals = useSelector((state) => state.GlobalVar);
  var filteredArray;

  //load once
  useEffect(() => { loadData(token, host +  `Admin`, dispatch, setState) }, []);
     
  //render, depending on state of loading
  if (loading.value.error) {
    return <div>Ошибка: {loading.value.error.message}</div>;
  } else if (!loading.value.isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    filteredArray = loading.value.data.filter(function(item) { return item.UserId != globals.value.guid } );
    return (
      <div>
        <Link className="w-25 mb-3 p-2 nav-link text-dark" to="/admin/photo" >to Photos</Link>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Name</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
          {filteredArray.map(item => (
            <tr scope="row">
              <td>{item.Email}</td>
              <td>{item.Login}</td>
              <td><Link to={"user/" + item.UserId}>to User</Link></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }  
}