import { createSlice } from '@reduxjs/toolkit';

const countSlice = createSlice({
    name: "count",
    initialState: { count: 1 },
    reducers: {
        increaseCount: (state, action) => {
            state.count = state.count + action.payload; // Access 'count' from 'state'
        }
    }
});

export const { increaseCount } = countSlice.actions;
export default countSlice.reducer;
