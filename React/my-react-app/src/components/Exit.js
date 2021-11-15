import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
  } from "react-router-dom";

//tool for signing out
export function Exit() {  
    var token = sessionStorage.getItem("accessToken") != null
    if (token) {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("guid");
        window.location.reload();
    }
    else {
        return <Redirect to="/" />
    }
}