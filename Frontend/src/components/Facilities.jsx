
import React from "react";
import { useNavigate } from "react-router-dom";
import majdImage from "../img/Gemini_Generated_Image_hpxy6mhpxy6mhpxy.png";
import img4 from "../img/Gemini_Generated_Image_lb9p46lb9p46lb9p.png";
import img5 from "../img/images (3).jpg";
const facilitiesData = [
  {
    id: "al-majd",
    name: "Al-Majd SC",
    location: "Bab Musalla, Damascus, Syria",
    image: majdImage,
  },

  {
    id: "fares-al-sham",
    name: "Fares Al-Sham",
    location: "Al-Zahira, Damascus, syria",
    image: img4,
  },
  {
    id: "al-nidal",
    name: "Al-Nidal",
    location: "Al-Nidal, Damascus, syria",
    image: img5,
  },
];

const Facilities = () => {
  const navigate = useNavigate();

  return (
    <section id="facilities" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold mb-12 text-[#E9622b]">
          Top Facilities Nearby
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {facilitiesData.map((facility) => (
            <div
              key={facility.id}
              className="bg-white bg-opacity-5 rounded-lg overflow-hidden shadow-lg hover:shadow-[#E9622b] transition duration-300"
            >
              <img
                src={facility.image}
                alt={facility.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-[#E9622b] mb-2">
                  {facility.name}
                </h3>
                <p className="text-sm text-[#D3D3D3] mb-4">
                  {facility.location}
                </p>
                <button
                  onClick={() => navigate(`/establishment/${facility.id}`)}
                  className="w-full py-2 text-white bg-[#E9622b] hover:bg-opacity-90 rounded-md transition duration-300"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;



