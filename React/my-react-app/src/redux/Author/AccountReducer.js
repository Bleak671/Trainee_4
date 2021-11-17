import { createSlice } from "@reduxjs/toolkit";
import { defaultReducer, defaultState } from "../../Utils/builders/reducerBuilder";

export const AuthorAccountReducer = createSlice({
    name:"AuthorAccount",
    initialState: defaultState,
    reducers: {
        setState: defaultReducer
    }
})

export const { setState } = AuthorAccountReducer.actions;

export default AuthorAccountReducer.reducer;