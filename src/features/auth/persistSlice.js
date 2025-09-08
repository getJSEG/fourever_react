import { createSlice } from "@reduxjs/toolkit"

const persistSlice =  createSlice({
    name: 'persist',
    initialState: { persist:false },
    reducers: {
        setPersist: ( state, action) => {
            console.log("this is inside persistSlice: ",action)
            const { persist  } = action.payload
            // Save the percistend user acces token and 
            // Refresh token
            state.persist = persist
        }
    },
})

export const { setPersist } = persistSlice.actions
export default persistSlice.reducer

export const selectPersist = (state) => state.persist.persist
// export const selectCurrentToken = (state) => state.auth.token