// src/components/FacilityHub.jsx
import React from "react";
import { motion } from "framer-motion";
import { Icons } from "./Icons";

// رابط وهمي لمنع التنقل الفعلي
export const MockLink = ({ children, className }) => (
  <a href="#" onClick={(e) => e.preventDefault()} className={className}>
    {children}
  </a>
);

// شريط التنقل
export const Navbar = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 shadow-lg backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      <div className="text-3xl font-extrabold text-[#E9622b]">BookEase</div>
      <nav className="hidden md:flex space-x-8 text-white">
        <MockLink className="hover:text-[#E9622b] transition duration-300">
          الرئيسية
        </MockLink>
        <MockLink className="hover:text-[#E9622b] transition duration-300">
          الصالات
        </MockLink>
        <MockLink className="hover:text-[#E9622b] transition duration-300">
          المنشآت
        </MockLink>
      </nav>
      <button className="bg-[#E9622b] text-white px-4 py-1 rounded-full hover:bg-opacity-80 transition">
        تسجيل الدخول
      </button>
    </div>
  </header>
);

export const Footer = () => (
  <footer className="bg-gray-900 text-white py-6">
    <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
      &copy; {new Date().getFullYear()} BookEase Sports. جميع الحقوق محفوظة.
    </div>
  </footer>
);

export const AmenityCard = ({ icon: Icon, label }) => (
  <motion.div
    className="flex items-center space-x-2 p-3 bg-gray-800 rounded-lg"
    whileHover={{ scale: 1.05, backgroundColor: "#262626" }}
  >
    <Icon className="text-[#E9622b] text-lg flex-shrink-0" />
    <span className="text-sm text-gray-300">{label}</span>
  </motion.div>
);

export const GeneralAmenities = ({
  complex,
  complexAmenities,
  itemVariants,
}) => (
  <motion.div
    variants={itemVariants}
    className="bg-white bg-opacity-5 p-6 rounded-xl shadow-xl"
    whileHover={{
      scale: 1.02,
      boxShadow: "0 10px 15px rgba(233, 98, 43, 0.2)",
    }}
  >
    <h2 className="text-xl font-bold mb-4 text-white flex items-center">
      <Icons.Clock className="w-5 h-5 ml-2 text-[#E9622b]" /> ساعات العمل
    </h2>
    <p className="text-2xl font-extrabold text-[#E9622b] mb-6">
      {complex.workingHours}
    </p>

    <h2 className="text-xl font-bold mb-4 text-white flex items-center">
      <Icons.Home className="w-5 h-5 ml-2 text-[#E9622b]" /> ميزات المجمع العامة
    </h2>
    <div className="grid grid-cols-2 gap-4">
      {complexAmenities.map((amenity, index) => (
        <AmenityCard key={index} icon={amenity.icon} label={amenity.label} />
      ))}
    </div>
  </motion.div>
);
