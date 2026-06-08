import {configureStore} from '@reduxjs/toolkit';
import {blinkitApi} from '@/services/blinkitApi';
import {authSlice} from './authSlice';
import {cartSlice} from './cartSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    [blinkitApi.reducerPath]: blinkitApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(blinkitApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
