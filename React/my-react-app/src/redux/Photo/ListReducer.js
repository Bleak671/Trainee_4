import { createSlice } from "@reduxjs/toolkit";
import { defaultReducer, defaultState } from "../../Utils/builders/reducerBuilder";

export const PhotoListReducer = createSlice({
    name:"PhotoList",
    initialState: defaultState,
    reducers: {
        setState: defaultReducer
    }
})

export const { setState } = PhotoListReducer.actions;

export default PhotoListReducer.reducer;