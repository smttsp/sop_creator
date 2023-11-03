// auth-slice.js
"use client"
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    isAuth: false,
    name: "beki",
    imageUrl: "",
    userId: ""
  }
};

export const auth = createSlice({
  name: "auth",
  initialState, // Corrected the variable name here
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action) => {
      return {
        value: {
          isAuth: true,
          name: action.payload.name,
          imageUrl: action.payload.image,
          userId: ""
        }
      };
    }
  }
});

export const { logIn, logOut } = auth.actions; // Corrected 'auth.action' to 'auth.actions'
export default auth.reducer;
