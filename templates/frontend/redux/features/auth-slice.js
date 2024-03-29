"use client"
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    value: {
        isAuth: false,
        name: "beki",
        imageUrl: "",
        session:{},
       
    }
};

export const auth = createSlice({
    name: "auth",
    initialState,
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
                    session:action.payload.session,
                   
                }
            };
        }
    }
});

export const {logIn, logOut} = auth.actions;
export default auth.reducer;
