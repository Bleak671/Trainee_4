import { createSlice } from "@reduxjs/toolkit";

export const AuthInfoReducer = createSlice({
    name:"AuthInfo",
    initialState: {
        value: {
            Email: null,
            Password: null
        }
    },
    reducers: {
        setState: (state, value) => {
            state.value = value.payload;
        }
    }
})

export const { setState } = AuthInfoReducer.actions;

export default AuthInfoReducer.reducer;