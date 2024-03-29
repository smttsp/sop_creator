import React, {useState} from 'react';
import Image from 'next/image';
import Input from './Input';
import Brand from './Brand';
import Link from 'next/link';
import SignWith from '../Authentication/AuthMain';

const SignInForm = ({onClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        onClose();
    };

    return (
        <div className='fixed z-30 top-24 right-16 w-96 h-3/4'>
            <div
                className='absolute bg-blue-900 rounded-xl  w-full -right-1 -bottom-1'>

            </div>
            <div
                className="overflow-scroll relative  w-full p-4 bg-gray-50
                           shadow-xl shadow-blue-900 text-black rounded-xl px-6"
            >
                <button className="absolute text-sm top-2 right-2" onClick={onClose}>
                    <Image src={"close-bold.svg"} alt="close image" width={20} height={20}/>
                </button>
                <Brand/>
                {/* <div className="mb-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        lable="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <Input
                        type="password"
                        placeholder="Password"
                        lable="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div> */}
                {/* <>
                    <Link href="/#"
                          className="text-purple-900 text-md font-medium hover:text-gray-800  my-8">
                        Forgot password?
                    </Link>
                </> */}
                {/* <div className='flex justify-center'>
                    <button
                        className="bg-gradient-to-br from-purple-800 to-purple-300 h-12 w-1/2 my-8
                                   rounded-sm shadow-2xl hover:bg-white hover:text-gray-500 active:text-gray-800
                                   transition duration-300 ease-in-out active:bg-slate-300"
                        onClick={handleSignIn}
                    >
                        Sign In
                    </button>
                </div> */}
                <SignWith/>
            </div>
        </div>
    );
};

export default SignInForm;
