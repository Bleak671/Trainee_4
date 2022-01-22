export function handleChange(dispatch, setState, event) {
  var data = event.target.value;
  dispatch(setState(data));
}

export function handleSubmit(payload) {
  return new Promise((resolve, reject) => {
    try {
      var value = payload.found.found.payload;
      var res = payload.loading.value.data.find((element) => { 
      if (element.name == value)
        return true;
      else  
        return false;
      })
      if (res === undefined)
        reject();
      else
        payload.history.push({
          pathname: `${payload.redirString + res.photoId}`,
        });
      resolve();
    }
    catch(e) {
      reject(e);
    }
  });
}