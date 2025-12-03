

import React from "react";
import {
  FaStar,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#000000] text-white pt-10 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-800 pb-8">
          <div className="col-span-2 md:col-span-2">
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
            <p className="text-sm text-[#D3D3D3] mb-4">
              Your trusted platform for finding and booking sports fields
              anytime. Browse available venues, check schedules, and reserve
              your spot in seconds. Easy, fast, and organized — made for every
              player and every game. Play the way you want, whenever you want.
            </p>
            <div className="mt-4">
              <div className="w-20 h-20 bg-[#E9622b] rounded-full flex items-center justify-center text-sm font-bold">
                Certified
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-[#D3D3D3]">
              <li>
                <a href="#home" className="hover:text-[#E9622b]">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#E9622b]">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E9622b]">
                  For Players
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#E9622b]">
                  For Businesses
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-[#D3D3D3]">
              <li>Email</li>
              <li>Phone</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-[#D3D3D3]">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Cookies Consent</li>
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <h4 className="font-semibold text-white mb-4">Stay In The Loop</h4>
          <div className="flex items-center mb-4 max-w-sm">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-l-md text-white placeholder-[#D3D3D3] focus:outline-none"
            />
            <button className="px-4 py-2 bg-[#E9622b] rounded-r-md hover:bg-opacity-90 transition duration-300">
              &rarr;
            </button>
          </div>
          <p className="text-sm text-[#D3D3D3] mb-4">
            Join our newsletter to stay up to date on features and releases.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-[#E9622b] transition"
            >
              <FaFacebookF className="text-white" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-[#E9622b] transition"
            >
              <FaInstagram className="text-white" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-[#E9622b] transition"
            >
              <FaYoutube className="text-white" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-[#E9622b] transition"
            >
              <FaTwitter className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
