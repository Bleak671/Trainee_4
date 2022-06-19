import React, { useEffect } from 'react';
import {
  Link,
  useHistory
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../../redux/Photo/ListReducer';
import { setState as setStateFind } from '../../redux/NoPageBind/FindReducer';
import { sortByDate, sortByName } from '../../Utils/multiplyFunctions/sortFunctions';
import { loadData } from '../../Utils/singleFunctions/loadData';
import { handleChange } from '../../Utils/handlers/handleFind';
import { host } from '../../Utils/constants/globals';

export function PhotoList() {  
  //const
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.PhotoList);
  const found = useSelector((state) => state.Find);
  const history = useHistory();
  const token = "";

  //load once
  useEffect(() => { loadData(token, host +  "Home", dispatch, setState)  }, []);
     
  //render, depending on state of loading
  if (!loading.value.isLoaded && loading.value.data !== undefined) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className="pb-3">
          <button className="rounded-3" onClick={sortByName.bind(null, loading, dispatch, setState)}>По названию</button>
          <button className="rounded-3" onClick={sortByDate.bind(null, loading, dispatch, setState)}>По дате</button>
          <div className="mt-3">
            <input id="in" type="text" onChange={handleChange.bind(null, dispatch, setStateFind)}/>
            <button className="rounded-3" onClick={dispatch.bind(null,{type: 'FIND_REQUESTED', payload: {found, loading, redirString:"/home/", history}})}>Find</button>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-between">
          {loading.value.data.map !== undefined ? loading.value.data.map(item => (
            <div className="d-flex flex-column bg-info rounded-3 mb-3">
              <span className="ms-1">{item.name !== null ? item.name : "NoName"}</span>
              <Link id={item.photoId} key={item.photoId} to={"/home/" + item.photoId}>  
                <img className="rounded-3" height="150" src={item.link}/>
              </Link>
            </div>
          )) : ""}
        </div>
      </div>
    );
  }  
}