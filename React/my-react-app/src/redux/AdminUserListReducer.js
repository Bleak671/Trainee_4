import { createSlice } from "@reduxjs/toolkit";

export const AdminUserListReducer = createSlice({
    name:"AdminUserList",
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

export const { setState } = AdminUserListReducer.actions;

export default AdminUserListReducer.reducer;