import { configureStore } from '@reduxjs/toolkit';
import contentReducer from '../features/nav/navSlice';
import popupReducer from '../features/popup/popupSlice';

export const store = configureStore({
  reducer: {
    content: contentReducer,
    popup: popupReducer,
  },
});
