import React, { useEffect } from 'react';
import {
  Link,
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../../redux/NoPageBind/Reducer';
import { loadData } from '../../Utils/singleFunctions/loadData';
import { timeOptions } from '../../Utils/constants/globals';
import { host } from '../../Utils/constants/globals';

export function Photo(props) {  
  //const
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.Photo);
  const id = props.match.params.PhotoId.toString();

  //load once
  useEffect(() => { loadData("", host +  `Home/${id}`, dispatch, setState)  }, []);
   
  //render, depending on state of loading
  if (!loading.value.isLoaded) {
    return <div>Loading...</div>;
  } else {
    var date = new Date(loading.value.data.uploadDate);
    return(
      <div className="d-flex flex-column" margin-bottom="1000">
        <Link to="/" className="w-25 mb-3 p-2 nav-link text-dark">Back</Link>
        <div>
          <img className="pb-3 rounded-3" src={loading.value.data.link}/>
        </div>
        <span className="pb-3 text-dark">Name: {loading.value.data.name}</span>
        <span className="pb-3 text-dark">Upload date: {date.toLocaleString("en-US", timeOptions)}</span>
        <span className="pb-3 text-dark">Views: {loading.value.data.views}</span>
      </div>
    );
  }    
}