// src/components/Navbar.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { isAuthenticated } from "../utils/api";

const Navbar = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "#categories" },
    { name: "Facility", href: "#facilities" },
    { name: "Gym", href: "gyms" },
    { name: "About Us", href: "#about" },
    { name: "Team", href: "#team" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-black z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              className="w-[50px] h-[50px]"
              src="/WhatsApp_Image_2025-12-02_at_12.46.28_PM-removebg-preview.png"
              alt=""
            />
            <span className="text-white text-2xl font-bold tracking-wider">
              SportSphere
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <button
                  key={link.name}
                  onClick={() => navigate(link.href)}
                  className="text-white hover:text-[#E9622b] transition duration-300 bg-transparent border-none cursor-pointer"
                >
                  {link.name}
                </button>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-[#E9622b] transition duration-300"
                >
                  {link.name}
                </a>
              )
            ))}
          </div>
          <div className="flex items-center space-x-4">
            {authenticated ? (
              <button 
                onClick={() => navigate("/profile")}
                className="px-4 py-2 text-white bg-[#E9622b] hover:bg-opacity-90 rounded-lg transition duration-300"
              >
                Profile
              </button>
            ) : (
              <>
                <button 
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-white bg-[#E9622b] hover:bg-opacity-90 rounded-lg transition duration-300"
                >
                  Log in
                </button>
                <button 
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 text-[#E9622b] border-2 border-[#E9622b] hover:bg-[#E9622b] hover:text-white rounded-lg transition duration-300"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
