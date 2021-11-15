import { createSlice } from "@reduxjs/toolkit";

export const PhotoReducer = createSlice({
    name:"Photo",
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

export const { setState } = PhotoReducer.actions;

export default PhotoReducer.reducer;