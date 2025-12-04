
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getCategoryById, getCategories } from "../utils/api";
import { API_BASE } from "../environment/config";

const CategoryList = () => {
  const { type } = useParams(); 
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategoryData();
  }, [type]);

  const fetchCategoryData = async () => {
    setLoading(true);
    setError("");
    try {
      // Try to fetch by ID first (if type is an ID)
      let result = await getCategoryById(type);
      
      // If that fails, try to find category by name
      if (!result.success) {
        const categoriesResult = await getCategories();
        if (categoriesResult.success) {
          const foundCategory = categoriesResult.categories.find(
            cat => cat.name.toLowerCase() === type.toLowerCase() || cat._id === type
          );
          if (foundCategory) {
            result = await getCategoryById(foundCategory._id);
          }
        }
      }

      if (result.success) {
        setCategory(result.category);
        setStadiums(result.category.stadiums || []);
      } else {
        setError(result.error || "Category not found");
      }
    } catch (err) {
      setError("Failed to load category data");
      console.error("Category error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/600x400/333333/ffffff?text=No+Image";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    return `${API_BASE}${imagePath}`;
  };

  const handleStadiumClick = (stadiumId) => {
    navigate(`/facility/${stadiumId}`);
  };

  // Animation settings
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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-white text-center text-2xl mt-20">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-red-400 text-center text-2xl mt-20">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 w-full">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-[#E9622b] text-center mb-16 mt-10 capitalize"
      >
        {category?.name || type} Facilities
      </motion.h1>

      {category?.description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-300 text-center mb-12 text-lg max-w-3xl mx-auto"
        >
          {category.description}
        </motion.p>
      )}

      <div className="space-y-20">
        {stadiums.length > 0 ? (
          stadiums.map((stadium, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={stadium._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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
                    src={getImageUrl(stadium.Image)}
                    alt={stadium.name}
                    className="w-full h-[350px] object-cover rounded-xl shadow-lg border-2 border-transparent hover:border-[#E9622b] transition-all duration-300 cursor-pointer"
                    onClick={() => handleStadiumClick(stadium._id)}
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
                  <h2 className="text-3xl font-bold text-white">{stadium.name}</h2>
                  {stadium.owner && (
                    <p className="text-lg text-[#D3D3D3]">Owner: {stadium.owner.name}</p>
                  )}
                  {stadium.Price && (
                    <p className="text-xl text-[#E9622b] font-semibold">Price: ${stadium.Price}</p>
                  )}
                  {stadium.description && (
                    <p className="text-gray-400">{stadium.description}</p>
                  )}
                  <button
                    onClick={() => handleStadiumClick(stadium._id)}
                    className="mt-4 px-8 py-3 bg-[#E9622b] text-white font-bold rounded-full hover:bg-white hover:text-[#E9622b] transition duration-300 shadow-md"
                  >
                    See More
                  </button>
                </motion.div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-white text-center text-2xl">
            No facilities found in this category yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
