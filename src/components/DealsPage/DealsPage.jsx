import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTag, FaClock, FaPercent, FaArrowRight, FaGift } from 'react-icons/fa';
import bundleDeals from '../../assets/bundleDeals.jpg';
import ClearanceSale from '../../assets/ClearanceSale.jpg';
import flashSale from '../../assets/flashSale.jpg';
import './DealsPage.css';

const DealsPage = () => {
  const [copiedCode, setCopiedCode] = useState('');

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const deals = [
    {
      id: 1,
      title: 'Flash Sale',
      discount: '50% OFF',
      description: 'Limited time offer on selected items',
      endTime: '2024-03-31',
      image: flashSale,
      bgColor: '#FFE1E1'
    },
    {
      id: 2,
      title: 'Bundle Deals',
      discount: 'Buy 2 Get 1',
      description: 'Special offers on product bundles',
      endTime: '2024-03-31',
      image: bundleDeals,
      bgColor: '#E1F5FE'
    },
    {
      id: 3,
      title: 'Clearance Sale',
      discount: 'Up to 70% OFF',
      description: 'Massive discounts on clearance items',
      endTime: '2024-03-31',
      image: ClearanceSale,
      bgColor: '#E8F5E9'
    }
  ];

  return (
    <div className="deals-page">
      <div className="deals-hero">
        <div className="hero-content">
         
          <h1>Exclusive Deals</h1>
          <p className="hero-subtitle">Discover amazing offers and save big!</p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">50%</span>
              <span className="stat-label">Off</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24H</span>
              <span className="stat-label">Flash Deals</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Products</span>
            </div>
          </div>
        </div>
      </div>

      <div className="deals-container">
        <div className="section-header">
          <h2>Today's Hot Deals</h2>
          <p>Don't miss out on these amazing offers</p>
        </div>

        <div className="deals-grid">
          {deals.map(deal => (
            <div key={deal.id} className="deal-card" style={{ backgroundColor: deal.bgColor }}>
              <div className="deal-content">
                <div className="deal-header">
                  <h3>{deal.title}</h3>
                  <span className="deal-badge">{deal.discount}</span>
                </div>
                <p className="deal-description">{deal.description}</p>
                <div className="deal-timer">
                  <FaClock />
                  <span>Ends in: {new Date(deal.endTime).toLocaleDateString()}</span>
                </div>
                <Link to="/product" className="deal-button">
                  Shop Now <FaArrowRight />
                </Link>
              </div>
              <div className="deal-image">
                <img src={deal.image} alt={deal.title} />
              </div>
            </div>
          ))}
        </div>

        <div className="discount-section">
          <div className="section-header">
            <h2>Special Discounts</h2>
            <p>Exclusive discount codes for extra savings</p>
          </div>
          <div className="discount-grid">
            <div className="discount-card">
              <div className="discount-content">
                <div className="discount-icon">
                  <FaTag />
                </div>
                <div className="discount-details">
                  <h3>20% OFF</h3>
                  <p>Save 20% on your first order</p>
                  <span className="discount-validity">Valid until December 31, 2024</span>
                </div>
              </div>
              <button 
                className="copy-discount-btn"
                onClick={() => handleCopyCode('SAVE20')}
              >
                {copiedCode === 'SAVE20' ? 'Copied!' : 'SAVE20'}
              </button>
            </div>

            <div className="discount-card">
              <div className="discount-content">
                <div className="discount-icon">
                  <FaGift />
                </div>
                <div className="discount-details">
                  <h3>30% OFF</h3>
                  <p>Bundle purchases discount</p>
                  <span className="discount-validity">Valid until December 31, 2024</span>
                </div>
              </div>
              <button 
                className="copy-discount-btn"
                onClick={() => handleCopyCode('BUNDLE30')}
              >
                {copiedCode === 'BUNDLE30' ? 'Copied!' : 'BUNDLE30'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsPage; 