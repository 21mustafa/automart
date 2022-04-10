import { createSlice } from '@reduxjs/toolkit'

export const popupSlice = createSlice({
    name: "popup",
    initialState: {
      showID: -1
    },
    reducers: {
        showPopup: (state, action) => {
            state.showID = action.payload;
        }, 
        hidePopup: (state) => {
            state.showID = -1;
        }
    },
  });
  
  export const { showPopup, hidePopup } = popupSlice.actions;
  
  export const popupReducer = popupSlice.reducer;
