import { NotificationManager } from "react-notifications";

export function handleChange(dispatch, setState, event) {
  var data = event.target.value;
  dispatch(setState(data));
}

export function handleSubmit(found, loading, redirString, history, event) {
  event.preventDefault();
  var value = found.found.payload;
    var res = loading.value.data.find((element) => { 
      if (element.name == value)
        return true;
      else  
        return false;
    })
    if (res === undefined)
      NotificationManager.error('Not found', '',2000);
    else
      history.push({
        pathname: `${redirString + res.PhotoId}`,
      });
}