import { createSlice } from '@reduxjs/toolkit'

export const querySlice = createSlice({
    name: "query",
    initialState: {
      query: {},
      sortState: ""
    },
    reducers: {
        filter: (state, action) => {
            state.query = {
                ...state.query,
                ...action.payload
            };
        },
        resetFilter: (state) => {
            state.query = {
                model: "",
                brand: "",
                year: "",
                part: "",
                partDetailFR: "",
                partDetailLR: "",
                bestSeller: false,
                onSale: false
            };
        },
        sortByPrice: (state, action) => {
            state.sortState = action.payload;
        },
        filterOnly: (state, action) => {
            state.query = { 
                model: "",
                brand: "",
                year: "",
                part: "",
                partDetailFR: "",
                partDetailLR: "",
                bestSeller: false,
                onSale: false,
                ...action.payload
            }
        }
    },
  })
  
  export const { filter, resetFilter, sortByPrice, filterOnly } = querySlice.actions;
  
  export const queryReducer = querySlice.reducer;
