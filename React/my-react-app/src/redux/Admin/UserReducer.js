import { createSlice } from "@reduxjs/toolkit";
import { defaultReducer } from "../../Utils/builders/reducerBuilder";

export const AdminUserReducer = createSlice({
    name:"AdminUser",
    initialState: {
        value: {
            error: null,
            isLoaded: false,
            data: null
        }
    },
    reducers: {
        setState: defaultReducer
    }
})

export const { setState } = AdminUserReducer.actions;

export default AdminUserReducer.reducer;