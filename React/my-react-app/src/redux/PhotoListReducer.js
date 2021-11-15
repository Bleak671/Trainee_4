import { createSlice } from "@reduxjs/toolkit";

export const PhotoListReducer = createSlice({
    name:"PhotoList",
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

export const { setState } = PhotoListReducer.actions;

export default PhotoListReducer.reducer;