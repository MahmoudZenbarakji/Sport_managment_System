// src/pages/FacilityDetailsPage.jsx

import React from "react";
import FacilityDetailsContent from "../components/FacilityDetailsContent"; // استدعاء المكون

const FacilityDetailsPage = () => {
  return (
    // الخلفية السوداء للصفحة كاملة
    <div className="bg-black min-h-screen text-white">
      {/* المكون الذي يحمل التصميم الداخلي وزر العودة */}
      <FacilityDetailsContent />
    </div>
  );
};

export default FacilityDetailsPage;
