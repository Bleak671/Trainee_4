import { configureStore } from '@reduxjs/toolkit';
import PhotoListReducer from './PhotoListReducer';
import PhotoReducer from './PhotoReducer';
import TrashListReducer from './TrashListReducer';
import AdminPhotoListReducer from './AdminPhotoListReducer';
import AdminUserListReducer from './AdminUserListReducer';
import AdminUserReducer from './AdminUserReducer';
import AuthorAccountReducer from './AuthorAccountReducer';
import AuthorWorksReducer from './AuthorWorksReducer';
import AuthInfoReducer from './AuthInfoReducer';
import AddPhotoInfoReducer from './AddPhotoInfoReducer';
import FindReducer from './FindReducer';

export const store = configureStore({
  reducer: {
    PhotoList: PhotoListReducer,
    Photo: PhotoReducer,
    TrashList: TrashListReducer,
    AdminPhotoList: AdminPhotoListReducer,
    AdminUserList: AdminUserListReducer,
    AdminUser: AdminUserReducer,
    AuthorAccount: AuthorAccountReducer,
    AuthorWorks: AuthorWorksReducer,
    AuthInfo : AuthInfoReducer,
    Find : FindReducer,
    AddPhotoInfo : AddPhotoInfoReducer
  },
});
