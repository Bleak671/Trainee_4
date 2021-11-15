import { createSlice } from "@reduxjs/toolkit";

export const AdminPhotoListReducer = createSlice({
    name:"AdminPhotoList",
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

export const { setState } = AdminPhotoListReducer.actions;

export default AdminPhotoListReducer.reducer;