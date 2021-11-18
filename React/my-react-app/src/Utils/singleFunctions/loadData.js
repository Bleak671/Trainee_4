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
      .then(res =>  res.json())
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