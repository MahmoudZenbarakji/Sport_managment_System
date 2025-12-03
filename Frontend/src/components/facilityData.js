// src/components/facilityData.js
export const facilityDetailsData = {
  complex1: {
    id: "complex1",
    name: "مركز الأبطال الرياضي",
    location: "دمشق، المزة - خلف السنتر",
    description:
      "أكبر مجمع رياضي متكامل يضم ملاعب متعددة، وصالات لياقة بدنية، وخدمات ممتازة تلبي كافة احتياجات الرياضيين.",
    rating: 4.8,
    workingHours: "8:00 AM - 12:00 AM",
    amenities: [
      { iconId: "Car", label: "مواقف مجانية" },
      { iconId: "ShowerHead", label: "دوش وغرف تبديل" },
      { iconId: "Coffee", label: "كافيتريا ومشروبات" },
      { iconId: "Wifi", label: "خدمة Wi-Fi سريعة" },
    ],
    activities: [
      {
        id: "football",
        name: "ملعب كرة القدم (5v5)",
        iconId: "Goal",
        price: 30,
        capacity: "10 لاعبين",
        surface: "عشب صناعي 5G",
        activityDescription:
          "ملعب قياسي بأبعاد 40x20، إضاءة ليلية احترافية، مثالي للمباريات الودية.",
        images: [
          "https://placehold.co/800x600/E9622b/ffffff?text=Football+Pitch+1",
          "https://placehold.co/800x600/000000/ffffff?text=Football+Lighting",
          "https://placehold.co/800x600/333333/ffffff?text=Football+Entrance",
        ],
      },
      {
        id: "basketball",
        name: "ملعب كرة السلة",
        iconId: "Target",
        price: 20,
        capacity: "10 لاعبين",
        surface: "أرضية باركيه رياضية",
        activityDescription:
          "صالة مغلقة ومكيفة، حلقة سلة قياسية، متوفرة للحجز بالساعة أو اليوم.",
        images: [
          "https://placehold.co/800x600/1D4ED8/ffffff?text=Basketball+Court+1",
          "https://placehold.co/800x600/1E40AF/ffffff?text=Basketball+Indoor",
          "https://placehold.co/800x600/6B21A8/ffffff?text=Basketball+Details",
        ],
      },
    ],
  },
};
