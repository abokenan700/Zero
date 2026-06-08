import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type AuthState = {isAuthenticated: boolean; phone?: string; hasLocation: boolean};

const initialState: AuthState = {isAuthenticated: false, hasLocation: false};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLocationGranted: state => {
      state.hasLocation = true;
    },
    signIn: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.phone = action.payload;
    },
    signOut: state => {
      state.isAuthenticated = false;
      state.phone = undefined;
    },
  },
});

export const {setLocationGranted, signIn, signOut} = authSlice.actions;
