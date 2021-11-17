import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { generateNav } from '../../Utils/singleFunctions/generateNav';

export function Nav() {
  const globals = useSelector((state) => state.GlobalVar);
  const token = globals.value.accessToken;
  const isAdmin = globals.value.isAdmin;
  const GENRES = generateNav(token, isAdmin);

  return (
    <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
      <ul className="navbar-nav flex-grow-1 container navbar-collapse collapse d-sm-inline-flex justify-content-around">
        {GENRES.map(genre => (
          <li>
            <Link to={genre.route} className="nav-link text-dark">{genre.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}