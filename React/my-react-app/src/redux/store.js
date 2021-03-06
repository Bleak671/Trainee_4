import { configureStore } from '@reduxjs/toolkit';
import PhotoListReducer from './Photo/ListReducer';
import PhotoReducer from './NoPageBind/Reducer';
import TrashListReducer from './Trash/ListReducer';
import AdminPhotoListReducer from './Admin/PhotoListReducer';
import AdminUserListReducer from './Admin/UserListReducer';
import AdminUserReducer from './Admin/UserReducer';
import AuthorAccountReducer from './Author/AccountReducer';
import AuthorPhotoReducer from './Author/AuthorPhotoReducer';
import AuthorWorksReducer from './Author/WorksReducer';
import AuthInfoReducer from './Auth/AuthInfoReducer';
import AddPhotoInfoReducer from './Author/AddPhotoInfoReducer';
import FindReducer from './NoPageBind/FindReducer';
import GlobalVarReducer from './Global/GlobalVarReducer'
import DrawerInputReducer from './Draw/DrawerInputReducer';
import createSagaMiddleware from 'redux-saga';
import TrashPhotoReducer from './Trash/TrashPhotoReducer'
import saga from '../saga/saga';
import UserReducer from './User/UserReducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    PhotoList: PhotoListReducer,
    AuthorPhoto: AuthorPhotoReducer,
    TrashPhoto: TrashPhotoReducer,
    Photo: PhotoReducer,
    TrashList: TrashListReducer,
    AdminPhotoList: AdminPhotoListReducer,
    AdminUserList: AdminUserListReducer,
    AdminUser: AdminUserReducer,
    AuthorAccount: AuthorAccountReducer,
    AuthorWorks: AuthorWorksReducer,
    AuthInfo : AuthInfoReducer,
    Find : FindReducer,
    AddPhotoInfo : AddPhotoInfoReducer,
    GlobalVar : GlobalVarReducer,
    DrawerInput : DrawerInputReducer,
    User: UserReducer,
  },
  middleware : (getDefaultMiddleware) =>
  getDefaultMiddleware({
    thunk: false,
    serializableCheck: false,
  }).concat(sagaMiddleware)
});

sagaMiddleware.run(saga);
