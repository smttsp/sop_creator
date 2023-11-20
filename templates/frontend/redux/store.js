"use client"
import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/auth-slice'
import recommendReducer from './features/recommend-slice'
import {useSelector} from 'react-redux';

export const store = configureStore({
    reducer: {
        authReducer,
        data: recommendReducer,

    }
});

export const useAppSelector = useSelector
