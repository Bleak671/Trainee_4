import { createSlice } from "@reduxjs/toolkit";

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
        setState: (state, value) => {
            state.value = value.payload;
        }
    }
})

export const { setState } = AdminUserReducer.actions;

export default AdminUserReducer.reducer;