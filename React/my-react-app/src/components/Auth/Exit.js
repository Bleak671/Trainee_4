import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setState } from "../../redux/Global/GlobalVarReducer";

//tool for signing out
export function Exit() {  
    const globals = useSelector((state) => state.GlobalVar);
    const dispatch = useDispatch();
    if (globals.value.accessToken != null && globals.value.accessToken != undefined) {
        dispatch(setState({}));
    }
    else {
        return <Redirect to="/" />
    }
}