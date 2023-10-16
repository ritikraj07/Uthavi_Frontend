import { createSlice, current } from '@reduxjs/toolkit';

const GroupSlice = createSlice({
    name: "Group",
    initialState: {
        admin_id: "",
        members_id: [],
        duration: 0,
        earning: 0,
        winner_list: [],
        intrest_rate: 0,
        name:"",
        amount: 0,
        createdAt: "",
        updatedAt:'',
        _id:""
    },
    reducers: {
        setGroup: (state, action) => {
            console.log("setGroup start")
            state.admin_id = action.payload?.admin_id
            state.members_id = action.payload?.members_id
            state.amount = action.payload?.amount
            state.earning = action.payload?.earning
            state.winner_list = action.payload?.winner_list
            state.intrest_rate = action.payload?.intrest_rate
            state.name = action.payload?.name
            state.amount = action.payload?.amount
            state.createdAt = action.payload?.createdAt
            state.duration = action.payload?.duration
            state._id = action.payload?._id
            state.updatedAt = action.payload?.updatedAt
            console.log("setGroup End")
            console.log("group reducer======>" ,current(state))
        },

        Add_Winner_to_Group: (state, action) => {
            
            state.winner_list = action.payload
            console.log("group reducer======>", current(state))
        }


    }
})

export const { setGroup, Add_Winner_to_Group} = GroupSlice.actions

export default GroupSlice.reducer