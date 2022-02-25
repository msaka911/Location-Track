import { configureStore } from '@reduxjs/toolkit';

import mapSlice from './mapSlice';


const store = configureStore({
  reducer: {mapSlice}
});

export default store;