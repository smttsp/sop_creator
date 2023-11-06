import React, { useState } from 'react';
import ProductList from './ProductList';
import NavLink from './NavLink';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="h-full w-auto flex justify-between items-center gap-4 text-white text-md">
      <NavLink text="Product" link="/#" onClick={handleDropdownToggle} />
      <NavLink text="About Us" link="/#" />
      <NavLink text="Pricing" link="/#" />
      <NavLink text="Help" link="/#" />
      <ProductList isOpen={isDropdownOpen} onToggle={handleDropdownToggle} />
    </div>
  );
}
