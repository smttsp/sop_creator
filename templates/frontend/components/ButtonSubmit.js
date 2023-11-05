import React from 'react';

export default function ButtonSubmit(props) {
    return (
        <div className="flex mt-2 w-1/2 ">
            <button
                className={`bg-purple-900 flex-auto hover:bg-purple-600 text-white font-semibold py-2 px-4 rounde-2xl shadow-xl first-letter ${props.customClass}`}
                onClick={props.onClick} > {props.text}
            </button>
        </div>
    );
}
