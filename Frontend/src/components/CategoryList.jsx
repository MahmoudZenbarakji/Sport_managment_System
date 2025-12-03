
import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const facilitiesData = {
  football: [
    {
      id: 1,
      name: "ملعب الكامب نو المصغر",
      location: "دمشق، المزة",
      image:
        "https://via.placeholder.com/600x400/000000/ffffff?text=Football+1",
    },
    {
      id: 2,
      name: "ملعب الإتحاد الرياضي",
      location: "اللاذقية، الكورنيش",
      image:
        "https://via.placeholder.com/600x400/E9622b/ffffff?text=Football+2",
    },
    {
      id: 3,
      name: "صالة الفيحاء",
      location: "حلب، الشهباء",
      image:
        "https://via.placeholder.com/600x400/333333/ffffff?text=Football+3",
    },
  ],
  basketball: [
    {
      id: 1,
      name: "صالة السلة المحترفة",
      location: "دبي",
      image:
        "https://via.placeholder.com/600x400/E9622b/ffffff?text=Basketball+1",
    },
    {
      id: 2,
      name: "نادي الجلاء",
      location: "عمان",
      image:
        "https://via.placeholder.com/600x400/000000/ffffff?text=Basketball+2",
    },
    {
      id: 3,
      name: "ساحة النجوم",
      location: "الرياض",
      image:
        "https://via.placeholder.com/600x400/D3D3D3/000000?text=Basketball+3",
    },
  ],
  tennis: [
    {
      id: 1,
      name: "صالة السلة المحترفة",
      location: "دبي",
      image:
        "https://via.placeholder.com/600x400/E9622b/ffffff?text=Basketball+1",
    },
    {
      id: 2,
      name: "نادي الجلاء",
      location: "عمان",
      image:
        "https://via.placeholder.com/600x400/000000/ffffff?text=Basketball+2",
    },
    {
      id: 3,
      name: "ساحة النجوم",
      location: "الرياض",
      image:
        "https://via.placeholder.com/600x400/D3D3D3/000000?text=Basketball+3",
    },
  ],
  swimming: [
    {
      id: 1,
      name: "صالة السلة المحترفة",
      location: "دبي",
      image:
        "https://via.placeholder.com/600x400/E9622b/ffffff?text=Basketball+1",
    },
    {
      id: 2,
      name: "نادي الجلاء",
      location: "عمان",
      image:
        "https://via.placeholder.com/600x400/000000/ffffff?text=Basketball+2",
    },
    {
      id: 3,
      name: "ساحة النجوم",
      location: "الرياض",
      image:
        "https://via.placeholder.com/600x400/D3D3D3/000000?text=Basketball+3",
    },
  ],
  volleyball: [
    {
      id: 1,
      name: "صالة السلة المحترفة",
      location: "دبي",
      image:
        "https://via.placeholder.com/600x400/E9622b/ffffff?text=Basketball+1",
    },
    {
      id: 2,
      name: "نادي الجلاء",
      location: "عمان",
      image:
        "https://via.placeholder.com/600x400/000000/ffffff?text=Basketball+2",
    },
    {
      id: 3,
      name: "ساحة النجوم",
      location: "الرياض",
      image:
        "https://via.placeholder.com/600x400/D3D3D3/000000?text=Basketball+3",
    },
  ],
};

const CategoryList = () => {
  const { type } = useParams(); 
  const items = facilitiesData[type.toLowerCase()] || [];

  // إعدادات الأنيميشن
  const cardVariants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === "left" ? -100 : 100,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 w-full">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-[#E9622b] text-center mb-16 mt-10 capitalize"
      >
        {type} Facilities
      </motion.h1>

      <div className="space-y-20">
        {items.length > 0 ? (
          items.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.id}
                className={`flex flex-col md:flex-row items-center gap-10 overflow-hidden ${
                  !isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                <motion.div
                  custom={isEven ? "right" : "left"}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="w-full md:w-1/2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-[350px] object-cover rounded-xl shadow-lg border-2 border-transparent hover:border-[#E9622b] transition-all duration-300"
                  />
                </motion.div>
                <motion.div
                  custom={isEven ? "left" : "right"}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="w-full md:w-1/2 text-center md:text-left space-y-4"
                >
                  <h2 className="text-3xl font-bold text-white">{item.name}</h2>
                  <p className="text-xl text-[#D3D3D3]">📍 {item.location}</p>
                  <p className="text-gray-400">
                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة. لقد تم
                    توليد هذا النص من مولد النص العربى.
                  </p>
                  <button className="mt-4 px-8 py-3 bg-[#E9622b] text-white font-bold rounded-full hover:bg-white hover:text-[#E9622b] transition duration-300 shadow-md">
                    See More
                  </button>
                </motion.div>
              </div>
            );
          })
        ) : (
          <div className="text-white text-center text-2xl">
            No facilities found yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
