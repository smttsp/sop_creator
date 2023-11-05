import {signOut, useSession} from 'next-auth/react';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {logOut} from '@/redux/features/auth-slice';
import Image from "next/image"

export default function Profile({user}) {
    const {data: session} = useSession();
    const dispatch = useDispatch()

    useEffect(() => {
        if (!session) {
            dispatch(logOut({}))
        }
    }, [session, dispatch]);
    return <div className="flex gap-2 ">
        <div className="bg-white h-full my-auto text-black">
            <p>{user.name}</p>
            <button className=" hover:text-gray-700 hover:font-semibold active:text-gray-900"
                    onClick={() => signOut()}>Sign out
            </button>
        </div>
        <div className="h-12 w-12 rounded-full overflow-hidden bg-white ">
            <Image src={user.imageUrl}
                   alt="profile"
                   className="object-cover w-full h-full"
                   width={20}
                   height={20}
            />
        </div>
    </div>
}
