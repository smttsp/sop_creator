"use client"
import {useEffect} from 'react';
import {signIn, useSession} from 'next-auth/react';
import {useDispatch} from 'react-redux';
import {logIn} from '@/redux/features/auth-slice';
import Image from 'next/image';


export default function SignWith() {
    const {data: session} = useSession();
    const dispatch = useDispatch()

    useEffect(() => {
        if (session) {
            dispatch(logIn({name: session.user.name, image: session.user.image}))
        }
    }, [session, dispatch]);

    const handleLinkedInSignIn = () => {
        signIn('linkedin');

    };

    const handleGoogleSignIn = () => {
        signIn('google');
    };

    return (
        <div className="flex justify-center">
            {!session && (
                <div>
                    <div className="font-light mx-auto my-2">
                        <p>Continue with</p>
                    </div>
                    <div className="flex gap-8">
                        <button
                            className="shadow-xl hover:bg-gray-200 active:bg-slate-500"
                            onClick={handleGoogleSignIn}
                        >
                            <Image
                                className="hover:shadow-lg hover:shadow-gray-800 rounded-lg active:shadow-black"
                                src="/google-sign.webp"
                                alt="googleauth image"
                                width={30}
                                height={30}
                            />
                        </button>
                        <button
                            className="shadow-xl hover:bg-gray-200 active:bg-slate-500"
                            onClick={handleLinkedInSignIn}
                        >
                            <Image
                                className="hover:shadow-lg hover:shadow-gray-800 rounded-lg active:shadow-black"
                                src="/linkedin-sign.png"
                                alt="linkedin image"
                                width={30}
                                height={30}
                            />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

