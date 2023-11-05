import NavLink from "./NavLink"

export default function Navbar() {
    return <div
        className="h-full w-auto flex justify-between items-center  gap-4 text-white text-md ">
        <NavLink text={"Product"}/>
        <NavLink text={"About Us"}/>
        <NavLink text={"Pricing"}/>
        <NavLink text={"Help"}/>
    </div>
}