import { createSlice } from "@reduxjs/toolkit";

export const FindReducer = createSlice({
    name:"Find",
    initialState: {
        found: null
    },
    reducers: {
        setState: (state, value) => {
            state.found = value;
        }
    }
})

export const { setState } = FindReducer.actions;

export default FindReducer.reducer;