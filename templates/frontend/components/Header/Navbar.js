'use client'
import { useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { href: '/', key: 'home', label: 'Home' },
  { href: '/resume', key: 'services', label: 'Product' },
  { href: '/how_hilink_work', key: 'How_Builder_Work', label: 'How Builder Work?' },
  { href: '/pricing', key: 'pricing', label: 'Pricing' },
  { href: '/contact_us', key: 'contact_us', label: 'Contact Us' },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (key) => {
    setActiveLink(key);

    // Redirect to "/resume" when the "Product" link is clicked
    if (key === 'services') {
      redirect("/resume");
    }
  };

  return (
    <ul className="h-full gap-10 md:flex">
      {NAV_LINKS.map((link) => (
        <li key={link.key} className="regular-16 text-gray-850 font-semibold text-shadow-lg flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
          <Link href={link.href}>
            <motion.span
              onClick={() => handleLinkClick(link.key)}
              whileHover={{ borderBottom: "2px solid #4caf50", transition: { duration: 0.75} }}
              style={{ borderBottom: activeLink === link.key ? "2px solid #4caf50" : "none" }}
            >
              {link.label}
            </motion.span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;