import React, { useEffect } from 'react';
import {
  Link,
  useHistory
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../../redux/Author/AuthorPhotoReducer';
import { setState as setStateGlobal } from '../../redux/Global/GlobalVarReducer';
import { shiftChar } from '../../Utils/singleFunctions/shiftChar';
import { loadData } from '../../Utils/singleFunctions/loadData';
import { changePublished, changeTrash } from '../../Utils/multiplyFunctions/editPhotoFuntions';
import { toEdit } from '../../Utils/singleFunctions/toEdit';
import { host, timeOptions } from '../../Utils/constants/globals';

export function AuthorWork(props) { 
  //const 
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.AuthorPhoto);
  const globals = useSelector((state) => state.GlobalVar).value;
  if (globals.accessToken != null)
    var token = globals.accessToken.split("").map(shiftChar(-17)).join('');
  else
    history.push({
      pathname: '/',
    });  
  const id = props.match.params.PhotoId.toString();

  //load once
  useEffect(() => { loadData(token, `https://localhost:44340/api/Home/${id}`, dispatch, setState) }, []);
     
  //render, depending on state of loading
  if (!loading.value.isLoaded && loading.value.data !== undefined) {
    return <div>Loading...</div>;
  } else {
    var date = new Date(loading.value.data.photo !== undefined ? loading.value.data.photo.uploadDate : new Date());
    return(
      <div className="d-flex flex-column bg-white bg-opacity-25 rounded-3 p-3" margin-bottom="1000">
        <Link className="w-25 mb-3 p-2 nav-link text-dark" to="/authorWorks">Back</Link>
        <div class="align-self-center">
          <img className="pb-3 mw-100 rounded-3" src={loading.value.data.photo.link} onClick={toEdit.bind(null, loading, history, globals, dispatch, setStateGlobal)}/>
        </div>
        <span className="pb-3 text-dark">Name: {loading.value.data.photo.name}</span>
        <span className="pb-3 text-dark">Upload date: {date.toLocaleString("en-US", timeOptions)}</span>
        <span className="pb-3 text-dark">Views: {loading.value.data.photo.views}</span>
        <span className="pb-3 text-dark">Likes: {loading.value.data.positive}</span>
        <span className="pb-3 text-dark">Dislikes: {loading.value.data.negative}</span>
        <div className="pb-3">
          <span className="pb-3 text-dark">Published: {loading.value.data.photo.isPublished ? "Yes" : "No"}</span>
          <button className="ms-3 rounded-3" onClick={changePublished.bind(null, token, loading, host +  `Trash`, host +  `Home/${id}`, dispatch, setState)}>Change</button>
        </div>
        <div className="pb-3">
          <span className="pb-3 text-dark">Trash: {loading.value.data.photo.isTrash ? "Yes" : "No"}</span>
          <button className="ms-3 rounded-3" onClick={changeTrash.bind(null, token, loading, host +  `Trash`, host +  `Home/${id}`, dispatch, setState)}>Change</button>
        </div>
        <h2 className="pb-3 ms-5 text-dark">Comments:</h2>
        {loading.value.data.map !== undefined ? loading.value.data.comments.map(item => (
          <div className="rounded-3 m-5 mt-1 mb-1 img-thumbnail">
            <span className="ms-1">{item.text !== null ? item.text : "Error"}</span>
          </div>
        )) : ""}
      </div>
    );
  }    
}