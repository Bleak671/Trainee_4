import { NotificationManager } from 'react-notifications';
import sha256 from 'crypto-js/sha256';
import { host } from '../constants/globals';

var hash,link;

export function handleChangeLink(state, dispatch, setState, event) {
  var data = Object.assign({},state.value);
  data.Link = event.target.value;
  dispatch(setState(data));
}

export function handleChangeName(state, dispatch, setState, event) {
  var data = Object.assign({},state.value);
  data.Name = event.target.value;
  dispatch(setState(data));
}

export function handleSubmit(token, guid, history, state, event) {
  event.preventDefault();
  var link = state.value.link;
  var name = state.value.name;
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
              UserId : guid,
              Hash : hash
            }
            const requestOptions = {
              method: 'POST',
              mode: 'cors',
              headers: {  
                  'Content-Type': 'application/json',    
                  'Access-Control-Allow-Origin':'*',
                  "Authorization": "Bearer " + token  // using token
              },
              body: JSON.stringify(photo)     
            };
            fetch( host + `Trash`, requestOptions)
            .then(
              (response) => { 
                if (response.status == 400)
                  NotificationManager.error('Such photo already exists', '',2000);
                else
                  history.push({
                    pathname: '/authorWorks',
                  });  
              },
              (error) => { NotificationManager.error('Unknown error: ' + error, '',2000) }
            )
          };

      reader.readAsBinaryString(blob);
        }));
}