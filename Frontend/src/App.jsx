
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeBage from './pages/HomeBage';
import CategoryPage from './pages/CategoryPage';
import './App.css';
import FacilityDetailsPage from './pages/FacilityDetailsPage'; // استدعاء الصفحة الجديدة
import GymsPage from './pages/GymsPage';

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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeBage />} />
          <Route path="/category/:type" element={<CategoryPage />} />
          <Route path="/facility/:id" element={<FacilityDetailsPage />} />
          
          {/* المسار الجديد لصفحة كل الجيمات */}
          <Route path="/gyms" element={<GymsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;