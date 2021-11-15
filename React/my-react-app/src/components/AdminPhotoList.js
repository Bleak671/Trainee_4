import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../redux/AdminPhotoListReducer';
import { shiftChar, sortByDate, sortByName, loadData } from '../Utils/businessLogic';
import { NotificationManager } from 'react-notifications';

//Component for list of photos in Admin page
export function AdminPhotoList() {  
  //constants
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.AdminPhotoList);
  const token = sessionStorage.getItem("accessToken").split("").map(shiftChar(-17)).join('');
  const history = useHistory();

  //load once
  useEffect(() => { loadData(token, `https://localhost:44340/api/AuthorWorks`, dispatch, setState) }, []);

  //finding by name from currently loaded list
  function find() {
    var value = document.getElementById("in").value;
    var found = loading.value.data.find((element) => { 
      if (element.Name == value)
        return true;
      else  
        return false;
    })
    if (found === undefined)
      NotificationManager.error('Not found', '',2000);
    else
      history.push({
        pathname: `/admin/photo/${found.PhotoId}`,
      });
  }

  //render, depending on state of loading
  if (loading.value.error) {
    return <div>Ошибка: {loading.value.error.message}</div>;
  } else if (!loading.value.isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div>
        <div className="pb-3">
          <button className="rounded-3" onClick={sortByName.bind(null, loading, dispatch, setState)}>По названию</button>
          <button className="rounded-3" onClick={sortByDate.bind(null, loading, dispatch, setState)}>По дате</button>
          <div className="mt-3">
            <input id="in" type="text"/>
            <button className="rounded-3" onClick={find}>Find by name</button>
          </div>
        </div>
        <Link className="w-25 mb-3 p-2 nav-link text-dark" to="/admin/user" >to Users</Link>
        <div className="d-flex flex-wrap justify-content-between">
          {loading.value.data.map(item => (
            <div className="d-flex flex-column bg-info rounded-3 mb-3">
              <span className="ms-1">{item.Name !== null ? item.Name : "NoName"}</span>
              <Link id={item.PhotoId} key={item.PhotoId} to={"/admin/photo/" + item.PhotoId}>  
                <img className="rounded-3" height="150" src={item.Link}/>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }  
}