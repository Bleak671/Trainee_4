import { createSlice } from "@reduxjs/toolkit";

export const AddPhotoInfoReducer = createSlice({
    name:"AddPhotoInfo",
    initialState: {
        value: {
            Link: null,
            Name: null
        }
    },
    reducers: {
        setState: (state, value) => {
            state.value = value.payload;
        }
    }
})

export const { setState } = AddPhotoInfoReducer.actions;

export default AddPhotoInfoReducer.reducer;