"use client"
export default function Button(props){
    return (
        <div>
            <button 
            onClick = {props.onClick}
            className={` active:bg-gray-700 ${props.customClass}`  }>
                {props.text}
            </button>
        </div>

    );

}