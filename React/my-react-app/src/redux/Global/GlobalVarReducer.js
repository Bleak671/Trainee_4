import { createSlice } from "@reduxjs/toolkit";
import { defaultReducer } from "../../Utils/builders/reducerBuilder";

export const GlobalVarReducer = createSlice({
    name:"GlobalVar",
    initialState: {
        value: {
            accessToken: null,
            guid: null,
            isAdmin: null
        }
    },
    reducers: {
        setState: defaultReducer
    }
})

export const { setState } = GlobalVarReducer.actions;

export default GlobalVarReducer.reducer;