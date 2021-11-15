import { createSlice } from "@reduxjs/toolkit";

export const AuthorAccountReducer = createSlice({
    name:"AuthorAccount",
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

export const { setState } = AuthorAccountReducer.actions;

export default AuthorAccountReducer.reducer;