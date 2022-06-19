import React, { useEffect } from 'react';
import {
  Link,
  useHistory
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../../../redux/NoPageBind/Reducer';
import { loadData } from '../../../Utils/singleFunctions/loadData';
import { shiftChar } from '../../../Utils/singleFunctions/shiftChar';
import { deletePhoto } from '../../../Utils/multiplyFunctions/editPhotoFuntions';
import { timeOptions, host } from '../../../Utils/constants/globals';

//Component for selected photo from Admin photo
export function AdminPhoto(props) { 
  //initializing constants
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.Photo);
  const globals = useSelector((state) => state.GlobalVar).value;
  const id = props.match.params.PhotoId.toString();
  if (globals.accessToken != null)
    var token = globals.accessToken.split("").map(shiftChar(-17)).join('');
  else
    history.push({
      pathname: '/',
    });  

  //once loaded after rendering
  useEffect(() => { loadData(token, host + `Home/${id}`, dispatch, setState) }, []);

  //render, depending on state of loading
  if (!loading.value.isLoaded && loading.value.data !== undefined) {
    return <div>Loading...</div>;
  } else {
    var date = new Date(loading.value.data.photo.uploadDate);
    return(
      <div className="d-flex flex-column bg-white bg-opacity-25 rounded-3" margin-bottom="1000">
        <Link className="w-25 mb-3 p-2 nav-link text-dark" to="/admin/photo">Back</Link>
        <div class="align-self-center">
          <img className="pb-3 mw-100 rounded-3" src={loading.value.data.photo.link}/>
        </div>
        <div className="pb-3">
          <Link className="ms-3" to={"/admin/user/" + loading.value.data.photo.userId}>to User</Link>
        </div>
        <span className="pb-3 text-dark">Name: {loading.value.data.photo.name}</span>
        <span className="pb-3 text-dark">Upload date: {date.toLocaleString("en-US", timeOptions)}</span>
        <span className="pb-3 text-dark">Views: {loading.value.data.photo.views}</span>
        <div className="pb-3">
          <span className="pb-3 text-dark">Published: {loading.value.data.photo.isPublished ? "Yes" : "No"}</span>
        </div>
        <div className="pb-3">
          <span className="pb-3 text-dark">Trash: {loading.value.data.photo.isTrash ? "Yes" : "No"}</span>
        </div>
        <span className="pb-3 text-dark">Likes: {loading.value.data.positive}</span>
        <span className="pb-3 text-dark">Dislikes: {loading.value.data.negative}</span>
        <button className="w-25 m-5 bg-danger rounded-3 align-self-end" onClick={deletePhoto.bind(null, token, host +  `Admin/DeletePhoto/${id}`, history, '/admin/photo')}>Delete</button>
        <h2 className="pb-3 ms-5 text-dark">Comments:</h2>
        {loading.value.data.map !== undefined ? loading.value.data.comments.map(item => (
          <div className="rounded-3 m-5 mt-1 mb-1 img-thumbnail">
            <span className="ms-1">{item.text !== null ? item.text : "Error"}</span>
          </div>
        )) : ""}
      </div>
    );
  }    //token, connString, redirectString
}