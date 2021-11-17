import { createSlice } from "@reduxjs/toolkit";

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
        setState: (state, value) => {
            state.value = value.payload;
        }
    }
})

export const { setState } = GlobalVarReducer.actions;

export default GlobalVarReducer.reducer;