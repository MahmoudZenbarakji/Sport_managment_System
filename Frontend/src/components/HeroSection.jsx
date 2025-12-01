

import React, { useState, useEffect } from "react";
import img1 from "../img/37d24631f51ab8ec28a62ff9af0449ab.jpg";
import img2 from "../img/81a0ce68693374d54ba222b12a705285.jpg";
import img3 from "../img/412f710e5a277e84ab8d60a513ab9a9d.jpg"; 

const heroImages = [
  img1,
  img2, 
  img3, 
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgs,setImgs] = useState(heroImages[0]);
  let count = 1
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
      setImgs(heroImages[count]);
      if(count ==heroImages.length-1)count = 0;
      else count++;

    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="pt-16 min-h-screen bg-black flex items-center justify-center"
    >
      <div
        className="bg-[imgs] w-[75vw] h-[80vh] bg-cover bg-center transition-opacity duration-1000 rounded-3xl"
        style={{
          backgroundImage: `url(${imgs})`,
          opacity: 1,
        }}
      ></div>
    </section>
  );
};

export default HeroSection;
