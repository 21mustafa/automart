import { configureStore } from '@reduxjs/toolkit'
import { basketReducer } from '../components/detailpopup/basketSlice';
import { popupReducer } from '../components/detailpopup/popupSlice';
import { queryReducer } from '../query/querySlice';
import { dataReducer } from './dataSlice';

export default configureStore({
  reducer: {
    data: dataReducer,
    query: queryReducer,
    popup: popupReducer,
    basket: basketReducer
  },
});
