import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../redux/AdminUserListReducer';
import { shiftChar } from '../Utils/shiftChar';
import { loadData } from '../Utils/loadData';

export function AdminUserList() {  
  //const
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.AdminUserList);
  const token = sessionStorage.getItem("accessToken").split("").map(shiftChar(-17)).join('');

  //load once
  useEffect(() => { loadData(token, `https://localhost:44340/api/Admin`, dispatch, setState) }, []);
     
  //render, depending on state of loading
  if (loading.value.error) {
    return <div>Ошибка: {loading.value.error.message}</div>;
  } else if (!loading.value.isLoaded) {
    return <div>Загрузка...</div>;
  } else {
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
          {loading.value.data.map(item => (
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