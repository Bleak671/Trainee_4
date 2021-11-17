import { NotificationManager } from "react-notifications";
import { getHash } from "./getHash";
import { shiftChar } from "./shiftChar";
import { host } from "../constants/globals";

export function register(email, password, dispatch, setState) {
  var hashedPassword = getHash(password);
  var json = { "Email": email, "HashedPassword":hashedPassword }
  fetch(host + `Authorization/`, {
      method: "POST",
      headers: {
      'Content-Type': 'application/json',    
      'Access-Control-Allow-Origin':'*'},
      body: JSON.stringify(json)
  })
  .then((res) => {
    if (res.ok) {
      return res.json(); 
    }
    else
      throw new Error();
  })
  .then(
    (response) => {
      if (response.access_token != null) {
        let base64ToString = Buffer.from(response.access_token.split('.')[1], "base64").toString();
        base64ToString = JSON.parse(base64ToString);
        dispatch(setState({
          accessToken : response.access_token.split("").map(shiftChar(17)).join(''),
          guid : base64ToString["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
          isAdmin : base64ToString["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        })
      )
      }
      else {
        NotificationManager.error('Registration error, try another email', 'Registration', 2000);
      }
    }
    ,(error) => {
      NotificationManager.error('Fetch error', '',2000);
        console.log("Error: ", error.message);
    } 
  )
  .catch(NotificationManager.error('Registration error, try another email', 'Registration', 2000)); 
}