export default function NavLink(props){
    return <div>
        <a href="#" className="text-white hover:underline hover:text-blue-700 
                            transition duration-300 ease-in-out">

            {props.text}

        </a>

    </div>
}