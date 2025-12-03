import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FacilityDetailsContent } from "../components/FacilityDetailsContent";

const EstablishmentDetailsPage = () => {
  const facilityId = "complex1"; // يمكن تغييره لأي منشأة أخرى

  return (
    <div className="bg-black min-h-screen flex flex-col font-[Inter]">
      <Navbar />
      <main className="flex-grow pt-16">
        <FacilityDetailsContent facilityId={facilityId} />
      </main>
      <Footer />
    </div>
  );
};

export default EstablishmentDetailsPage;
