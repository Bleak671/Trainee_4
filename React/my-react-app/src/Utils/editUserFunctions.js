import { loadData } from "./loadData";

export function changeBanned(token, loading, id, dispatch, setState) {
  var photo = Object.assign({}, loading.value.data);
  photo.isBanned = !photo.isBanned;
  updateData(token, id, photo, dispatch, setState);
}

//switch state isAdmin of loaded user and sends it
export function changeAdmin(token, loading, id, dispatch, setState) {
  var photo = Object.assign({}, loading.value.data);
  photo.isAdmin = !photo.isAdmin;
  updateData(token, id, photo, dispatch, setState);
}

export function changeLogin(token, loading, id, dispatch, setState) {
  var photo = Object.assign({}, loading.value.data);
  photo.isAdmin = !photo.isAdmin;
  updateData(token, id, photo, dispatch, setState);
}

//sending edit request and refresing data
function updateData(token, id, obj, dispatch, setState) {
  const requestOptions = {
      method: 'PUT',
      mode: 'cors',
      headers: {  
          'Content-Type': 'application/json',    
          'Access-Control-Allow-Origin':'*',
          "Authorization": "Bearer " + token  // using token
      },
      body: JSON.stringify(obj)     
    };
    fetch( `https://localhost:44340/api/Admin/EditUser`, requestOptions)
    .then(
      () => { loadData(token, `https://localhost:44340/api/Admin/GetUser/${id}`, dispatch, setState) }
    )
}