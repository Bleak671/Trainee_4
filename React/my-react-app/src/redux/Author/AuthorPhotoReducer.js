import { createSlice } from "@reduxjs/toolkit";
import { defaultReducer, defaultState } from "../../Utils/builders/reducerBuilder";

export const AuthorPhotoReducer = createSlice({
    name:"AuthorPhoto",
    initialState: defaultState,
    reducers: {
        setState: defaultReducer
    }
})

export const { setState } = AuthorPhotoReducer.actions;

export default AuthorPhotoReducer.reducer;