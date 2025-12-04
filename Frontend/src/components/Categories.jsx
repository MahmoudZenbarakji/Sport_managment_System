// src/components/Categories.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../utils/api";
import { API_BASE } from "../environment/config";
import {
  FaFutbol,
  FaBasketballBall,
  FaVolleyballBall,
  FaSwimmer,
  FaRegLifeRing,
  FaDumbbell,
} from "react-icons/fa";

// Icon mapping for categories
const iconMap = {
  football: FaFutbol,
  basketball: FaBasketballBall,
  volleyball: FaVolleyballBall,
  tennis: FaRegLifeRing,
  swimming: FaSwimmer,
  gym: FaDumbbell,
  default: FaDumbbell,
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const result = await getCategories();
      if (result.success) {
        setCategories(result.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (categoryName) => {
    const name = categoryName?.toLowerCase() || "";
    return iconMap[name] || iconMap.default;
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    return `${API_BASE}${imagePath}`;
  };

  const handleCategoryClick = (category) => {
    // Use category ID instead of name for more reliable routing
    navigate(`/category/${category._id}`);
  };

  if (loading) {
    return (
      <section id="categories" className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold mb-12 text-[#E9622b]">
            Sports Categories
          </h2>
          <div className="text-white">Loading categories...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="categories" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold mb-12 text-[#E9622b]">
          Sports Categories
        </h2>
        <div className="flex justify-around items-center flex-wrap gap-8">
          {categories.length > 0 ? (
            categories.map((category) => {
              const IconComponent = getIcon(category.name);
              const imageUrl = getImageUrl(category.image);
            return (
              <div
                  key={category._id}
                  onClick={() => handleCategoryClick(category)}
                  className="flex flex-col items-center p-6 bg-white bg-opacity-10 rounded-lg transition duration-300 hover:bg-opacity-20 cursor-pointer w-32 h-32 justify-center relative overflow-hidden group"
              >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={category.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <IconComponent className="text-6xl text-[#E9622b] mt-3 z-10" />
                  )}
                  <p className="text-sm font-medium text-[#E9622b] z-10 mt-2">
                  {category.name}
                </p>
              </div>
            );
            })
          ) : (
            <div className="text-white w-full">No categories available</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
