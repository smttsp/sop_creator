import React from 'react';

export default function ButtonSubmit(props) {
  return (
    <div className="flex">
      <button
        className="bg-purple-900 w-16 flex-auto hover:bg-purple-600 text-white font-semibold py-2 px-4 rounde-lg shadow-md"
        onClick={props.onClick} 
      >
        {props.text}
      </button>
    </div>
  );
}
