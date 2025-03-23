import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {  username:'', firstName:'', lastName:'', avatar:''},
    reducers: {
        setProfile: (state) => {
            const { username, firstName, lastName, avatar } = action.payload
            state.username = username
            state.firstName = firstName
            state.lastName = lastName
            state.avatar = avatar
        }
    }
})


export const { setProfile } = userSlice.actions

export default userSlice.reducer

export const selectUsername = (state) => state.user.username
export const selectFirstName = (state) => state.user.firstName
export const selectLastName = (state) => state.user.lastName
export const selectAvatar= (state) => state.user.avatar