import React, { useEffect } from 'react';
import {
  Link,
  useHistory
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../../redux/NoPageBind/Reducer';
import { setState as setStateGlobal } from '../../redux/Global/GlobalVarReducer';
import { shiftChar } from '../../Utils/singleFunctions/shiftChar';
import { loadData } from '../../Utils/singleFunctions/loadData';
import { changePublished, changeTrash } from '../../Utils/multiplyFunctions/editPhotoFuntions';
import { toEdit } from '../../Utils/singleFunctions/toEdit';
import { host } from '../../Utils/constants/globals';

export function AuthorWork(props) { 
  //const 
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.Photo);
  const globals = useSelector((state) => state.GlobalVar).value;
  if (globals.accessToken != null)
    var token = globals.accessToken.split("").map(shiftChar(-17)).join('');
  else
    history.push({
      pathname: '/',
    });  
  const id = props.match.params.PhotoId.toString();
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  //load once
  useEffect(() => { loadData(token, `https://localhost:44340/api/Home/${id}`, dispatch, setState) }, []);
     
  //render, depending on state of loading
  if (!loading.value.isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    var date = new Date(loading.value.data.uploadDate);
    return(
      <div className="d-flex flex-column" margin-bottom="1000">
        <Link className="w-25 mb-3 p-2 nav-link text-dark" to="/authorWorks" className="w-25 mb-3 p-2 nav-link text-dark">Back</Link>
        <div>
          <img className="pb-3 rounded-3" src={loading.value.data.link} onClick={toEdit.bind(null, loading, history, globals, dispatch, setStateGlobal)}/>
        </div>
        <span className="pb-3 text-dark">Name: {loading.value.data.name}</span>
        <span className="pb-3 text-dark">Upload date: {date.toLocaleString("en-US", options)}</span>
        <span className="pb-3 text-dark">Views: {loading.value.data.views}</span>
        <div className="pb-3">
          <span className="pb-3 text-dark">Published: {loading.value.data.isPublished ? "Yes" : "No"}</span>
          <button className="ms-3 rounded-3" onClick={changePublished.bind(null, token, loading, host +  `Trash`, host +  `Home/${id}`, dispatch, setState)}>Change</button>
        </div>
        <div>
          <span className="pb-3 text-dark">Trash: {loading.value.data.isTrash ? "Yes" : "No"}</span>
          <button className="ms-3 rounded-3" onClick={changeTrash.bind(null, token, loading, host +  `Trash`, host +  `Home/${id}`, dispatch, setState)}>Change</button>
        </div>
      </div>
    );
  }    
}