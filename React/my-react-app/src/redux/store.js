import { configureStore } from '@reduxjs/toolkit';
import PhotoListReducer from './PhotoListReducer';
import PhotoReducer from './PhotoReducer';
import TrashListReducer from './TrashListReducer';
import AdminPhotoListReducer from './AdminPhotoListReducer';
import AdminUserListReducer from './AdminUserListReducer';
import AdminUserReducer from './AdminUserReducer';
import AuthorAccountReducer from './AuthorAccountReducer';
import AuthorWorksReducer from './AuthorWorksReducer';

export const store = configureStore({
  reducer: {
    PhotoList: PhotoListReducer,
    Photo: PhotoReducer,
    TrashList: TrashListReducer,
    AdminPhotoList: AdminPhotoListReducer,
    AdminUserList: AdminUserListReducer,
    AdminUser: AdminUserReducer,
    AuthorAccount: AuthorAccountReducer,
    AuthorWorks: AuthorWorksReducer
  },
});
