import { createSlice } from "@reduxjs/toolkit";
import { defaultState, defaultReducer } from '../../Utils/builders/reducerBuilder';

export const AdminPhotoListReducer = createSlice({
    name:"AdminPhotoList",
    initialState: defaultState,
    reducers: {
        setState: defaultReducer
    }
})

export const { setState } = AdminPhotoListReducer.actions;

export default AdminPhotoListReducer.reducer;