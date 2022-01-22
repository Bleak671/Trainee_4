import { createSlice } from "@reduxjs/toolkit";
import { defaultReducer, defaultState } from "../../Utils/builders/reducerBuilder";

export const PhotoReducer = createSlice({
    name:"Photo",
    initialState: defaultState,
    reducers: {
        setState: defaultReducer
    }
})

export const { setState } = PhotoReducer.actions;

export default PhotoReducer.reducer;