import React, { useEffect } from 'react';
import {
  Link,
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../../redux/NoPageBind/Reducer';
import { loadData, loadDataAppend } from '../../Utils/singleFunctions/loadData';
import { timeOptions } from '../../Utils/constants/globals';
import { host } from '../../Utils/constants/globals';
import { addReview } from '../../Utils/multiplyFunctions/editPhotoFuntions';
import { shiftChar } from '../../Utils/singleFunctions/shiftChar';
import { handleChangeComment } from '../../Utils/handlers/handleAddPhoto';
import { useHistory } from 'react-router-dom';


export function Photo(props) {  
  //const
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.Photo);
  const id = props.match.params.PhotoId.toString();
  const globals = useSelector((state) => state.GlobalVar).value;
  if (globals.accessToken != null)
  {
    var token = globals.accessToken.split("").map(shiftChar(-17)).join('');
  }

  var updateDataFunc = loadData.bind(null,"", host +  `Home/${id}`, dispatch, setState);

  //load once
  useEffect(() => { 
    updateDataFunc();
  }, []);
   
  var date;
  if (loading.value.data && loading.value.data.photo !== undefined)
    date = new Date(loading.value.data.photo.uploadDate);
  else
    date = new Date();

  //render, depending on state of loading
  if (!loading.value.isLoaded && loading.value.data !== undefined) {
    return <div>Loading...</div>;
  } else {   
    return(
      <div className="d-flex flex-column  bg-white bg-opacity-25 rounded-3 p-3" margin-bottom="1000">
        <Link to="/" className="w-25 mb-3 p-2 nav-link text-dark bg-warning text-center">Back</Link>
        
        <span className="mt-5">Author:</span>
        <Link to={loading.value.data.photo.userId == globals.guid ? "/authorAccount" : "/user/" + loading.value.data.photo.userId} className="w-25 mb-3 p-2 nav-link text-dark bg-success text-center">{loading.value.data.user.login}</Link>
        
        <div class="align-self-center">
          <img className="pb-3 mw-100 rounded-3" src={loading.value.data.photo.link}/>
        </div>

        <div className="d-flex flex-wrap">
          {loading.value.data.tags.map !== undefined ? loading.value.data.tags.map(item => (
            <div className="d-flex flex-column bg-white rounded-3 me-1 mb-3 mt-3 p-2">
              <span className="ms-1">{item.name}</span>
            </div>
          )) : ""}
        </div>

        <span className="pb-3 text-dark">Name: {loading.value.data.photo.name}</span>
        
        <span className="pb-3 text-dark">Upload date: {date.toLocaleString("en-US", timeOptions)}</span>
        
        <span className="pb-3 text-dark">Views: {loading.value.data.photo.views}</span>
        
        <div className="pb-3">
          <span className="pb-3 text-dark">Likes: {loading.value.data.positive}</span>
          <button className="ms-3 rounded-3 bg-success" onClick={token != null ? addReview.bind(null, token, loading, host +  `Home/CreateReview`, host +  `Home/${id}`, dispatch, setState, true, globals.guid, updateDataFunc) : dispatch.bind(null,{type: 'NOTIFY_REQUESTED', payload: "You must sign in to do that"})}>+</button>
        </div> 
        
        <div className="pb-3">
          <span className="pb-3 text-dark">Dislikes: {loading.value.data.negative}</span>
          <button className="ms-3 rounded-3 bg-error" onClick={token != null ? addReview.bind(null, token, loading, host +  `Home/CreateReview`, host +  `Home/${id}`, dispatch, setState, false, globals.guid, updateDataFunc) : dispatch.bind(null,{type: 'NOTIFY_REQUESTED', payload: "You must sign in to do that"})}>-</button>
        </div>
        
        <h2 className="pb-3 ms-5 text-dark">Comments:</h2>
        {loading.value.data.comments.map !== undefined ? loading.value.data.comments.map(item => (
          <div className="rounded-3 m-5 mt-1 mb-1 img-thumbnail d-flex">
            <span className='bg-info p-1'>{item.userName == '' || item.userName == null ? "Guest" : item.userName}</span>
            <span className="ms-3">{item.text !== null ? item.text : "Error"}</span>
          </div>
        )) : ""}
        
        <div class="m-5">
          <input id="comment" type="text" className="rounded-3 w-50 h-100 ms-5" placeholder="Comment..." onChange={handleChangeComment.bind(null, loading, dispatch, setState)}/>
          <button className="w-auto h-50 mt-5 ms-3 bg-info rounded-3" onClick={token != null ? dispatch.bind(null,{type: 'COMMENT_ADD_REQUESTED', payload: {token, guid : globals.guid, history, state : loading, callback : updateDataFunc}}) : dispatch.bind(null,{type: 'NOTIFY_REQUESTED', payload: "You must sign in to do that"})}>Send</button> 
        </div>
      </div>
    );
  }    
}