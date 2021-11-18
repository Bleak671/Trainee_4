import { NotificationManager } from "react-notifications";
import { loadData } from "../singleFunctions/loadData";
import { host } from "../constants/globals";

export function handleChange(dispatch, setState, event) {
  var data = event.target.value;
  dispatch(setState(data));
}

export function handleSubmit(token, id, found, loading, dispatch, setState, event) {
  event.preventDefault();
  var user = Object.assign({}, loading.value.data);
  user.Login = found.found.payload;
  const requestOptions = {
    method: 'PUT',
    mode: 'cors',
    headers: {  
        'Content-Type': 'application/json',    
        'Access-Control-Allow-Origin':'*',
        "Authorization": "Bearer " + token  // using token
    },
    body: JSON.stringify(user)     
  };
  fetch( host + `AuthorAccount/${user.userId}`, requestOptions)
  .then(
    () => { NotificationManager.success('Changed', '',2000); loadData(token, host + `AuthorAccount/${id}`, dispatch, setState) },
    (error) => { NotificationManager.error('Something wrong: '+error, '',2000); }
  )
}