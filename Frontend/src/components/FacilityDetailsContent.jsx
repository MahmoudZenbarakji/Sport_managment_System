// src/components/FacilityDetailsContent.jsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaDollarSign,
  FaUsers,
  FaClock,
  FaLayerGroup,
  FaArrowLeft,
} from "react-icons/fa";

// 1. قاعدة بيانات وهمية لتفاصيل الملاعب (لتطبيق مبدأ الـ Props/Reusable Design)
const detailsData = {
  stadium1: {
    name: "ملعب الكامب نو المصغر",
    location: "دمشق، المزة",
    price: "25$/Hour",
    capacity: "10 Players (5v5)",
    surface: "Artificial Turf (عشب صناعي)",
    description:
      "ملعب عصري مزود بأفضل إضاءة ليلية وأرضية عشبية صناعية عالية الجودة، مثالي للتدريب والمباريات الصغيرة.",
    images: [
      "https://via.placeholder.com/800x600/E9622b/ffffff?text=Image+1",
      "https://via.placeholder.com/800x600/000000/ffffff?text=Image+2",
      "https://via.placeholder.com/800x600/D3D3D3/000000?text=Image+3",
    ],
    schedule: [
      { time: "10:00 - 12:00", status: "Booked" },
      { time: "12:00 - 14:00", status: "Available" },
      { time: "14:00 - 16:00", status: "Available" },
    ],
  },
  stadium2: {
    name: "صالة السلة المحترفة",
    location: "دبي، وسط المدينة",
    price: "30$/Hour",
    capacity: "20 Players (5v5 Full Court)",
    surface: "Hardwood (خشب صلب)",
    description: "صالة مغلقة مكيفة ومخصصة للتدريب على كرة السلة بمعايير دولية.",
    images: [
      "https://via.placeholder.com/800x600/000000/ffffff?text=B+Court+1",
      "https://via.placeholder.com/800x600/E9622b/ffffff?text=B+Court+2",
    ],
    schedule: [
      { time: "09:00 - 11:00", status: "Available" },
      { time: "11:00 - 13:00", status: "Booked" },
    ],
  },
};

const FacilityDetailsContent = () => {
  // نستخدم 'id' هنا بدلاً من 'type' لاسترجاع بيانات الملعب
  const { id } = useParams();
  const facility = detailsData[id.toLowerCase()];

  if (!facility) {
    return (
      <div className="p-20 text-white text-center text-3xl">
        Facility details not found.
      </div>
    );
  }

  // أنيميشن لدخول الصفحة
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3, // تأخير بسيط قبل بدء أنيميشن العناصر الداخلية
        staggerChildren: 0.2, // العناصر الداخلية تظهر بالتتابع
      },
    },
  };

  // أنيميشن للعناصر الداخلية (تفاصيل، صور)
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // اختيار صورة عشوائية لعرضها كصورة رئيسية لطيفة (عن طريق استخدام حالة محلية بسيطة أو دالة)
  const randomImage =
    facility.images[Math.floor(Math.random() * facility.images.length)];

  return (
    <motion.div
      className="p-8 md:p-12 lg:p-16 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* عنوان الصفحة وزر العودة */}
      <div className="flex justify-between items-center mb-10 border-b border-[#D3D3D3] pb-5">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-[#E9622b]"
          variants={itemVariants}
        >
          {facility.name}
        </motion.h1>
        <motion.button
          onClick={() => navigate(-1)} // ترجع للصفحة السابقة
          className="flex items-center text-white hover:text-[#E9622b] transition duration-300 border border-[#D3D3D3] p-3 rounded-lg"
          variants={itemVariants}
        >
          <FaArrowLeft className="mr-2" /> Back
        </motion.button>
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-10">
        {/* الجانب الأيسر: التفاصيل وجدول الحجز */}
        <motion.div className="lg:w-1/2 space-y-8" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
            Facility Details
          </h2>

          {/* معلومات التفاصيل الرئيسية */}
          <div className="grid grid-cols-2 gap-4 text-white">
            <div className="flex items-center p-3 bg-white bg-opacity-10 rounded-lg">
              <FaDollarSign className="text-[#E9622b] mr-3" />
              <div>
                <p className="text-xs text-[#D3D3D3]">Price</p>
                <p className="font-semibold">{facility.price}</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white bg-opacity-10 rounded-lg">
              <FaUsers className="text-[#E9622b] mr-3" />
              <div>
                <p className="text-xs text-[#D3D3D3]">Capacity</p>
                <p className="font-semibold">{facility.capacity}</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white bg-opacity-10 rounded-lg">
              <FaLayerGroup className="text-[#E9622b] mr-3" />
              <div>
                <p className="text-xs text-[#D3D3D3]">Surface</p>
                <p className="font-semibold">{facility.surface}</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white bg-opacity-10 rounded-lg">
              <FaClock className="text-[#E9622b] mr-3" />
              <div>
                <p className="text-xs text-[#D3D3D3]">Location</p>
                <p className="font-semibold">{facility.location}</p>
              </div>
            </div>
          </div>

          {/* جدول الحجز */}
          <h2 className="text-2xl font-bold text-white mt-8 border-b border-gray-700 pb-2">
            Booking Schedule
          </h2>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            {facility.schedule.map((slot, index) => (
              <div
                key={index}
                className="flex justify-between py-2 border-b border-gray-700 last:border-b-0"
              >
                <span className="text-white">{slot.time}</span>
                <span
                  className={`font-semibold ${
                    slot.status === "Available"
                      ? "text-green-400"
                      : "text-[#E9622b]"
                  }`}
                >
                  {slot.status}
                </span>
              </div>
            ))}
          </div>

          {/* زر الحجز */}
          <div className="text-center pt-5">
            <button className="px-10 py-4 bg-[#E9622b] text-white text-xl font-bold rounded-full hover:bg-opacity-80 transition duration-300 shadow-xl shadow-orange-500/50">
              Book Now
            </button>
          </div>
        </motion.div>

        {/* الجانب الأيمن: صورة الملعب */}
        <motion.div className="lg:w-1/2" variants={itemVariants}>
          <img
            src={randomImage} // استخدام الصورة العشوائية
            alt={facility.name}
            className="w-full h-auto rounded-xl shadow-2xl object-cover"
          />
          <p className="text-sm text-[#D3D3D3] mt-4 text-center">
            {facility.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FacilityDetailsContent;
