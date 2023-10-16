import { createSlice, current } from '@reduxjs/toolkit';



const AdminSlice = createSlice({
    name: "Admin",
    initialState: {
        isLogin: false,
        email: "",
        password: "",
        name: "",
        groups: [],
        total_earning:0,
        group_id: [],
        _id:''
    },
    reducers: {
        setAdmin: (state, action) => {
            state.isLogin = true
            state.email = action.payload.email
            state.password = action.payload.password
            state.name = action.payload.name
            state._id = action.payload._id,
            state.groups= action.payload?.groups
            // console.log(current(state))
        },
        setLogin: (state) => {
            state.isLogin = !state.isLogin
            // console.log(current(state))
        },
        AddGroupToReducer: (state, action) => {
            state.groups = [...state.groups, action.payload]            
        }
    }
})


export const {setAdmin, setLogin, AddGroupToReducer } = AdminSlice.actions
export default AdminSlice.reducer