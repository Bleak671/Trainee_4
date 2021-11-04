import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false
    };
  }

  componentDidMount() {
    let { PhotoId } = this.props.PhotoId;
    let id = PhotoId.toString();
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {  
          'Content-Type': 'application/json',    
          'Access-Control-Allow-Origin':'*',

      }             
    };
    fetch( `https://localhost:44340/api/Home/${id}`, requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            item: result
          });
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, item } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return(
        <div>
          <img className="rounded-3 pb-3" height="150" src={item.Link}/>
        </div>
      );
    }
  }
}

class PhotoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {  
          'Content-Type': 'application/json',    
          'Access-Control-Allow-Origin':'*',

      }             
    };
    fetch("https://localhost:44340/api/Home",requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <div className="d-flex flex-wrap justify-content-between">
          {items.map(item => (
            <a id={item.PhotoId} key={item.PhotoId} href={"/" + item.PhotoId}>  
              <img className="rounded-3 pb-3" height="150" src={item.Link}/>
            </a>
          ))}
        </div>
      );
    }
  }
}

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
          <ul className="navbar-nav flex-grow-1 container navbar-collapse collapse d-sm-inline-flex justify-content-around">
            <li>
              <Link to="/" className="nav-link text-dark">Home</Link>
            </li>
            <li>
              <Link to="/account" className="nav-link text-dark">Account</Link>
            </li>
            <li>
              <Link to="/trash" className="nav-link text-dark">Trash bin</Link>
            </li>
            <li>
              <Link to="/admin" className="nav-link text-dark">Admin page</Link>
            </li>
            <li>
              <Link to="/auth" className="nav-link text-dark">Authorize</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/:PhotoId" render={(props)=><Photo {...props}/>}>
          </Route>

          <Route path="/">
            <PhotoList/>
          </Route>

          <Route path="/account">
          </Route>

          <Route path="/trash">
          </Route>

          <Route path="/admin">
          </Route>

          <Route path="/auth">
          </Route>
        </Switch>

        <footer class="p-4 bg-dark border-top footer text-muted fixed-bottom">
        <div class="container">
            <span class="text-white">Maksim Odinochenko 2021, P4 :)</span>
        </div>
    </footer>
      </div>
    </Router>
  );
}

export default App;
