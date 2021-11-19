import { NotificationManager } from "react-notifications";
import { getHash } from "./getHash";
import { shiftChar } from "./shiftChar";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../../redux/Global/GlobalVarReducer';
import { host } from "../constants/globals";

export function login(email, password, dispatch, setState) {
  return new Promise(() => {
    // gathering data
    var hashedPassword = getHash(password);
    // отправляет запрос и получаем ответ
    fetch(host + `Authorization/${email}`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',    
        'Access-Control-Allow-Origin':'*'},
        body: hashedPassword
    })
    .then(res => res.json())
    .then(
      (response) => {
          if (response.access_token != null) {
            let base64ToString = Buffer.from(response.access_token.split('.')[1], "base64").toString();
            base64ToString = JSON.parse(base64ToString);
            dispatch(setState({
                accessToken : response.access_token.split("").map(shiftChar(17)).join(''),
                guid : base64ToString["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                isAdmin : base64ToString["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
                isBanned : base64ToString["isBanned"]
              })
            )
            if (base64ToString["isBanned"] == "True")
              throw new Error('You are BANNED!');
          }
          else {
            throw new Error('Incorrect email/password');
          }     
      }
      ,(error) => {
        throw new Error('Fetch error');
      } 
    );
  });
}