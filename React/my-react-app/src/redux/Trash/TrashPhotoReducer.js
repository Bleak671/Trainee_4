import { createSlice } from "@reduxjs/toolkit";
import { defaultReducer, defaultState } from "../../Utils/builders/reducerBuilder";

export const TrashPhotoReducer = createSlice({
    name:"TrashPhoto",
    initialState: defaultState,
    reducers: {
        setState: defaultReducer
    }
})

export const { setState } = TrashPhotoReducer.actions;

export default TrashPhotoReducer.reducer;