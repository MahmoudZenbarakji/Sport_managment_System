// src/pages/GymsPage.jsx

import React from "react";
import Navbar from "../components/Navbar";
import GymSlider from "../components/GymSlider"; // استدعاء مكون السلايدر
import Footer from "../components/Footer";

const GymsPage = () => {
  return (
    <>
      <div className="bg-black min-h-screen flex flex-col justify-between">
        <Navbar />

        {/* المحتوى الأساسي للصفحة */}
        <main className="flex-grow pt-24 pb-12">
          <GymSlider />
          <h1>dadas</h1>
          {/* يمكنك إضافة المزيد من المحتوى هنا أسفل السلايدر إذا احتجت */}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default GymsPage;
