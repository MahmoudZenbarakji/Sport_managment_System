// src/components/TeamSection.jsx

import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import img9 from "../img/WhatsApp Image 2025-12-01 at 11.38.05 AM.jpeg";
import img10 from "../img/WhatsApp Image 2025-12-01 at 12.25.23 PM.jpeg";
import img13 from "../img/Gemini_Generated_Image_y2guv1y2guv1y2gu (1).png";
import img14 from "../img/WhatsApp Image 2025-12-02 at 10.31.42 AM.jpeg";
const teamMembers = [
  {
    name: "Farah Al-Daroish",
    title: "front-end Developer",
    bio: "Crafting clean, modern, and fast user interfaces Always focused on delivering smooth experiences for every visitor..",
    image:
      img10,
  },
  {
    name: "Mahmoud Al-Zenbarakji",
    title: "CEO & Founder",
    bio: "Leading the vision, direction, and growth of the platform.Focused on innovation, quality, and delivering the best user experience.",
    image:
      img13,
  },
  {
    name: "Dimaa Daabous",
    title: "Back-end Developer",
    bio: "Building strong, secure, and scalable server systems Turning ideas into powerful functionality behind the scenes..",
    image:
      img14,
  },
  {
    name: "Nour Al-shemali",
    title: "full-stack Developer",
    bio: "Bridging front-end creativity with back-end logic.Creating complete, reliable solutions from start to finish.",
    image:
      img9,
  },
];

const TeamSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextMember = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  const prevMember = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length
    );
  };

  const currentMember = teamMembers[currentIndex];

  return (
    <section id="team" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold mb-12 text-[#E9622b]">
          Meet Our Team
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          <div className="relative lg:w-1/3">
            <img
              src={currentMember.image}
              alt={currentMember.name}
              className="w-full h-auto rounded-lg shadow-2xl object-cover"
            />
            <button
              onClick={prevMember}
              className="absolute top-1/2 left-0 -translate-x-1/2 transform bg-[#E9622b] p-3 rounded-full hover:bg-opacity-80 transition"
            >
              <FaArrowLeft className="text-white text-xl" />
            </button>
            <button
              onClick={nextMember}
              className="absolute top-1/2 right-0 translate-x-1/2 transform bg-[#E9622b] p-3 rounded-full hover:bg-opacity-80 transition"
            >
              <FaArrowRight className="text-white text-xl" />
            </button>
          </div>
          <div className="lg:w-2/3 text-left p-6 lg:p-0 ml-60">
            <h3 className="text-3xl font-bold text-white mb-2">
              {currentMember.name}
            </h3>
            <p className="text-xl font-medium text-[#E9622b] mb-4">
              {currentMember.title}
            </p>
            <p className="text-lg text-[#D3D3D3]">{currentMember.bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
