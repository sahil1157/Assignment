import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import BG_web3 from '../assets/images/bg-web3.jpg';
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Career', path: '/career' },
  ];

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <div
      className='w-full relative h-[200px] bg-cover bg-center'
      style={{ backgroundImage: `url(${BG_web3})` }}
    >
      <div className="absolute w-full inset-0 flex items-center justify-between px-8">
        {/* Left side with Home link */}
        <div className="bg-black bg-opacity-70 p-4 mx-auto rounded-md flex items-center justify-between w-[70%]">
          <Link
            to={navItems[0].path}
            onClick={() => setActiveLink(navItems[0].path)}
            className={`text-white py-2 px-4 transition duration-300 ease-in-out font-ubuntu hover:scale-105`}
          >
            {navItems[0].name}
            {activeLink === navItems[0].path && (
              <div className="h-[2px] bg-white mt-1 transition-transform duration-300 ease-in-out transform scale-x-100" />
            )}
          </Link>

          {/* Full nav items for larger screens */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setActiveLink(item.path)}
                className={`text-white py-2 px-4 transition duration-300 ease-in-out font-ubuntu hover:scale-105`}
              >
                {item.name}
                {activeLink === item.path && (
                  <div className="h-[2px] bg-white mt-1 transition-transform duration-300 ease-in-out transform scale-x-100" />
                )}
              </Link>
            ))}
            <Link to='/admin'>
              <button
                className={`px-4 py-[6px] ${location.pathname === "/admin" ? "bg-blue-700" : "bg-red-500"} text-white rounded-md`}
              >
                Admin
              </button>
            </Link>
          </div>

          {/* Hamburger menu for smaller screens */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white text-2xl focus:outline-none"
            >
              <GiHamburgerMenu />
            </button>

            {/* Dropdown for mobile menu */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} bg-black bg-opacity-70 p-4 absolute top-[60px] right-8 rounded-md`}>
              <div className="flex flex-col space-y-4">
                {navItems.slice(1).map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => {
                      setActiveLink(item.path);
                      setIsMenuOpen(false); // Close menu after click
                    }}
                    className={`text-white py-2 px-4 transition duration-300 ease-in-out font-ubuntu hover:scale-105`}
                  >
                    {item.name}
                    {activeLink === item.path && (
                      <div className="h-[2px] bg-white mt-1 transition-transform duration-300 ease-in-out transform scale-x-100" />
                    )}
                  </Link>
                ))}
                <Link to='/admin'>
                  <button
                    className={`px-4 py-[6px] ${
                      location.pathname === "/admin" ? "bg-blue-700" : "bg-red-500"
                    } text-white rounded-md`}
                  >
                    Admin
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
