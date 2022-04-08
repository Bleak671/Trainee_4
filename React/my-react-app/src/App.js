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
import {Photo} from './components/Photo/Photo.js'
import {PhotoList} from './components/Photo/List.js'
import {Authorization} from './components/Auth/Authorization.js'
import {Registration} from './components/Auth/Registration.js'
import {AuthorWork} from './components/Author/Work.js'
import {AuthorWorks} from './components/Author/List.js'
import {AuthorWorkAdd} from './components/Author/WorkAdd.js'
import {AuthorAccount} from './components/Author/Account.js'
import {Exit} from './components/Auth/Exit.js'
import {TrashList} from './components/Trash/List.js'
import {TrashPhoto} from './components/Trash/Photo.js'
import {AdminPhotoList} from './components/Admin/Photo/List.js'
import {AdminUserList} from './components/Admin/User/List.js'
import {AdminPhoto} from './components/Admin/Photo/Photo.js'
import {AdminUser} from './components/Admin/User/User.js'
import {Drawer} from './components/Drawer/Drawer.js'
import {Nav} from './components/Nav/Nav';
import {NotificationContainer} from 'react-notifications';
import "react-notifications/lib/notifications.css"
import { findByPlaceholderText } from '@testing-library/react';

function App() {
  const myStyle={
    backgroundImage: "url(/12579401.jpg)",
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    minHeight: '100vh'
};
  return (
    <Router>
      <div className="pe-5 ps-5" style={myStyle}>
        <Nav/>

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

          <Route path="/reg">
            <Registration/>
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
