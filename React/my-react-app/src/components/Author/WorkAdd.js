import {
  Link,
  useHistory 
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setState } from '../../redux/Author/AddPhotoInfoReducer';
import { shiftChar } from '../../Utils/singleFunctions/shiftChar';
import { handleChangeLink, handleChangeName } from '../../Utils/handlers/handleAddPhoto';

export function AuthorWorkAdd(props) {
  //const  
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state.AddPhotoInfo);
  const globals = useSelector((state) => state.GlobalVar).value;
  const guid = globals.guid;
  const isBanned = useSelector((state) => state.GlobalVar).value.isBanned;
  if (globals.accessToken != null)
    var token = globals.accessToken.split("").map(shiftChar(-17)).join('');
  else
    history.push({
      pathname: '/',
    });  

  //render, depending on state of loading
  if (isBanned != "True")
    return(
      <div className="d-flex flex-column" margin-bottom="1000">
        <Link className="w-25 mb-3 p-2 nav-link text-dark" to="/authorWorks" className="w-25 mb-3 p-2 nav-link text-dark">Back</Link>
          <input id="link" type="text" className="pb-3 rounded-3" placeholder="Photo link" onChange={handleChangeLink.bind(null, state, dispatch, setState)}/>
          <input id="name" type="text" className="pb-3 rounded-3" placeholder="Photo name" onChange={handleChangeName.bind(null, state, dispatch, setState)}/>
          <button className="w-25 ms-5 mt-5 bg-info rounded-3" onClick={dispatch.bind(null,{type: 'PHOTO_ADD_REQUESTED', payload: {token, guid, history, state}})}>Send</button>
      </div>
    );
  else {
    return (
      <div>
        <h1>YOU ARE BANNED!</h1>
      </div>
    );
  }
}