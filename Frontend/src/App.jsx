
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeBage from './pages/HomeBage';
import CategoryPage from './pages/CategoryPage';
import './App.css';
import FacilityDetailsPage from './pages/FacilityDetailsPage'; // استدعاء الصفحة الجديدة
import GymsPage from './pages/GymsPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Blog from './pages/Blog';
import CreatePost from './pages/CreatePost';




// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<HomeBage />} />
//           <Route path="/category/:type" element={<CategoryPage />} />
          
//           <Route path="/facility/:id" element={<FacilityDetailsPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }
// export default App;


// src/App.jsx (الجزء الخاص بـ Routes)









// ... (استيرادات)
// import GymsPage from './pages/GymsPage'; 

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<HomeBage />} />
//           <Route path="/category/:type" element={<CategoryPage />} />
//           <Route path="/facility/:id" element={<FacilityDetailsPage />} />
          
//           {/* المسار الجديد لصفحة كل الجيمات */}
//           <Route path="/gyms" element={<GymsPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }




// src/App.jsx (الجزء الخاص بـ Routes)

// ... (استيرادات)
import EstablishmentDetailsPage from './pages/EstablishmentDetailsPage'; // استدعاء الصفحة الجديدة

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeBage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/category/:type" element={<CategoryPage />} />
          <Route path="/facility/:id" element={<FacilityDetailsPage />} />
          <Route path="/gyms" element={<GymsPage />} />
          
          {/* ⬅️ المسار الجديد لتفاصيل المنشأة - يجب أن تستخدم IDs المنشآت هنا */}
          <Route path="/establishment/:establishmentId" element={<EstablishmentDetailsPage />} />
          
          {/* مسار وهمي لصفحة الحجز - يجب عليك بناء هذه الصفحة لاحقاً */}
          <Route path="/booking/:courtId" element={<div>Booking Page for Court ID: :courtId</div>} />
        </Routes>
      </div>
    </Router>
  );
}
// ...
export default App;