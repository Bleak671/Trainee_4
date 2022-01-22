export function sortByName(loading, dispatch, setState) {
  if (loading.value.sortedName === undefined) {
    var arr = Array.from(loading.value.data);
    arr.sort((a,b) => { 
      if (a.name === null) 
        return -1;

      if (b.name === null) 
        return 1;

      if (a.name.charCodeAt(0) > b.name.charCodeAt(0))
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
      return new Date(b.uploadDate) - new Date(a.uploadDate);
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