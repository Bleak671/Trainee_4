import { createSlice } from "@reduxjs/toolkit";

export const AuthorWorksReducer = createSlice({
    name:"AuthorWorks",
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

export const { setState } = AuthorWorksReducer.actions;

export default AuthorWorksReducer.reducer;