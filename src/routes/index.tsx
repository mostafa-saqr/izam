import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import Layout from '../components/Layout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Login /></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/products" element={<Layout><Products /></Layout>} />
      <Route path="/cart" element={<Layout><Cart /></Layout>} />
    </Routes>
  );
};

export default AppRoutes; 