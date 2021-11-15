import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import {Photo} from './components/Photo.js'
import {PhotoList} from './components/PhotoList.js'
import {Authorization} from './components/Authorization.js'
import {AuthorWork} from './components/AuthorWork.js'
import {AuthorWorks} from './components/AuthorWorks.js'
import {AuthorWorkAdd} from './components/AuthorWorkAdd.js'
import {AuthorAccount} from './components/AuthorAccount.js'
import {Exit} from './components/Exit.js'
import {TrashList} from './components/TrashList.js'
import {TrashPhoto} from './components/TrashPhoto.js'
import {AdminPhotoList} from './components/AdminPhotoList.js'
import {AdminUserList} from './components/AdminUserList.js'
import {AdminPhoto} from './components/AdminPhoto.js'
import {AdminUser} from './components/AdminUser.js'
import {Drawer} from './components/Drawer.js'
import {NotificationContainer} from 'react-notifications';
import "react-notifications/lib/notifications.css"

function App() {
  const GENRES = [
    {
      route: '/',
      name: 'Home',
    },
    {
      route: '/auth',
      name: 'Authorize',
    },
  ]

  const token = sessionStorage.getItem("accessToken");
  const isAdmin = sessionStorage.getItem("isAdmin");

  if (token != null)
  {
    GENRES.push({
      route: '/trash',
      name: 'Trash bin',
    })

    if (isAdmin === 'True')
    GENRES.push({
      route: '/admin/photo',
      name: 'Admin page',
    })

    var i = GENRES.findIndex(({ name }) => name === 'Authorize');
    GENRES[i] = {
      route: '/authorWorks',
      name: 'Author Works'
    }

    GENRES.push({
      route: '/authorAccount',
      name: 'Account'
    })

    GENRES.push({
      route: '/exit',
      name: 'Log out'
    })
  }
  
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
          <ul className="navbar-nav flex-grow-1 container navbar-collapse collapse d-sm-inline-flex justify-content-around">
            {GENRES.map(genre => (
              <li>
                <Link to={genre.route} className="nav-link text-dark">{genre.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Switch>
          <Route path="/home/:PhotoId" render={(props)=><Photo {...props}/>}>
          </Route>

          <Route path="/trash/:PhotoId" render={(props)=><TrashPhoto {...props}/>}>
          </Route>

          <Route path="/admin/photo/:PhotoId" render={(props)=><AdminPhoto {...props}/>}>
          </Route>

          <Route path="/admin/user/:UserId" render={(props)=><AdminUser {...props}/>}>
          </Route>

          <Route path="/authorWorks/Add" render={(props)=><AuthorWorkAdd {...props}/>}>
          </Route>

          <Route path="/authorWorks/:PhotoId" render={(props)=><AuthorWork {...props}/>}>
          </Route>

          <Route path="/edit/:PhotoId" render={(props)=><Drawer {...props}/>}>
          </Route>

          <Route path="/authorWorks">
            <AuthorWorks/>
          </Route>

          <Route path="/authorAccount">
            <AuthorAccount/>
          </Route>

          <Route path="/exit">
            <Exit/>
          </Route>

          <Route path="/trash">
            <TrashList/>
          </Route>

          <Route path="/admin/photo">
            <AdminPhotoList/>
          </Route>

          <Route path="/admin/user">
            <AdminUserList/>
          </Route>

          <Route path="/auth">
            <Authorization/>
          </Route>

          <Route path="/">
            <PhotoList/>
          </Route>
        </Switch>

        <footer class="mt-5 p-4 opacity-50 bg-dark border-top footer text-muted">
          <div>
              <span class="text-white">Maksim Odinochenko 2021, P4 :)</span>
          </div>
        </footer>

        <NotificationContainer/>
      </div>
    </Router>
  );
}

export default App;
