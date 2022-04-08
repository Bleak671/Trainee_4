import React, { useEffect } from 'react';
import {
  Link,
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../../redux/NoPageBind/Reducer';
import { loadData } from '../../Utils/singleFunctions/loadData';
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

  //load once
  useEffect(() => { loadData("", host +  `Home/${id}`, dispatch, setState)  }, []);
   
  //render, depending on state of loading
  if (!loading.value.isLoaded) {
    return <div>Loading...</div>;
  } else {
    var date = new Date(loading.value.data.photo.uploadDate);
    return(
      <div className="d-flex flex-column  bg-white bg-opacity-25 rounded-3 p-3" margin-bottom="1000">
        <Link to="/" className="w-25 mb-3 p-2 nav-link text-dark">Back</Link>
        <div class="align-self-center">
          <img className="pb-3 mw-100 rounded-3" src={loading.value.data.photo.link}/>
        </div>
        <span className="pb-3 text-dark">Name: {loading.value.data.photo.name}</span>
        <span className="pb-3 text-dark">Upload date: {date.toLocaleString("en-US", timeOptions)}</span>
        <span className="pb-3 text-dark">Views: {loading.value.data.photo.views}</span>
        <div className="pb-3">
          <span className="pb-3 text-dark">Likes: {loading.value.data.positive}</span>
          <button className="ms-3 rounded-3 bg-success" onClick={token != null ? addReview.bind(null, token, loading, host +  `Home/CreateReview`, host +  `Home/${id}`, dispatch, setState, true, globals.guid) : dispatch.bind(null,{type: 'NOTIFY_REQUESTED', payload: "You must sign in to do that"})}>+</button>
        </div> 
        <div className="pb-3">
          <span className="pb-3 text-dark">Dislikes: {loading.value.data.negative}</span>
          <button className="ms-3 rounded-3 bg-error" onClick={token != null ? addReview.bind(null, token, loading, host +  `Home/CreateReview`, host +  `Home/${id}`, dispatch, setState, false, globals.guid) : dispatch.bind(null,{type: 'NOTIFY_REQUESTED', payload: "You must sign in to do that"})}>-</button>
        </div>
        <h2 className="pb-3 ms-5 text-dark">Comments:</h2>
        {loading.value.data.comments.map(item => (
          <div className="rounded-3 m-5 mt-1 mb-1 img-thumbnail d-flex">
            <span className='bg-info p-1'>{item.userName == '' || item.userName == null ? "Guest" : item.userName}</span>
            <span className="ms-3">{item.text !== null ? item.text : "Error"}</span>
          </div>
        ))}
        <div class="m-5">
          <input id="comment" type="text" className="rounded-3 w-50 h-100 ms-5" placeholder="Comment..." onChange={handleChangeComment.bind(null, loading, dispatch, setState)}/>
          <button className="w-auto h-50 mt-5 ms-3 bg-info rounded-3" onClick={token != null ? dispatch.bind(null,{type: 'COMMENT_ADD_REQUESTED', payload: {token, guid : globals.guid, history, state : loading}}) : dispatch.bind(null,{type: 'NOTIFY_REQUESTED', payload: "You must sign in to do that"})}>Send</button> 
        </div>
      </div>
    );
  }    
}