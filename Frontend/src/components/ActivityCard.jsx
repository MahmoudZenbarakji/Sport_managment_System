// src/components/ActivityCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Icons } from "./Icons";

export const ActivityDetailsCard = ({ activity }) => (
  <motion.div
    className="bg-white bg-opacity-5 p-6 rounded-xl shadow-xl border-t-4 border-[#E9622b]"
    whileHover={{
      scale: 1.02,
      boxShadow: "0 10px 15px rgba(233, 98, 43, 0.2)",
    }}
  >
    <h2 className="text-3xl font-bold mb-4 text-[#E9622b] flex items-center">
      <Icons.DollarSign className="w-6 h-6 ml-2" /> السعر والمواصفات
    </h2>
    <div className="space-y-3">
      <div className="flex justify-between items-center pb-2 border-b border-gray-700">
        <span className="text-lg text-gray-400">السعر / الساعة</span>
        <span className="text-2xl font-extrabold text-white">
          ${activity.price}
        </span>
      </div>
      <div className="flex justify-between items-center pb-2 border-b border-gray-700">
        <span className="text-lg text-gray-400 flex items-center">
          <Icons.Users className="w-5 h-5 ml-2 text-[#E9622b]" /> السعة
        </span>
        <span className="text-lg font-semibold">{activity.capacity}</span>
      </div>
      <div className="flex justify-between items-center pb-2 border-b-0">
        <span className="text-lg text-gray-400 flex items-center">
          <Icons.Layers className="w-5 h-5 ml-2 text-[#E9622b]" /> نوع الأرضية
        </span>
        <span className="text-lg font-semibold">{activity.surface}</span>
      </div>
    </div>
  </motion.div>
);
