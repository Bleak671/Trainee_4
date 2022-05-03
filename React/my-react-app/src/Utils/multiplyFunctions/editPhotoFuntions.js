import { loadData } from "../singleFunctions/loadData";
import { storage } from "../../firebase/firebase";
import { deleteObject, ref } from "@firebase/storage";
import { host } from "../constants/globals";

//change field isPublished of currently downloaded photo and upload it
export function changePublished(token, loading, connString, updString, dispatch, setState) {
  var photo = Object.assign({}, loading.value.data.photo);
  photo.isPublished = !photo.isPublished;
  const requestOptions = {
    method: 'PUT',
    mode: 'cors',
    headers: {  
        'Content-Type': 'application/json',    
        'Access-Control-Allow-Origin':'*',
        "Authorization": "Bearer " + token  // using token
    },
    body: JSON.stringify(photo)     
  };
  fetch( connString + `/${photo.photoId}`, requestOptions)
  .then(
    () => { loadData(token, updString, dispatch, setState) }
  )
}

//change field isTrash of currently downloaded photo and upload it
export function changeTrash(token, loading, connString, updString, dispatch, setState) {
  var photo = Object.assign({}, loading.value.data.photo);
  photo.isTrash = !photo.isTrash;
  const requestOptions = {
    method: 'PUT',
    mode: 'cors',
    headers: {  
        'Content-Type': 'application/json',    
        'Access-Control-Allow-Origin':'*',
        "Authorization": "Bearer " + token  // using token
    },
    body: JSON.stringify(photo)     
  };
  fetch( connString + `/${photo.photoId}`, requestOptions)
  .then(
    () => { loadData(token, updString, dispatch, setState) }
  )
}

//sending request to delete photo
export function deletePhoto(token, connString, history, redirectString, link) {
  let photoRef = ref(storage, link);
  deleteObject(photoRef)
    .then(() => {
      const requestOptions = {
        method: 'DELETE',
        mode: 'cors',
        headers: {  
            'Content-Type': 'application/json',    
            'Access-Control-Allow-Origin':'*',
            "Authorization": "Bearer " + token  // using token
        }    
      };
      fetch( connString, requestOptions)
      .then(
        () => { history.push({
          pathname: redirectString,
        }); }
      )
    })
}

//sending request to add comment
export function addReview(token, loading, connString, updString, dispatch, setState, isPositiv, uGuid) {
  var pId = loading.value.data.photo.photoId;
  var review = {
    PhotoId : pId,
    UserId : uGuid,
    isPositive : isPositiv
  };
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {  
        'Content-Type': 'application/json',    
        'Access-Control-Allow-Origin':'*',
        "Authorization": "Bearer " + token  // using token
    },
    body: JSON.stringify(review)     
  };
  fetch( connString, requestOptions)
  .then(
    () => { loadData(token, updString, dispatch, setState) }
  )
}

export function addMessage(payload) {
  if (typeof(payload.state.value.message) !== 'undefined')
  {
    var message = {
      ToUserId : payload.id,
      FromUserId : payload.guid,
      text : payload.state.value.message
    };
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {  
          'Content-Type': 'application/json',    
          'Access-Control-Allow-Origin':'*',
          "Authorization": "Bearer " + payload.token  // using token
      },
      body: JSON.stringify(message)     
    };
    fetch( host + `User/CreateMessage`, requestOptions)
    .then(
      () => { payload.history.push({
        pathname: '/Home',
      }); 
      payload.history.push({
        pathname: '/user/' + payload.id,
      });}
    )
  }
}

export function addComment(payload) {
  if (typeof(payload.state.value.message) !== 'undefined')
  {
    var pId = payload.state.value.data.photo.photoId;
    var comment = {
      PhotoId : pId,
      UserId : payload.guid,
      text : payload.state.value.comment
    };
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {  
          'Content-Type': 'application/json',    
          'Access-Control-Allow-Origin':'*',
          "Authorization": "Bearer " + payload.token  // using token
      },
      body: JSON.stringify(comment)     
    };
    fetch( host + `Home/CreateComment`, requestOptions)
    .then(
      () => { payload.history.push({
        pathname: '/Home',
      }); 
      payload.history.push({
        pathname: '/Home/' + pId,
      });}
    )
  }
}