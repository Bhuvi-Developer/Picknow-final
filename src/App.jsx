import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CategoryNav from './components/Navbar/CategoryNav';
import LandingPage from './components/Landingpage/LandingPage';
import Login from './components/Login/Login';
import ProductPage from './components/ProductPage/ProductPage';
import CartPage from './components/CartPage/CartPage';
import UserProfile from './components/UserProfile/UserProfile';
import ProductDetail from './components/ProductPage/ProductDetail';
import CategoryPage from './components/CategoryPage/CategoryPage';
import DealsPage from './components/DealsPage/DealsPage';
import PaymentPage from './components/PaymentPage/PaymentPage';
import CategoryProducts from './components/CategoryPage/CategoryProducts';
import TermsAndConditions from './components/Footer/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from './components/Footer/PrivacyPolicy/PrivacyPolicy';
import Refund from './components/Footer/refund';

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
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/category/:id" element={<CategoryProducts />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/Refund" element={<Refund />} />
          <Route path="/Terms & Conditions" element={<TermsAndConditions />} />
          <Route path="/Privacy Policy" element={<PrivacyPolicy />} />
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
