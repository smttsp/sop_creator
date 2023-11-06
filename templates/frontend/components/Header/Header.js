import Logo from "./Logo";
import Navbar from "./Navbar";
import Profile from "./Profile";
import {useSession} from "next-auth/react";
import SignParent from "./SignParent";
import {useAppSelector} from "@/redux/store";
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {logIn} from "@/redux/features/auth-slice";

export default function Header() {
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

    return (
        <div
            className="bg-purple-900 font-roboto flex justify-between items-center py-1 px-4 w-full h-16 pd-y-2 pd-x-6">
            <Logo/>
            <Navbar/>
            {!user.isAuth && <SignParent/>}
            {user.isAuth && (<Profile user={user}/>)}
        </div>
    );
}
