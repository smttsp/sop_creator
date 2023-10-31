import Logo from "./Logo"
import Navbar from "./Navbar"
import Profile from "./Profile"
import SignParent from "./SignParent"
export default function Header(){
    return <div className="bg-purple-900 font-roboto flex justify-between items-center py-1 px-4
     w-full h-16 pd-y-2 pd-x-6 ">
        
            <Logo/>
            <Navbar/>
            <SignParent/>
            <Profile/>
        </div>
}

