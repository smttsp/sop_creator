"use client"
export default function Button(props) {
    return (
        <div>
            <button
                onClick={props.onClick}
                className={`transition duration-300 ease-in-out ${props.customClass}`}>
                {props.text}
            </button>
        </div>
    );
}
