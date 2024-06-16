import {configureStore} from '@reduxjs/toolkit'
import authSlice from './reducers/auth';
import api from './api/api';
import miscSlice from './reducers/misc.js';
import chatSlice from './reducers/chat.js';


const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [api.reducerPath]: api.reducer,
    [chatSlice.name]: chatSlice.reducer,
  },
  middleware: (mid) => [...mid(), api.middleware],
})

export default store;
