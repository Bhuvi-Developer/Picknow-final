import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { FaStar } from 'react-icons/fa';
import './ProductDetail.css';
import dryFruit1 from '../../assets/dry-fruits.jpg'
import Nuts from '../../assets/Nuts.jpg'
import honey from '../../assets/honey.jpg'


const ProductDetail = ({ product, onBack }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const navigate = useNavigate();

  // Sample product images array with actual imported images
  const images = [
    dryFruit1,
    Nuts,
    honey,
    product.image, // fallback to product image
  ];

  // Function to handle thumbnail click
  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const calculateDiscount = () => {
    if (product.originalPrice && product.price) {
      const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(item => item.id === product.id);
    
    let updatedCart;
    if (existingItemIndex !== -1) {
      updatedCart = existingCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...existingCart, { ...product, quantity }];
    }
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cartCount', totalItems.toString());
    window.dispatchEvent(new CustomEvent('cartUpdated', { 
      detail: { count: totalItems }
    }));
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-wrapper">
        <button onClick={onBack} className="back-button">
          <ArrowLeft size={20} />
          Back to products
        </button>

        <div className="product-content">
          {/* Product Gallery */}
          <div className="product-gallery">
            <div className="main-image-container">
              <img
                src={images[selectedImage]}
                alt={`${product.name} view ${selectedImage + 1}`}
                className="main-image"
              />
            </div>

            <div className="thumbnail-container">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="thumbnail-image"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info-container">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <div className="product-meta">
                <div className="rating-container">
                  <div className="stars">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        color={index < Math.floor(product.rating) ? '#ffd700' : '#e4e5e9'}
                      />
                    ))}
                  </div>
                  <span className="review-count">({product.rating} Rating)</span>
                </div>
                <span>{product.category}</span>
              </div>
            </div>

            <div className="price-container">
              <span className="current-price">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="original-price">₹{product.originalPrice}</span>
                  <span className="discount-badge">{calculateDiscount()}% OFF</span>
                </>
              )}
            </div>

            <div className="product-details">
              <div className="detail-row">
                <span className="detail-label">Brand</span>
                <span className="detail-value">N-Bitez</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Type</span>
                <span className="detail-value">{product.category}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Weight</span>
                <span className="detail-value">{product.weight}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Package Info</span>
                <span className="detail-value">Pouch Item</span>
              </div>
            </div>

            <div className="quantity-container">
              <span className="quantity-label">Quantity</span>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus size={20} />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button
                className="add-to-cart"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button 
                className="buy-now"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>

            <div className="description-section">
              <h2 className="description-title">Product Description</h2>
              <p className="description-content">
                {product.description}
                Discover the finest selection of products, crafted from premium ingredients 
                for authentic taste and texture. Perfect for quick meals or gourmet dishes, 
                enjoy quality you can trust in every bite!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 