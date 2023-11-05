const Input = (props) => {
    return (

        <div className="relative mt-8 text-sm text-gray-800">
            <input type={props.type} id={props.id} value={props.value} onChange={props.onChange}
                   name={props.name} placeholder={props.placeholder}
                   className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 text-sm
                   font-light placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                   autocomplete="NA"/>
            <label
                className="pointer-events-none font-md absolute top-0 left-0 origin-left
                -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all
                duration-100 ease-in-out peer-placeholder-shown:top-1/2
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-700">
                {props.lable}
            </label>
        </div>
    )
}

export default Input
