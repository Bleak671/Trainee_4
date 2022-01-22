import { createSlice } from "@reduxjs/toolkit";
import { defaultReducer, defaultState } from "../../Utils/builders/reducerBuilder";

export const AdminUserListReducer = createSlice({
    name:"AdminUserList",
    initialState: defaultState,
    reducers: {
        setState: defaultReducer
    }
})

export const { setState } = AdminUserListReducer.actions;

export default AdminUserListReducer.reducer;