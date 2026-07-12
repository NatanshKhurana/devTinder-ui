import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name : "connection",
    initialState : null,
    reducers : {
        addConnections : (state, action) => action.payload,
        clearConnections : (state, action) => null,
    }
});

export const {addConnections, clearConnections} = connectionSlice.actions;
export default connectionSlice.reducer;