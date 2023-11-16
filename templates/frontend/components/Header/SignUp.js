import React, {useState} from 'react';
import Image from 'next/image';
import Input from './Input';
import Brand from './Brand';
import Link from 'next/link';

const SignUpForm = ({onClose}) => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('')
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [phoneNoError, setPhoneNoError] = useState('')
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordMismatchError, setPasswordMistamtchError] = useState('')
    const handleSignUp = () => {
        setNameError(false)
        setEmailError(false)
        setPhoneNoError(false)
        setPasswordError(false)
        setPasswordMistamtchError(false)
        if (!name) {
            setNameError(true)
        } else if (!email) {
            setEmailError(true)
        } else if (!phoneNo) {
            setPhoneNoError(true)
        } else if (!password) {
            setPasswordError(true)
        } else if (password !== validPassword) {
            setPasswordMistamtchError(true)
        } else {
            onClose()
        }

    };

    return (
        <div className=" fixed shadow-xl top-24 font-roboto right-16 w-96 z-30 h-3/4">
            <div
                className="absolute bg-yellow-400  shadow-xl rounded-xl h-full w-full -right-5 -bottom-5">

            </div>
            <div
                className="overflow-scroll w-full h-full relative p-4 bg-gray-50 shadow-xl shadow-yellow-400 text-black rounded-xl px-6">
                <button className="absolute text-sm top-2 right-2 text-black" onClick={onClose}>
                    <Image src={"close-bold.svg"} alt="close image" width={20} height={20}/>
                </button>
                <Brand/>
                <div className="mb-4">
                    <Input
                        type="name"
                        placeholder="Full Name"
                        lable="Full Name*"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {nameError && <p className='input-error'>you need to insert you Name</p>}
                </div>
                <div className="mb-4">
                    <Input
                        type="address"
                        placeholder="Address"
                        lable="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        lable="Email*"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className='input-error'>you need to insert you Email</p>}
                </div>
                <div className="mb-4">
                    <Input
                        type="phone"
                        placeholder="Phone number"
                        lable="Phone Number*"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                    />
                    {phoneNoError &&
                        <p className='input-error'>you need to insert you Phone number</p>}
                </div>
                <div className="mb-4">
                    <Input
                        type="password"
                        placeholder="Password"
                        lable="Password*"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <p className='input-error'>you need to create Password</p>}
                </div>
                <div className="mb-4">
                    <Input
                        type="vallidpassword"
                        placeholder="Validate Password"
                        lable="Validate Password*"
                        value={validPassword}
                        onChange={(e) => setValidPassword(e.target.value)}
                    />
                    {passwordMismatchError &&
                        <p className='input-error'>insert similar password</p>}
                </div>
                <>
                    <Link href="/#"
                          className="text-purple-900 text-md font-medium hover:text-gray-800  my-8">
                        Sign In
                    </Link>
                </>
                <div className='flex justify-center'>
                    <button
                        className="bg-gradient-to-br from-purple-800 to-purple-300 h-12 w-1/2 my-8
        rounded-sm shadow-2xl hover:bg-white hover:text-gray-500 active:text-gray-800
        transition duration-300 ease-in-out active:bg-slate-300"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
