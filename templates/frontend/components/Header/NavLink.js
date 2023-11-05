import Link from "next/link"

export default function NavLink(props) {
    return <div>
        <Link href="#"
              className="text-gray-50  hover:text-gray-400  active:text-gray-600 hover:font-semibold
              active:font-semibold tracking-widest text-md transition duration-300 ease-in-out"
              onClick={props.onClick}>{props.text}
        </Link>
    </div>
}
