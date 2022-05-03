import { createSlice } from "@reduxjs/toolkit";
import { defaultState, defaultReducer } from '../../Utils/builders/reducerBuilder';

export const UserReducer = createSlice({
    name:"User",
    initialState: defaultState,
    reducers: {
        setState: defaultReducer
    }
})

export const { setState } = UserReducer.actions;

export default UserReducer.reducer;