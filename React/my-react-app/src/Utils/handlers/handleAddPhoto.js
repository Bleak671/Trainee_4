import { NotificationManager } from 'react-notifications';
import sha256 from 'crypto-js/sha256';
import { host } from '../constants/globals';

var hash,link;

export function handleChangeLink(state, dispatch, setState, event) {
  var data = Object.assign({},state.value);
  data.link = event.target.value;
  dispatch(setState(data));
}

export function handleChangeName(state, dispatch, setState, event) {
  var data = Object.assign({},state.value);
  data.name = event.target.value;
  dispatch(setState(data));
}

export function handleSubmit(payload) {
  return new Promise((resolve, reject) => {
    var link = payload.state.value.link;
    var name = payload.state.value.name;
    fetch(link)
      .then(res => res.blob())
      .then((blob => { 
        var reader = new FileReader();

        reader.onload = function(event) {
          var binary = event.target.result;
          var md5 = sha256(binary).toString()
          hash = md5;
          var img = new Image();
          img.src = link;
          img.onload = () => {
            console.log(img);
          }
              var photo = {
                Link : link,
                Name : name,
                UserId : payload.guid,
                Hash : hash
              }
              const requestOptions = {
                method: 'POST',
                mode: 'cors',
                headers: {  
                    'Content-Type': 'application/json',    
                    'Access-Control-Allow-Origin':'*',
                    "Authorization": "Bearer " + payload.token  // using payload.token
                },
                body: JSON.stringify(photo)     
              };
              fetch( host + `Trash`, requestOptions)
              .then(
                (response) => { 
                  if (response.status == 400)
                    reject("Such photo already exists");
                  else
                    payload.history.push({
                      pathname: '/authorWorks',
                    });  
                    resolve();
                },
                (error) => { reject('Unknown error: ' + error) }
              )
            };

        reader.readAsBinaryString(blob);
          }));
  })
}