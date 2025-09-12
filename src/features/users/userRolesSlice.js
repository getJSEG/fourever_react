import { createSlice } from "@reduxjs/toolkit";

const userRoleSlice = createSlice({
    name: 'userRoles',
    initialState: {roles:[]},
    reducers: {
        setUserRoles: (state, action) => {
            console.log(action);
            const {roles} = action.payload;
            state.roles = roles
        }
    }
})

export const { setUserRoles } = userRoleSlice.actions
export const selectRoles = (state) => state.userRoles.roles

export default userRoleSlice.reducer