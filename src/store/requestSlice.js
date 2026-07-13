import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    clearRequest : (state, action) => {
        const newArray = state.filter((r) => r._id !== action.payload);
        return newArray;
    }
  },
});

export const { addRequests, clearRequest } = requestSlice.actions;
export default requestSlice.reducer;
