import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaCoffee, FaWineBottle, FaCandyCane, FaCarrot, FaIceCream } from 'react-icons/fa';
import Vegetables from '../../assets/Vegetables.jpg';
import Beverages from '../../assets/Beverages.jpg';
import './CategoryPage.css';

const CategoryPage = () => {
  const categories = [
    { id: 1, name: 'Vegetables & Fruits', icon: <FaLeaf />, color: '#4CAF50' },
    { id: 2, name: 'Beverages', icon: <FaCoffee />, color: '#795548' },
    { id: 3, name: 'Wine & Alcohol', icon: <FaWineBottle />, color: '#9C27B0' },
    { id: 4, name: 'Snacks', icon: <FaCandyCane />, color: '#FF5722' },
    { id: 5, name: 'Fresh Food', icon: <FaCarrot />, color: '#FF9800' },
    { id: 6, name: 'Frozen Food', icon: <FaIceCream />, color: '#2196F3' }
  ];

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>Shop by Category</h1>
        <p>Explore our wide range of categories</p>
      </div>

      <div className="categories-grid">
        {categories.map(category => (
          <Link to={`/category/${category.id}`} key={category.id} className="category-card">
            <div className="category-icon" style={{ backgroundColor: category.color }}>
              {category.icon}
            </div>
            <h3>{category.name}</h3>
            <span className="category-arrow">→</span>
          </Link>
        ))}
      </div>

      <div className="category-featured">
        <h2>Featured Categories</h2>
        <div className="featured-banners">
          <div className="featured-banner">
            <img src = {Vegetables} alt="Vegetables" />
            <div className="banner-content">
              <h3>Fresh Vegetables</h3>
              <p>Up to 30% off</p>
              <Link to="/category/1" className="shop-now-btn">Shop Now</Link>
            </div>
          </div>
          <div className="featured-banner">
            <img src={Beverages} alt="Beverages" />
            <div className="banner-content">
              <h3>Beverages</h3>
              <p>Buy 2 Get 1 Free</p>
              <Link to="/category/2" className="shop-now-btn">Shop Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage; 