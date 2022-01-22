import { createSlice } from "@reduxjs/toolkit";
import { defaultReducer, defaultState } from "../../Utils/builders/reducerBuilder";

export const TrashListReducer = createSlice({
    name:"TrashList",
    initialState: defaultState,
    reducers: {
        setState: defaultReducer
    }
})

export const { setState } = TrashListReducer.actions;

export default TrashListReducer.reducer;