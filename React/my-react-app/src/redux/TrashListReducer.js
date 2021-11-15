import { createSlice } from "@reduxjs/toolkit";

export const TrashListReducer = createSlice({
    name:"TrashList",
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

export const { setState } = TrashListReducer.actions;

export default TrashListReducer.reducer;