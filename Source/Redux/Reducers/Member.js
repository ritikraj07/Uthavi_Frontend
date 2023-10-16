import { createSlice, current } from '@reduxjs/toolkit';

const MemberSlice = createSlice({
    name: "Member",
    initialState: {
        members: []
    },
    reducers: {
        setMembers: (state, action) => {
            state.members = [...state.members, action.payload]
        },
        changeStatus: (state, action) => {
            let { month, _id, newStatus } = action.payload
            state.members = [...state.members.filter((member => {
                if (member._id == _id) {
                    let newM = member
                    newM.history[month] = !newStatus

                    return newM
                } else {
                    return member
                }
            }))]
            
        }, 
        resetMember: (state, action) => {
            console.log("\n  =====> \n" ,action.payload)
            state.members = [...action.payload]
            // console.log("member reducer======>", current(state))
        },
        clearMember: (state)=>{
            state.members = []
        }
    }
});

export const { setMembers, changeStatus, resetMember, clearMember} = MemberSlice.actions

export default MemberSlice.reducer
