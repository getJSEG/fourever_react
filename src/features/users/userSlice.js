import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: { username:'', firstName:'', lastName:'', avatar:''},
    reducers: {
        setProfile: (state, action) => {
            const { username, first_name, last_name, avatar} = action.payload;

            state.username = username
            state.firstName = first_name
            state.lastName = last_name
            state.avatar = avatar
        }
    }
})

export const { setProfile } = userSlice.actions

export const selectUsername = (state) => state.user.username
export const selectFirstName = (state) => state.user.firstName
export const selectLastName = (state) => state.user.lastName
export const selectAvatar = (state) => state.user.avatar

export default userSlice.reducer