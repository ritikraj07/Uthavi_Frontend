import { createSlice, current } from '@reduxjs/toolkit';



const BaseUrlSlice = createSlice({
    name: "BaseUrl",
    initialState: {
        url: 'https://weary-ray-lab-coat.cyclic.app/'
    },
    reducers: {

    }
})


export const { } = BaseUrlSlice.actions
export default BaseUrlSlice.reducer