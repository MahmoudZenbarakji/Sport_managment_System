// src/components/Categories.jsx

import React from "react";
import {
  FaFutbol,
  FaBasketballBall,
  FaVolleyballBall,
  FaSwimmer,
  FaRegLifeRing,
} from "react-icons/fa";
import { Link } from "react-router";

const categories = [
  { name: "Football", icon: FaFutbol },
  { name: "Basketball", icon: FaBasketballBall },
  { name: "Volleyball", icon: FaVolleyballBall },
  { name: "Tennis", icon: FaRegLifeRing },
  { name: "Swimming", icon: FaSwimmer },
];

const Categories = () => {
  return (
    <section id="categories" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold mb-12 text-[#E9622b]">
          Sports Categories
        </h2>
        <div className="flex justify-around items-center flex-wrap gap-8">
          {categories.map((category) => {
            return (
              <div
                key={category.name}
                className="flex flex-col items-center p-6 bg-white bg-opacity-10 rounded-lg transition duration-300 hover:bg-opacity-20 cursor-pointer w-32 h-32 justify-center "
              >
                <category.icon className="text-9xl text-[#E9622b] mt-3" />
                <p className="text-sm font-medium text-[#E9622b]">
                  {category.name}
                </p>
                <Link to={`/category/${category.name}`} className="text-[10px]">
                  click
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
