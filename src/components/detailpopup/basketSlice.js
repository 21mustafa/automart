import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
    name: "basket",
    initialState: {
      items: [],
    },
    reducers: {
        addItem: (state, action) => {
            const basketInfo = action.payload;
            const index = state.items.findIndex(i => i.id === basketInfo.id);
            if (index === -1) {
                state.items = [
                    ...state.items, 
                    {
                        id: basketInfo.id,
                        count: basketInfo.count  
                    }
                ];
            } else {
                state.items[index] = {
                    id: basketInfo.id,
                    count: basketInfo.count
                };
            }
            
        }, 
        removeItem: (state, action) => {
            const index = state.items.findIndex(i => i.id === action.payload);
            const newState = [...state.items];
            newState.splice(index, 1);
            state.items = newState;
        },

    },
  });
  
  export const { addItem, removeItem } = basketSlice.actions;
  
  export const basketReducer = basketSlice.reducer;
