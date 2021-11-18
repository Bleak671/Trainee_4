import { createSlice } from "@reduxjs/toolkit";
import { defaultReducer } from "../../Utils/builders/reducerBuilder";

export const AuthInfoReducer = createSlice({
    name:"AuthInfo",
    initialState: {
        value: {
            Email: null,
            Password: null
        }
    },
    reducers: {
        setState: defaultReducer
    }
})

export const { setState } = AuthInfoReducer.actions;

export default AuthInfoReducer.reducer;