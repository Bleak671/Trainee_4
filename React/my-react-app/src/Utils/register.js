import { NotificationManager } from "react-notifications";
import { getHash } from "./getHash";
import { shiftChar } from "./shiftChar";

export function register(email, password) {
  var hashedPassword = getHash(password);
  var json = { "Email": email, "HashedPassword":hashedPassword }
  fetch(`https://localhost:44340/api/Authorization/`, {
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
        sessionStorage.setItem("accessToken", response.access_token);
        let base64ToString = Buffer.from(response.access_token.split('.')[1], "base64").toString();
        base64ToString = JSON.parse(base64ToString);
        sessionStorage.setItem("guid", base64ToString.Guid);
        sessionStorage.setItem("isAdmin", base64ToString.isAdmin);
        window.location.reload();
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