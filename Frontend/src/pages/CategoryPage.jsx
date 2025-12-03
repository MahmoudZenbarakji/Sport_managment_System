// src/pages/CategoryPage.jsx

import React from "react";
import Navbar from "../components/Navbar";
import CategoryList from "../components/CategoryList"; 
import Footer from "../components/Footer";

const CategoryPage = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="pt-24 pb-20 flex-grow">
        <CategoryList />
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
