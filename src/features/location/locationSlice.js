import { createSlice } from "@reduxjs/toolkit"

const locationSlice =  createSlice({
    name: 'location',
    initialState: { isPreTax:null, tax: null, address: null },
    reducers: {
        setStoreInfo: ( state, action) => {
            const { local_tax, city, country, department, address, pre_tax_items } = action.payload

            state.tax = local_tax
            state.isPreTax = pre_tax_items
            state.address = address + city + department + country 
        }
    },
})

export const { setStoreInfo } = locationSlice.actions

// Getting just the tax infor here
export const selectStoreTax = (state) => state.location.tax
export const selectIsPreTax = (state) => state.location.isPreTax

export default locationSlice.reducer;