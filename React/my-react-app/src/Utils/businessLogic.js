export function shiftChar(offset) {
    return function(char) {
        char = String.fromCharCode(char.charCodeAt(0) + offset);
        return char;
    }
}

export function sortByName(loading, dispatch, setState) {
    if (loading.value.sortedName === undefined) {
      var arr = Array.from(loading.value.data);
      arr.sort((a,b) => { 
        if (a.Name === null) 
          return -1;

        if (b.Name === null) 
          return 1;

        if (a.Name.charCodeAt(0) > b.Name.charCodeAt(0))
          return -1;
        else
          return 1
      });
      dispatch(setState({
        error: null,
        isLoaded: true,
        sortedDate: undefined,
        sortedName: true,
        data: arr
      }))
    }
    else {
      var arr = Array.from(loading.value.data);
      arr.reverse();
      dispatch(setState({
        error: null,
        isLoaded: true,
        sortedDate: undefined,
        sortedName: true,
        data: arr
      }))
    }
  }

export  function sortByDate(loading, dispatch, setState) {
    if (loading.value.sortedDate === undefined) {
      var arr = Array.from(loading.value.data);
      arr.sort((a,b) => { 
        return new Date(b.UploadDate) - new Date(a.UploadDate);
      });
      dispatch(setState({
        error: null,
        isLoaded: true,
        sortedDate: true,
        sortedName: undefined,
        data: arr
      }))
    }
    else {
      var arr = Array.from(loading.value.data);
      arr.reverse();
      dispatch(setState({
        error: null,
        isLoaded: true,
        sortedDate: true,
        sortedName: undefined,
        data: arr
      }))
    }
  }

export function loadData(token, connString, dispatch, setState) {
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {  
          'Content-Type': 'application/json',    
          'Access-Control-Allow-Origin':'*',
          "Authorization": "Bearer " + token  // using token
      }             
    };
    fetch(connString,requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          dispatch(setState({
            error: null,
            isLoaded: true,
            data: result
          }))
        },
        (error) => {
          dispatch(setState({
            error: error,
            isLoaded: true,
            data: []
          }))
        }
      ) 
  } 