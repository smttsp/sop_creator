import Link from 'next/link';
import React from 'react';

function ProductList({isOpen, onToggle}) {
    return (
        <div
            className={`relative -left-48 z-10 bg- inline-block text-left ${isOpen ? 'block' : 'hidden'}`}>
            <div
                className="origin-top-right absolute right-0 w-32 rounded-md  bg-purple-700 text-md ring-opacity-5 mt-4"
                role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button"
                tabIndex="-1">
                <Link href="/coverletter"
                      className="block px-4 py-2 text-sm bg-opacity-0 text-white hover:bg-purple-800 hover:text-white hover:rounded-lg"
                      role="menuitem">
                    Cover Letter
                </Link>
                <a href="/"
                   className="block px-4 py-2 text-sm bg-opacity-0 text-white hover:bg-purple-800 hover:text-white hover:rounded-lg"
                   role="menuitem">
                    Key Word
                </a>
            </div>
        </div>
    );
}

export default ProductList;
