import { createSlice } from "@reduxjs/toolkit";
import { defaultReducer,defaultState } from "../../Utils/builders/reducerBuilder";

export const AuthorWorksReducer = createSlice({
    name:"AuthorWorks",
    initialState: defaultState,
    reducers: {
        setState: defaultReducer
    }
})

export const { setState } = AuthorWorksReducer.actions;

export default AuthorWorksReducer.reducer;