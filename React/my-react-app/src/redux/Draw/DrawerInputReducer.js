import { createSlice } from "@reduxjs/toolkit";

export const DrawerInputReducer = createSlice({
    name:"DrawerInput",
    initialState: {
        value: {
            RemoveNoise: null,
            Region: null
        }
    },
    reducers: {
        setState: (state, value) => {
            state.value = value.payload;
        }
    }
})

export const { setState } = DrawerInputReducer.actions;

export default DrawerInputReducer.reducer;