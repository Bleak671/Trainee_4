import React, { useEffect } from 'react';
import {
  Link,
  useHistory
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../../../redux/Admin/UserListReducer';
import { shiftChar } from '../../../Utils/singleFunctions/shiftChar';
import { loadData } from '../../../Utils/singleFunctions/loadData';
import { host } from '../../../Utils/constants/globals'; 

export function AdminUserList() {  
  //const
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.AdminUserList);
  const globals = useSelector((state) => state.GlobalVar).value;
  if (globals.accessToken != null)
    var token = globals.accessToken.split("").map(shiftChar(-17)).join('');
  else
    history.push({
      pathname: '/',
    });  
  var filteredArray;

  //load once
  useEffect(() => { loadData(token, host +  `Admin`, dispatch, setState) }, []);
     
  //render, depending on state of loading
  if (!loading.value.isLoaded) {
    return <div>Loading...</div>;
  } else {
    filteredArray = loading.value.data.filter(function(item) { return item.userId != globals.guid } );
    return (
      <div class="bg-white bg-opacity-50 rounded-3 p-3">
        <Link className="w-25 mb-3 p-2 nav-link text-dark" to="/admin/photo" >to Photos</Link>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Name</th>
              <th scope="col">Banned</th>
              <th scope="col">Admin</th>
              <th scope="col">Name</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
          {filteredArray.map(item => (
            <tr scope="row">
              <td>{item.email}</td>
              <td>{item.login}</td>
              <td>{item.isBanned ? "Yes" : "No"}</td>
              <td>{item.isAdmin ? "Yes" : "No"}</td>
              <td><Link to={"user/" + item.userId}>to User</Link></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }  
}