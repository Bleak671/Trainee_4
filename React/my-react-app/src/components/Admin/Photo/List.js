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
import { setState } from '../../../redux/Admin/PhotoListReducer';
import { setState as setStateFind } from '../../../redux/NoPageBind/FindReducer';
import { shiftChar } from '../../../Utils/singleFunctions/shiftChar';
import { sortByDate, sortByName } from '../../../Utils/multiplyFunctions/sortFunctions';
import { loadData } from '../../../Utils/singleFunctions/loadData';
import { NotificationManager } from 'react-notifications';
import { handleChange, handleSubmit } from '../../../Utils/handlers/handleFind';
import { host } from '../../../Utils/constants/globals';

//Component for list of photos in Admin page
export function AdminPhotoList() {  
  //constants
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.AdminPhotoList);
  const found = useSelector((state) => state.Find);
  const token = useSelector((state) => state.GlobalVar).value.accessToken.split("").map(shiftChar(-17)).join('');
  const history = useHistory();

  //load once
  useEffect(() => { loadData(token, host + `AuthorWorks`, dispatch, setState) }, []);

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
            <form onSubmit={handleSubmit.bind(null, found, loading, "/admin/photo/", history)}>
              <input id="in" type="text" onChange={handleChange.bind(null, dispatch, setStateFind)}/>
              <input className="rounded-3" type="submit" value="Find"/>
            </form>
          </div>
        </div>
        <Link className="w-25 mb-3 p-2 nav-link text-dark" to="/admin/user" >to Users</Link>
        <div className="d-flex flex-wrap justify-content-between">
          {loading.value.data.map(item => (
            <div className="d-flex flex-column bg-info rounded-3 mb-3">
              <span className="ms-1">{item.name !== null ? item.name : "NoName"}</span>
              <Link id={item.photoId} key={item.photoId} to={"/admin/photo/" + item.photoId}>  
                <img className="rounded-3" height="150" src={item.link}/>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }  
}