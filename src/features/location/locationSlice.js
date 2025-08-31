import { createSlice } from "@reduxjs/toolkit"

const locationSlice =  createSlice({
    name: 'location',
    initialState: { isPreTax:"", tax: "", address: "", storeNumber:"" },
    reducers: {
        setStoreInfo: ( state, action) => {
            const { tax, city, country, department, address, isPreTax, storeNumber } = action.payload
        
            state.tax = tax
            state.isPreTax = isPreTax
            state.address = `${address}, ${city} ${department}, ${country}`
            state.storeNumber = storeNumber
        }
    },
})

export const { setStoreInfo } = locationSlice.actions

// Getting just the tax infor here
export const selectStoreTax = (state) => state.location.tax
export const selectIsPreTax = (state) => state.location.isPreTax
export const selectAddress = (state) => state.location.address
export const selectStoreNumber = (state) => state.location.storeNumber

export default locationSlice.reducer;