import React from 'react';
import { Routes, Route } from 'react-router-dom';
import YearlyPage from '../pages/YearlyPage';
import MonthlyPage from '../pages/MonthlyPage';
import Navbar from '../components/Navbar';

const AppRoutes = () => (
  <>
    <Navbar />
    <div className='mt-8'>
      <Routes>
        <Route path="/yearly" element={<YearlyPage />} />
        <Route path="/monthly" element={<MonthlyPage />} />
      </Routes>
    </div>
  </>
);

export default AppRoutes;
