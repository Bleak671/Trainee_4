import React, { useEffect } from 'react';
import {
  Link,
  useHistory
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../../redux/Trash/ListReducer';
import { shiftChar } from '../../Utils/singleFunctions/shiftChar';
import { sortByDate, sortByName } from '../../Utils/multiplyFunctions/sortFunctions';
import { loadData } from '../../Utils/singleFunctions/loadData';
import { host } from '../../Utils/constants/globals';

export function TrashList() {  
  //constants
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.TrashList);
  const globals = useSelector((state) => state.GlobalVar).value
  const guid = globals.guid;
  if (globals.accessToken != null)
    var token = globals.accessToken.split("").map(shiftChar(-17)).join('');
  else
    history.push({
      pathname: '/',
    }); 

  //load once after rendering
  useEffect(() => { loadData(token, host +  `Trash/${guid}`, dispatch, setState) }, []);  
     
  //render, depending on state of loading
  if (!loading.value.isLoaded && loading.value.data !== undefined) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className="pb-3">
          <button className="rounded-3" onClick={sortByName.bind(null, loading, dispatch, setState)}>По названию</button>
          <button className="rounded-3" onClick={sortByDate.bind(null, loading, dispatch, setState)}>По дате</button>
        </div>
        <div className="d-flex flex-wrap justify-content-between">
          {loading.value.data.map !== undefined ? loading.value.data.map(item => (
            <div className="d-flex flex-column bg-info rounded-3 mb-3 bg-opacity-75">
              <span className="ms-1">{item.name !== null ? item.name : "NoName"}</span>
              <Link id={item.photoId} key={item.photoId} to={"/trash/" + item.photoId}>  
                <img className="rounded-3" height="150" src={item.link}/>
              </Link>
            </div>
          )) : ""}
        </div>
      </div>
    );
  }  
}