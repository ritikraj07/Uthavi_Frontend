import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
    name: 'loading',
    initialState: { value: false },
    reducers: {
        setLoadingTrue: (state) => {
            state.value = true;
        },
        setLoadingFalse: (state) => {
            state.value = false;
        },
    },
});

export const { setLoadingFalse, setLoadingTrue } = loadingSlice.actions;

export default loadingSlice.reducer;