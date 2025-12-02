// src/components/FacilityDetailsContent.jsx
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { facilityDetailsData } from "./facilityData";
import { Icons } from "./Icons";
import { GeneralAmenities } from "./FacilityHub";
import { ActivityDetailsCard } from "./ActivityCard";

export const FacilityDetailsContent = ({ facilityId }) => {
  const complex = facilityDetailsData[facilityId.toLowerCase()];
  const [selectedActivityId, setSelectedActivityId] = useState(
    complex?.activities?.[0]?.id || null
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentActivity = useMemo(() => {
    const activity = complex?.activities?.find(
      (a) => a.id === selectedActivityId
    );
    if (activity && activeImageIndex >= activity.images.length)
      setActiveImageIndex(0);
    return activity;
  }, [selectedActivityId, complex, activeImageIndex]);

  const complexAmenities = useMemo(() => {
    return (
      complex?.amenities.map((amenity) => ({
        ...amenity,
        icon: Icons[amenity.iconId] || Icons.Home,
      })) || []
    );
  }, [complex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.8 },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (!complex)
    return (
      <div className="p-20 text-white text-center text-3xl bg-black min-h-screen">
        لم يتم العثور على المنشأة: {facilityId}
      </div>
    );

  const handleActivityChange = (activityId) => {
    setSelectedActivityId(activityId);
    setActiveImageIndex(0);
  };
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src =
      "https://placehold.co/800x600/808080/FFFFFF?text=Image+Error";
  };

  return (
    <motion.div
      className="bg-black text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* محتوى مشابه للكود السابق مع Tabs، الصور، ActivityDetailsCard، GeneralAmenities */}
      </div>
    </motion.div>
  );
};
