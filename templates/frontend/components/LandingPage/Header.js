'use client'
import Logo from "./Logo"
import Navbar from "./Navbar"
import Auth from "./Auth"
import Profile from "../Header/Profile";
import {useSession} from "next-auth/react";
import {useAppSelector} from "@/redux/store";
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {logIn} from "@/redux/features/auth-slice";
const Header=()=>{
    const [user, setUser] = useState({});
    const {data: session} = useSession();
    const authReducerValue = useAppSelector((state) => state.authReducer.value);
    const dispatch = useDispatch();

    useEffect(() => {
        if (session && !user.isAuth) {
            dispatch(logIn({name: session.user.name, image: session.user.image}));
        }
    }, [session, user]);

    useEffect(() => {
        setUser(authReducerValue);
    }, [authReducerValue]);

    return (<div className="flexBetween bg-white max-container padding-container relative z-30 py-5 px-6">
        <Logo/>
        <Navbar/>
        {!user.isAuth && <Auth/>}
        {user.isAuth && (<Profile user={user}/>)}
    </div>)

}
export default Header

