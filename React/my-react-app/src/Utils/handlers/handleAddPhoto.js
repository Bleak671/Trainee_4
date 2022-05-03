import sha256 from 'crypto-js/sha256';
import { host } from '../constants/globals';
import { storage } from '../../firebase/firebase';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'; 

export function handleChangeLink(state, dispatch, setState, event) {
  var data = Object.assign({},state.value);
  data.link = event.target.value;
  dispatch(setState(data));
}

export function handleChangeComment(state, dispatch, setState, event) {
  var data = Object.assign({},state.value);
  data.comment = event.target.value;
  dispatch(setState(data));
}

export function handleChangeMessage(state, dispatch, setState, event) {
  var data = Object.assign({},state.value);
  data.message = event.target.value;
  dispatch(setState(data));
}

export function handleChangeLinkByFile(state, dispatch, setState, event) {
  var data = Object.assign({},state.value);
  if (event.target.files[0]) {
    data.file = event.target.files[0];
    dispatch(setState(data));
  }
}

export function handleChangeName(state, dispatch, setState, event) {
  var data = Object.assign({},state.value);
  data.name = event.target.value;
  dispatch(setState(data));
}

export function handleSubmit(payload) {
  return new Promise((resolve, reject) => {
    if (payload.state.value.file != null) {
      const uploadTask = uploadBytesResumable(ref(storage, `images/${payload.state.value.file.name}`), payload.state.value.file);
      uploadTask.on(
        "state_changed",
        () => {},
        error => {
          reject(error);
        },
        () => {
          getDownloadURL(ref(storage, `images/${payload.state.value.file.name}`))
            .then(url => {
              AddPhotoToDB(url, payload.state.value.name, payload.guid, payload.token, payload.history);
              resolve();
            })
        }
      );
    }
    else {
      AddPhotoToDB(payload.state.value.link, payload.state.value.name, payload.guid, payload.token, payload.history);
      resolve();
    }
  })
}

function AddPhotoToDB(link, name, guid, token, history) {
  fetch(link, {
    method: 'GET',
    mode: 'cors'   
  })
  .then(res => res.blob())
  .then((blob => { 
    var reader = new FileReader();

    reader.onload = function(event) {
      var binary = event.target.result;
      var md5 = sha256(binary).toString()
      var hash = md5;
      var img = new Image();
      img.src = link;
      img.onload = () => {
        console.log(img);
      }
          var photo = {
            Link : link,
            Name : name,
            UserId : guid,
            Hash : hash
          }
          const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {  
                'Content-Type': 'application/json',    
                'Access-Control-Allow-Origin':'*',
                "Authorization": "Bearer " + token  // using payload.token
            },
            body: JSON.stringify(photo)     
          };
          fetch( host + `Trash`, requestOptions)
          .then(
            (response) => { 
              if (response.status == 400)
                console.log("Such photo already exists");
              else
                history.push({
                  pathname: '/authorWorks',
                });  
            },
            (error) => { console.log('Unknown error: ' + error) }
          )
        };

    reader.readAsBinaryString(blob);
      }));
}