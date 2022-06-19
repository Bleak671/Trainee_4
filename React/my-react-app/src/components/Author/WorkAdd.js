import {
  Link,
  useHistory 
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../../redux/Author/AddPhotoInfoReducer';
import { setState as setTagState } from '../../redux/NoPageBind/Reducer';
import { shiftChar } from '../../Utils/singleFunctions/shiftChar';
import { loadData } from '../../Utils/singleFunctions/loadData';
import { host } from '../../Utils/constants/globals';
import React, { useEffect } from 'react';
import { handleChangeLink, handleChangeName, handleChangeLinkByFile, handleAddTag } from '../../Utils/handlers/handleAddPhoto';

export function AuthorWorkAdd() {
  //const  
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.Photo);
  const history = useHistory();
  const state = useSelector((state) => state.AddPhotoInfo);
  const globals = useSelector((state) => state.GlobalVar).value;
  const guid = globals.guid;
  const isBanned = useSelector((state) => state.GlobalVar).value.isBanned;
  if (globals.accessToken != null)
    var token = globals.accessToken.split("").map(shiftChar(-17)).join('');
  else
    history.push({
      pathname: '/',
    });  

  useEffect(() => { 
    loadData(token, host +  `Tag/Tags`, dispatch, setTagState); 
    var data = Object.assign({},state.value);
    data.name = null;
    dispatch(setState(data));
  }, []);
   
  //render, depending on state of loading
  if (isBanned != "True")
    if (!loading.value.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return(
        <div className="p-3 d-flex flex-column bg-white bg-opacity-25 rounded-3" margin-bottom="1000">
          <Link className="w-25 mb-3 p-2 nav-link text-dark" to="/authorWorks">Back</Link>
          <div className="w-100">
            <input id="link" type="text" className="pb-3 rounded-3" placeholder="Photo link" onChange={handleChangeLink.bind(null, state, dispatch, setState)}/>
            <span className="me-3 ms-3">Or</span>
            <input type="file" onChange={handleChangeLinkByFile.bind(null, state, dispatch, setState)} />
          </div>
          <input id="name" type="text" className="pb-3 rounded-3" placeholder="Photo name" onChange={handleChangeName.bind(null, state, dispatch, setState)}/>
          <span className="ms-5 m-3">Tags</span>
          {loading.value.data.map !== undefined ? loading.value.data.map(item => (
            <div>
              <input id={item.name} className="m-3 bit" type="checkbox"/>
              <span>{item.name}</span>
            </div>
          )) : ""}
          <button className="w-25 ms-5 mt-5 bg-info rounded-3" onClick={dispatch.bind(null,{type: 'PHOTO_ADD_REQUESTED', payload: {token, guid, history, state}})}>Send</button>
        </div>
      );
    }
  else {
    return (
      <div>
        <h1>YOU ARE BANNED!</h1>
      </div>
    );
  }
}