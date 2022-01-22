import { createSlice } from "@reduxjs/toolkit";
import { defaultReducer } from "../../Utils/builders/reducerBuilder";

export const AddPhotoInfoReducer = createSlice({
    name:"AddPhotoInfo",
    initialState: {
        value: {
            Link: null,
            Name: null
        }
    },
    reducers: {
        setState: defaultReducer
    }
})

export const { setState } = AddPhotoInfoReducer.actions;

export default AddPhotoInfoReducer.reducer;