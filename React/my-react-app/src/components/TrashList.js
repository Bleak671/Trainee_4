import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../redux/TrashListReducer';
import { shiftChar, loadData } from '../Utils/businessLogic';
import { sortByDate, sortByName } from '../Utils/businessLogic';


export function TrashList() {  
  //constants
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.TrashList);
  const token = sessionStorage.getItem("accessToken").split("").map(shiftChar(-17)).join('');
  const guid = sessionStorage.getItem("guid");

  //load once after rendering
  useEffect(() => { loadData(token, `https://localhost:44340/api/Trash/${guid}`, dispatch, setState) }, []);  
     
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
        </div>
        <div className="d-flex flex-wrap justify-content-between">
          {loading.value.data.map(item => (
            <div className="d-flex flex-column bg-info rounded-3 mb-3">
              <span className="ms-1">{item.Name !== null ? item.Name : "NoName"}</span>
              <Link id={item.PhotoId} key={item.PhotoId} to={"/trash/" + item.PhotoId}>  
                <img className="rounded-3" height="150" src={item.Link}/>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }  
}