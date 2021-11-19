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
  if (!loading.value.isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    var date = new Date(loading.value.data.uploadDate);
    return(
      <div className="d-flex flex-column" margin-bottom="1000">
        <Link className="w-25 mb-3 p-2 nav-link text-dark" to="/admin/photo" className="w-25 mb-3 p-2 nav-link text-dark">Back</Link>
        <div>
          <img className="pb-3 rounded-3" src={loading.value.data.link}/>
        </div>
        <span className="pb-3 text-dark">Name: {loading.value.data.name}</span>
        <span className="pb-3 text-dark">Upload date: {date.toLocaleString("en-US", timeOptions)}</span>
        <span className="pb-3 text-dark">Views: {loading.value.data.views}</span>
        <div className="pb-3">
          <Link className="ms-3" to={"/admin/user/" + loading.value.data.userId}>to User</Link>
        </div>
        <div className="pb-3">
          <span className="pb-3 text-dark">Published: {loading.value.data.isPublished ? "Yes" : "No"}</span>
        </div>
        <div>
          <span className="pb-3 text-dark">Trash: {loading.value.data.isTrash ? "Yes" : "No"}</span>
        </div>
        <button className="w-25 ms-5 mt-5 bg-danger rounded-3" onClick={deletePhoto.bind(null, token, host +  `Admin/DeletePhoto/${id}`, history, '/admin/photo')}>Delete</button>
      </div>
    );
  }    //token, connString, redirectString
}