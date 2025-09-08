import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: { username:'', firstName:'', lastName:'', avatar:'', superUser:false, isStaff: false, locationAssigned: false, locationId: ""},
    reducers: {
        setProfile: (state, action) => {
            const { username, first_name, last_name, avatar, is_superuser, is_staff, location} = action.payload;

            state.username = username
            state.firstName = first_name
            state.lastName = last_name
            state.avatar = avatar
            state.superUser = is_superuser
            state.isStaff = is_staff
            state.locationAssigned = location !== null ? true : false
            state.locationId = location
        }
    }
})

export const { setProfile } = userSlice.actions

export const selectUsername = (state) => state.user.username
export const selectFirstName = (state) => state.user.firstName
export const selectLastName = (state) => state.user.lastName
export const selectAvatar = (state) => state.user.avatar
export const selectIsSuperUser = (state) => state.user.superUser
export const selectIslocationAssigned = (state) =>  state.user.locationAssigned
export const selectLocationId = (state) =>  state.user.locationId

export default userSlice.reducer