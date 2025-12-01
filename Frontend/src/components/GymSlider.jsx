// src/components/GymSlider.jsx

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

// // البيانات الوهمية للأندية
// const gymCards = [
//   {
//     id: 1,
//     name: "Iron Temple Gym",
//     location: "دمشق، المزة",
//     image: "https://via.placeholder.com/150/000000/ffffff?text=Gym+1",
//     rating: 4.8,
//     details: "صالة متكاملة بأحدث أجهزة الكارديو واللياقة.",
//   },
//   {
//     id: 2,
//     name: "The Fitness Hub",
//     location: "اللاذقية، الكورنيش",
//     image: "https://via.placeholder.com/150/E9622b/ffffff?text=Gym+2",
//     rating: 4.5,
//     details: "دروس جماعية متنوعة (Zumba, Yoga) ومسبح داخلي.",
//   },
//   {
//     id: 3,
//     name: "Power House Club",
//     location: "حلب، الشهباء",
//     image: "https://via.placeholder.com/150/333333/ffffff?text=Gym+3",
//     rating: 4.9,
//     details: "أقسام مخصصة لرفع الأثقال والتدريب الوظيفي.",
//   },
//   {
//     id: 4,
//     name: "Active Life Center",
//     location: "طرطوس، البحر",
//     image: "https://via.placeholder.com/150/0000FF/ffffff?text=Gym+4",
//     rating: 4.2,
//     details: "أسعار مناسبة مع مدربين معتمدين.",
//   },
//   {
//     id: 5,
//     name: "Zen Wellness Studio",
//     location: "حمص، الوعر",
//     image: "https://via.placeholder.com/150/FF0000/ffffff?text=Gym+5",
//     rating: 5.0,
//     details: "مركز يوغا واسترخاء عالي المستوى.",
//   },
// ];

// const GymSlider = () => {
//   // حالة لتحديد الكارد الأول الظاهر
//   const [startIndex, setStartIndex] = useState(0);
//   // عدد الكاردات الظاهرة في العرض
//   const cardsPerView = 3;

//   // دالة الانتقال للكارد التالي
//   const nextCard = () => {
//     setStartIndex((prevIndex) =>
//       Math.min(prevIndex + 1, gymCards.length - cardsPerView)
//     );
//   };

//   // دالة الانتقال للكارد السابق
//   const prevCard = () => {
//     setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
//   };

//   // أنيميشن للكاردات عند التبديل
//   const cardVariants = {
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
//     hidden: { opacity: 0, scale: 0.8 },
//   };

//   return (
//     <section className="py-20 bg-black text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-4xl font-extrabold mb-12 text-[#E9622b] text-center">
//           All Gyms & Clubs
//         </h2>

//         <div className="relative flex items-center justify-center">
//           {/* السهم الأيسر (للسابق) */}
//           <button
//             onClick={prevCard}
//             disabled={startIndex === 0}
//             className="absolute left-0 z-10 p-3 bg-[#E9622b] rounded-full text-white disabled:opacity-50 transition duration-300 shadow-lg hover:bg-opacity-80"
//           >
//             <FaChevronLeft />
//           </button>

//           {/* منطقة عرض الكاردات */}
//           <div className="overflow-hidden w-full">
//             <motion.div
//               className="flex gap-6 p-2"
//               // نستخدم x للانتقال الأفقي (Slide)
//               animate={{
//                 x: `calc(-${startIndex * (100 / cardsPerView)}% - ${
//                   startIndex * 6
//                 }px)`,
//               }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             >
//               {gymCards.map((gym) => (
//                 <motion.div
//                   key={gym.id}
//                   className="flex-shrink-0 w-full md:w-[calc(33.333%-16px)] lg:w-[calc(33.333%-16px)] bg-white bg-opacity-10 rounded-xl shadow-2xl p-4 space-y-3 border-b-4 border-transparent hover:border-[#E9622b] transition-all duration-300"
//                   variants={cardVariants}
//                   initial="hidden"
//                   animate="visible"
//                 >
//                   {/* صورة النادي والتقييم */}
//                   <div className="flex items-center justify-between">
//                     <img
//                       src={gym.image}
//                       alt={gym.name}
//                       className="w-16 h-16 rounded-full object-cover border-2 border-[#E9622b]"
//                     />
//                     <span className="flex items-center text-lg font-bold text-yellow-400">
//                       {gym.rating} <FaStar className="ml-1 text-sm" />
//                     </span>
//                   </div>

//                   {/* التفاصيل */}
//                   <h3 className="text-xl font-bold text-white">{gym.name}</h3>
//                   <p className="text-[#D3D3D3] text-sm">📍 {gym.location}</p>
//                   <p className="text-gray-400 text-sm">{gym.details}</p>

//                   {/* زر الحجز */}
//                   <button className="w-full py-2 bg-[#E9622b] text-white font-semibold rounded-lg hover:bg-opacity-80 transition duration-300">
//                     Book Now
//                   </button>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>

//           {/* السهم الأيمن (للتالي) */}
//           <button
//             onClick={nextCard}
//             disabled={startIndex >= gymCards.length - cardsPerView}
//             className="absolute right-0 z-10 p-3 bg-[#E9622b] rounded-full text-white disabled:opacity-50 transition duration-300 shadow-lg hover:bg-opacity-80"
//           >
//             <FaChevronRight />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GymSlider;


// src/components/GymSlider.jsx (الكود المعدل مع أنيميشن الصورة الجديدة)

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import img10 from "../img/wowww.jpg"; 
// البيانات الوهمية للأندية (لم تتغير)
const gymCards = [
    { 
        id: 1, 
        name: 'Iron Temple Gym', 
        location: 'دمشق، المزة', 
        image: 'https://via.placeholder.com/150/000000/ffffff?text=Gym+1', 
        rating: 4.8, 
        details: 'صالة متكاملة بأحدث أجهزة الكارديو واللياقة.' 
    },
    { 
        id: 2, 
        name: 'The Fitness Hub', 
        location: 'اللاذقية، الكورنيش', 
        image: 'https://via.placeholder.com/150/E9622b/ffffff?text=Gym+2', 
        rating: 4.5, 
        details: 'دروس جماعية متنوعة (Zumba, Yoga) ومسبح داخلي.' 
    },
    { 
        id: 3, 
        name: 'Power House Club', 
        location: 'حلب، الشهباء', 
        image: 'https://via.placeholder.com/150/333333/ffffff?text=Gym+3', 
        rating: 4.9, 
        details: 'أقسام مخصصة لرفع الأثقال والتدريب الوظيفي.' 
    },
    { 
        id: 4, 
        name: 'Active Life Center', 
        location: 'طرطوس، البحر', 
        image: 'https://via.placeholder.com/150/0000FF/ffffff?text=Gym+4', 
        rating: 4.2, 
        details: 'أسعار مناسبة مع مدربين معتمدين.' 
    },
    { 
        id: 5, 
        name: 'Zen Wellness Studio', 
        location: 'حمص، الوعر', 
        image: 'https://via.placeholder.com/150/FF0000/ffffff?text=Gym+5', 
        rating: 5.0, 
        details: 'مركز يوغا واسترخاء عالي المستوى.' 
    },
];

// الصورة التي ستظهر في الأعلى (يمكنك تغيير الرابط هنا)
const HeroImageURL = img10;

const GymSlider = () => {
    const [startIndex, setStartIndex] = useState(0);
    const cardsPerView = 3;

    const nextCard = () => {
        setStartIndex((prevIndex) => 
            Math.min(prevIndex + 1, gymCards.length - cardsPerView)
        );
    };

    const prevCard = () => {
        setStartIndex((prevIndex) => 
            Math.max(prevIndex - 1, 0)
        );
    };

    // أنيميشن للكاردات عند التبديل
    const cardVariants = {
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        hidden: { opacity: 0, scale: 0.8 }
    };
    
    // أنيميشن لدخول صورة الهيرو (هبوط من الأعلى مع تلاشي)
    const heroVariants = {
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.17, 0.55, 0.55, 1] } }
    };

    return (
      <section className="bg-black text-white">
        <h2 className="text-4xl font-extrabold mb-12 text-[#E9622b] text-center">
          All Gyms & Clubs
        </h2>
        {/* 1. الصورة الجديدة مع أنيميشن الهبوط */}
        <div className="w-full mb-10 overflow-hidden">
          <motion.img
            src={HeroImageURL}
            alt="Gyms Overview"
            className="w-[75vw] h-[75vh] object-cover ml-45 rounded-3xl"
            variants={heroVariants}
            initial="initial"
            animate="animate"
          />
        </div>
        {/* نهاية الصورة */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="relative flex items-center justify-center">
            {/* السهم الأيسر (للسابق) - تم تعديل التباعد */}
            <button
              onClick={prevCard}
              disabled={startIndex === 0}
              className="absolute left-[-16px] z-10 p-3 bg-[#E9622b] rounded-full text-white disabled:opacity-50 transition duration-300 shadow-lg hover:bg-opacity-80 md:left-[-32px]"
            >
              <FaChevronLeft />
            </button>

            {/* منطقة عرض الكاردات */}
            <div className="overflow-hidden w-full">
              <motion.div
                className="flex gap-6 p-2"
                animate={{
                  x: `calc(-${startIndex * (100 / cardsPerView)}% - ${
                    startIndex * 6
                  }px)`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {gymCards.map((gym) => (
                  <motion.div
                    key={gym.id}
                    className="flex-shrink-0 w-full md:w-[calc(33.333%-16px)] lg:w-[calc(33.333%-16px)] bg-white bg-opacity-10 rounded-xl shadow-2xl p-4 space-y-3 border-b-4 border-transparent hover:border-[#E9622b] transition-all duration-300"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* صورة النادي والتقييم */}
                    <div className="flex items-center justify-between">
                      <img
                        src={gym.image}
                        alt={gym.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#E9622b]"
                      />
                      <span className="flex items-center text-lg font-bold text-yellow-400">
                        {gym.rating} <FaStar className="ml-1 text-sm" />
                      </span>
                    </div>

                    {/* التفاصيل */}
                    <h3 className="text-xl font-bold text-white">{gym.name}</h3>
                    <p className="text-[#D3D3D3] text-sm">📍 {gym.location}</p>
                    <p className="text-gray-400 text-sm">{gym.details}</p>

                    {/* زر الحجز */}
                    <button className="w-full py-2 bg-[#E9622b] text-white font-semibold rounded-lg hover:bg-opacity-80 transition duration-300">
                      Book Now
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* السهم الأيمن (للتالي) - تم تعديل التباعد */}
            <button
              onClick={nextCard}
              disabled={startIndex >= gymCards.length - cardsPerView}
              className="absolute right-[-16px] z-10 p-3 bg-[#E9622b] rounded-full text-white disabled:opacity-50 transition duration-300 shadow-lg hover:bg-opacity-80 md:right-[-32px]"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>
    );
};

export default GymSlider;