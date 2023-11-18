import {useEffect} from "react";
import {signOut, useSession} from "next-auth/react";
import {logOut} from "@/redux/features/auth-slice";
import {useDispatch} from 'react-redux';
import Image from "next/image";

export default function ({userName, profileImage, closeDetail}) {
    const {data: session} = useSession()
    const dispatch = useDispatch()

    const handleLogOut = () => {
        signOut()
        useEffect(() => {
            dispatch(logOut({}))

        }, [session])

    }

    return (
        <div
            className="absolute top-24 right-8 z-30 bg-gray-200  bg-opacity-10 overflow-hidden shadow-xl shadow-gray-850 w-64 rounded-lg text-gray-850 px-2 py-4">
            <button className="absolute top-1 right-1"
                    onClick={() => closeDetail()}>
                <Image src="close-bold.svg"
                       height={20}
                       width={20}
                />
            </button>
            <div className="flex justify-center my-2 gap-2">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                    <Image src={profileImage}
                           alt="profile"
                           className="object-cover w-full h-full"
                           width={30}
                           height={30}
                    />
                </div>
                <div>
                    <p>{userName}</p>
                </div>
            </div>
            <div className="ml-3 mt-4">
                <button
                    className="py-auto w-48 rounded-lg hover:bg-gray-500 bg-gray-200 h-8 active:bg-gray-700"
                    onClick={handleLogOut}>
                    <p className="hover:bg-opacity-5"> Sign Out</p>
                </button>
            </div>

        </div>
    )
}
