import { useState } from "react";
import NavLink from "./NavLink"
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
export default function SignParent(){
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false)
    const toggleSignIn = () => {
        setShowSignIn(!showSignIn);
        if (showSignUp){
            setShowSignUp(!showSignUp)
        }
      };
    const toggleSignUp = () =>{
        setShowSignUp(!showSignUp)
        if (showSignIn){
            setShowSignIn(!showSignIn)
        }
    }
    return <div className="h-full w-auto flex justify-between items-center gap-6 text-white text-md font-semibold">
                      
                      <NavLink text={"Sign In"} onClick={toggleSignIn}/>
                      <NavLink text={"Sign Up"} onClick={toggleSignUp}/>
                      {showSignIn && <SignInForm onClose={toggleSignIn}/>}
                      {showSignUp && <SignUpForm onClose={toggleSignUp}/>}
                      
    </div>
}




