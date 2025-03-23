import { createSlice } from "@reduxjs/toolkit"

const authSlice =  createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setCredentials: ( state, action) => {
            const { access } = action.payload
            // Save the percistend user acces token and 
            // Refresh token

            // state.user = user
            state.token = access
        },
        logOut: ( state, action) => {
            // state.user = null
            state.token = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer

// export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token