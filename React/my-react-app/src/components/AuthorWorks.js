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
import { setState } from '../redux/AuthorWorksReducer';
import { setState as setStateFind } from '../redux/FindReducer';
import { shiftChar } from '../Utils/shiftChar';
import { sortByDate, sortByName } from '../Utils/sort';
import { loadData } from '../Utils/loadData';
import { NotificationManager } from 'react-notifications';
import { handleChange, handleSubmit } from '../Utils/find';

export function AuthorWorks() {  
  //const
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.AuthorWorks);
  const found = useSelector((state) => state.Find);
  const token = sessionStorage.getItem("accessToken").split("").map(shiftChar(-17)).join('');
  const guid = sessionStorage.getItem("guid");
  const history = useHistory();

  //load once
  useEffect(() => {  loadData(token, `https://localhost:44340/api/AuthorWorks/${guid}`, dispatch, setState) }, []);
     
  //render, depending on state of loading
  if (loading.value.error) {
    return <div>Ошибка: {loading.value.error.message}</div>;
  } else if (!loading.value.isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div>
        <Link className="w-25 mb-3 p-2 nav-link text-dark" to="/" >Back</Link>
        <Link className="w-25 mb-3 p-2 nav-link text-dark" to="/authorWorks/Add">Add Work</Link>
        <div className="pb-3">
          <button className="rounded-3" onClick={sortByName.bind(null, loading, dispatch, setState)}>По названию</button>
          <button className="rounded-3" onClick={sortByDate.bind(null, loading, dispatch, setState)}>По дате</button>
          <div className="mt-3">
            <form onSubmit={handleSubmit.bind(null, found, loading, "/authorWorks/", history)}>
              <input id="in" type="text" onChange={handleChange.bind(null, dispatch, setStateFind)}/>
              <input className="rounded-3" type="submit" value="Find"/>
            </form>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-between">
          {loading.value.data.map(item => (
            <div className="d-flex flex-column bg-info rounded-3 mb-3">
              <span className="ms-1">{item.Name !== null ? item.Name : "NoName"}</span>
              <Link id={item.PhotoId} key={item.PhotoId} to={"/authorWorks/" + item.PhotoId}>  
                <img className="rounded-3" height="150" src={item.Link}/>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }  
}