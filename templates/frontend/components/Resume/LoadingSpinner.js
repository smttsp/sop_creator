import React from "react";

const LoadingSpinner = ({customClass}) => {
    return (
        <div className="flex mx-auto justify-center items-center h-full">
            <div
                className={`${customClass} border-t-4 border-purple-900 border-solid rounded-full animate-spin`}></div>
        </div>
    );
};

export default LoadingSpinner;
