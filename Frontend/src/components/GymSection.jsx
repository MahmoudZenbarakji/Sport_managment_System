
import React, { useState, useEffect } from "react";
import { FaDumbbell, FaHeartbeat } from "react-icons/fa";
import img6 from "../img/WhatsApp Image 2025-12-01 at 12.08.34 PM.jpeg";
import img7 from "../img/img8.jpg";
const gymImages = [
  img6,
  img7,
];

const GymSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % gymImages.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="gym" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold mb-12 text-[#E9622b] text-center">
          Find Your Perfect Workout Spot
        </h2>
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 space-y-6">
            <h3 className="text-3xl font-bold text-white">
              Unleash Your Potential with Our Partner Gyms
            </h3>
            <p className="text-lg text-[#D3D3D3]">
              This is your moment to rise — to challenge your limits and rewrite
              your story. Every rep, every drop of sweat, brings you closer to
              the strongest version of yourself. Join our gym today and start a
              transformation that everyone will notice — including you.
            </p>
            <ul className="space-y-3 text-lg">
              <li className="flex items-center">
                <FaDumbbell className="text-[#E9622b] mr-3" />
                State-of-the-Art Equipment
              </li>
              <li className="flex items-center">
                <FaHeartbeat className="text-[#E9622b] mr-3" />
                Certified Personal Trainers
              </li>
            </ul>
            <button className="px-6 py-3 text-white bg-[#E9622b] hover:bg-opacity-90 rounded-lg font-semibold transition duration-300 mt-6">
              All Gyms
            </button>
          </div>
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <img
              src={gymImages[currentIndex]}
              alt="Gym Workout"
              className="w-full h-auto rounded-lg shadow-2xl object-cover transition-opacity duration-1000 ml-20"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GymSection;
