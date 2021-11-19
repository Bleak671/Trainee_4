import { NotificationManager } from "react-notifications";
import { loadData } from "../singleFunctions/loadData";
import { host } from "../constants/globals";

export function handleChange(dispatch, setState, event) {
  var data = event.target.value;
  dispatch(setState(data));
}

export function handleSubmit(payload) {
  return new Promise((resolve, reject) => {
    try {
      var user = Object.assign({}, payload.loading.value.data);
      user.Login = payload.found.found.payload;
      const requestOptions = {
        method: 'PUT',
        mode: 'cors',
        headers: {  
            'Content-Type': 'application/json',    
            'Access-Control-Allow-Origin':'*',
            "Authorization": "Bearer " + payload.token  // using token
        },
        body: JSON.stringify(user)     
      };
      fetch( host + `AuthorAccount/${user.userId}`, requestOptions)
      .then(
        () => { resolve() },
        (error) => { reject(error) }
      )
      resolve();
    }
    catch(e) {
      reject(e);
    }
  });
}