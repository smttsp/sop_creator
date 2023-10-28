import Logo from "./Logo"
import Navbar from "./Navbar"
import Profile from "./Profile"
export default function Header(){
    return <div className="bg-purple-900 flex justify-between py-1 px-4
     w-full h-12 pd-y-2 pd-x-6 row-span-1">
        
            <Logo/>
            <Navbar/>
            <Profile/>
     </div>
}

