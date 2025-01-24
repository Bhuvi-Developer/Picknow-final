import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/Landingpage/LandingPage';
import Login from './components/Login/Login';
import ProductPage from './components/ProductPage/ProductPage';
import CartPage from './components/CartPage/CartPage';
import UserProfile from './components/UserProfile/UserProfile'
import ProductDetail from './components/ProductPage/ProductDetail';
import CategoryPage from './components/CategoryPage/CategoryPage';
import DealsPage from './components/DealsPage/DealsPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
    if (!status) {
      localStorage.removeItem('currentUser');
      navigate('/');
    }
  };

  return (
    <div className="app">
      <Navbar isLoggedIn={isLoggedIn} onLogout={() => handleLogin(false)} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/deals" element={<DealsPage />} />
        </Routes>
      </div>
    </div>
  );
};

const mockProduct = {
  image: 'https://via.placeholder.com/150',
  title: 'Sample Product',
  price: 49.99,
  previousPrice: 59.99,
};

export default App;
