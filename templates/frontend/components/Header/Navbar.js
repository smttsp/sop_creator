import NavLink from "./NavLink"

export default function Navbar(){
    return <div className="h-full w-auto flex gap-2 text-white text-md font-semibold">
                      
                      <NavLink text={"Product"}/>
                      <NavLink text={"About Us"}/>
                      <NavLink text={"Pricing"}/>
                      <NavLink text={"Help"}/>
    </div>
}