import { loadData } from "../singleFunctions/loadData";

//change field isPublished of currently downloaded photo and upload it
export function changePublished(token, loading, connString, updString, dispatch, setState) {
  var photo = Object.assign({}, loading.value.data);
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
  fetch( connString, requestOptions)
  .then(
    () => { loadData(token, updString, dispatch, setState) }
  )
}

//change field isTrash of currently downloaded photo and upload it
export function changeTrash(token, loading, connString, updString, dispatch, setState) {
  var photo = Object.assign({}, loading.value.data);
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
  fetch( connString, requestOptions)
  .then(
    () => { loadData(token, updString, dispatch, setState) }
  )
}

//sending request to delete photo
export function deletePhoto(token, connString, history, redirectString) {
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
}