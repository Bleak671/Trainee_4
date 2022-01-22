import { createSlice } from "@reduxjs/toolkit";
import { defaultReducer } from "../../Utils/builders/reducerBuilder";

export const DrawerInputReducer = createSlice({
    name:"DrawerInput",
    initialState: {
        value: {
            RemoveNoise: null,
            Region: null
        }
    },
    reducers: {
        setState: defaultReducer
    }
})

export const { setState } = DrawerInputReducer.actions;

export default DrawerInputReducer.reducer;