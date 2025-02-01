import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { FaStar, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import './ProductDetail.css';
import dryFruit1 from '../../assets/dryfruits.jpg';
import honey from '../../assets/honey.jpg';
import Nuts from '../../assets/Nuts.jpg';

const ProductDetail = ({ product, onBack }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomVisible, setIsZoomVisible] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const lensRef = useRef(null);
  const zoomWindowRef = useRef(null);
  const zoomImageRef = useRef(null);

  const ZOOM_LEVEL = 2.5;

  // Fixed array of product images
  const productImages = [
    {
      id: 1,
      url: product?.image || dryFruit1,
      alt: 'Front view'
    },
    {
      id: 2,
      url: honey,
      alt: 'Side view'
    },
    {
      id: 3,
      url: Nuts,
      alt: 'Back view'
    },
    {
      id: 4,
      url: dryFruit1,
      alt: 'Detail view'
    }
  ];

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const calculateDiscount = () => {
    if (product?.originalPrice && product?.price) {
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
    navigate('/payment', { state: { product } });
  };

  useEffect(() => {
    if (containerRef.current && lensRef.current && zoomWindowRef.current) {
      const lensWidth = zoomWindowRef.current.offsetWidth / ZOOM_LEVEL;
      const lensHeight = zoomWindowRef.current.offsetHeight / ZOOM_LEVEL;
      
      lensRef.current.style.width = `${lensWidth}px`;
      lensRef.current.style.height = `${lensHeight}px`;
    }
  }, []);

  const handleMouseEnter = () => {
    if (lensRef.current && zoomWindowRef.current) {
      lensRef.current.style.display = 'block';
      setIsZoomVisible(true);

      const rect = containerRef.current.getBoundingClientRect();
      setZoomPosition({
        x: rect.right + 20,
        y: rect.top
      });
    }
  };

  const handleMouseLeave = () => {
    if (lensRef.current) {
      lensRef.current.style.display = 'none';
      setIsZoomVisible(false);
    }
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current || !lensRef.current || !zoomImageRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate lens position
    let lensX = x - lensRef.current.offsetWidth / 2;
    let lensY = y - lensRef.current.offsetHeight / 2;

    // Prevent lens from going outside the image
    const maxX = containerRef.current.offsetWidth - lensRef.current.offsetWidth;
    const maxY = containerRef.current.offsetHeight - lensRef.current.offsetHeight;

    lensX = Math.max(0, Math.min(lensX, maxX));
    lensY = Math.max(0, Math.min(lensY, maxY));

    setLensPosition({ x: lensX, y: lensY });

    // Update zoom image
    if (zoomImageRef.current) {
      zoomImageRef.current.style.width = `${containerRef.current.offsetWidth * ZOOM_LEVEL}px`;
      zoomImageRef.current.style.height = `${containerRef.current.offsetHeight * ZOOM_LEVEL}px`;
      zoomImageRef.current.style.left = `-${lensX * ZOOM_LEVEL}px`;
      zoomImageRef.current.style.top = `-${lensY * ZOOM_LEVEL}px`;
    }
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-wrapper">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Products
        </button>
        
        <div className="product-content">
          {/* Left Thumbnail Column */}
          <div className="thumbnail-container">
            <button className="nav-button prev">
              <FaChevronUp />
            </button>
            <div className="thumbnails-wrapper">
              {productImages.map((image, index) => (
                <div 
                  key={image.id}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img
                    src={image.url}
                    alt={`${product?.name || 'Product'} - ${image.alt}`}
                    className="thumbnail-image"
                  />
                </div>
              ))}
            </div>
            <button className="nav-button next">
              <FaChevronDown />
            </button>
          </div>

          {/* Main Image Column with Zoom */}
          <div 
            className="main-image-container"
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <img
              src={productImages[selectedImage].url}
              alt={`${product?.name || 'Product'} - ${productImages[selectedImage].alt}`}
              className="main-image"
            />
            <div 
              className="product-hover-lens"
              ref={lensRef}
              style={{
                left: `${lensPosition.x}px`,
                top: `${lensPosition.y}px`
              }}
            />
            <div className="zoom-hint">Hover to zoom</div>
            {product?.isBestseller && (
              <div className="bestseller-badge">BESTSELLER</div>
            )}
          </div>

          <div 
            className={`zoom-window ${isZoomVisible ? 'visible' : ''}`}
            ref={zoomWindowRef}
            style={{
              left: `${zoomPosition.x}px`,
              top: `${zoomPosition.y}px`
            }}
          >
            <img 
              src={productImages[selectedImage].url}
              alt={`${product?.name || 'Product'} - Zoomed`}
              ref={zoomImageRef}
            />
          </div>

          {/* Product Info Column */}
          <div className="product-info-container">
            <h2 className="brand-name">{product?.brand || 'N-BITEZ'}</h2>
            <h1 className="product-title">{product?.name || 'Product Name'}</h1>
            
            <div className="rating-container">
              <div className="stars">
                <FaStar size={14} />
                <span>{product?.rating || '4.5'}</span>
              </div>
              <span className="review-count">{product?.reviews || '100'} Ratings</span>
            </div>

            <div className="price-container">
              <span className="current-price">₹{product?.price || '0'}</span>
              {product?.originalPrice && (
                <>
                  <span className="original-price">₹{product.originalPrice}</span>
                  <span className="discount-badge">{calculateDiscount()}% off</span>
                </>
              )}
            </div>

            <div className="product-details">
              <div className="detail-row">
                <span className="detail-label">Brand</span>
                <span className="detail-value">{product?.brand || 'N-Bitez'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Type</span>
                <span className="detail-value">{product?.category || 'Category'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Weight</span>
                <span className="detail-value">{product?.weight || '100g'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Package Info</span>
                <span className="detail-value">Pouch Item</span>
              </div>
            </div>

            <div className="size-section">
              <div className="size-label">Select Size</div>
              <div className="size-options">
                <div className="size-option active">100g</div>
                <div className="size-option">200g</div>
                <div className="size-option">500g</div>
              </div>
            </div>

            <div className="action-buttons">
              <div 
                data-tooltip={`Price: ₹${product?.price || 0}`} 
                className="add-to-cart"
                onClick={handleAddToCart}
              >
                <div className="button-wrapper">
                  <div className="text">Add to Cart</div>
                  <span className="icon">
                    <svg viewBox="0 0 16 16" className="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <button className="buy-now" onClick={handleBuyNow}>
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;