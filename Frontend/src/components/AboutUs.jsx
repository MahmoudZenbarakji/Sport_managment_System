// src/components/AboutUs.jsx

import React from "react";

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold mb-8 text-[#E9622b]">
          What is SportSphere?
        </h2>
        <p className="text-xl leading-relaxed text-[#D3D3D3] px-4 md:px-0">
          We created this platform to make sports booking simple and fast. Here,
          you can find fields and facilities for all kinds of games in one
          place. Check schedules, compare options, and book your spot instantly.
          No calling, no waiting — everything is clear and organized. Whether
          you play with friends or join a team, we make the process easier.
          Choose your sport, pick a field, and you’re ready to play.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
