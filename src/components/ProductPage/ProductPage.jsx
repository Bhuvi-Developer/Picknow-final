import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import CartPage from '../CartPage/CartPage';
import ProductDetail from './ProductDetail';
import './ProductPage.css';
import Nuts from '../../assets/Nuts.jpg';
import honey from '../../assets/honey.jpg';
import { FaHeart, FaShoppingCart, FaStar, FaFilter } from 'react-icons/fa';

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState('listing');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [addedProducts, setAddedProducts] = useState({});
  const [priceRange, setPriceRange] = useState([49, 1000]);
  const [selectedSizes, setSelectedSizes] = useState(['100g']);
  const [selectedRating, setSelectedRating] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Update local storage and cart count whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('cartCount', totalItems.toString());
    window.dispatchEvent(new CustomEvent('cartUpdated', { 
      detail: { count: totalItems }
    }));
  }, [cart]);

  const products = [
    {
      id: 1,
      name: 'Badam/பாதாம்',
      weight: '100g',
      price: 450,
      originalPrice: 1000,
      image: Nuts,
      rating: 4.5,
      category: 'Dry fruits',
      description: 'Premium quality almonds, rich in nutrients.',
    },
    {
      id: 2,
      name: 'Black Raisin/பாதாம்',
      weight: '100g',
      price: 50,
      originalPrice: 90,
      image: Nuts,
      rating: 4.4,
      category: 'Dry fruits',
      description: 'Premium quality black raisins.',
    },
    {
      id: 3,
      name: 'Honey/பாதாம்',
      weight: '100g',
      price: 599,
      originalPrice: 700,
      image: honey,
      rating: 4.6,
      category: 'Dry fruits',
      description: 'Premium quality cashews.',
    },
    {
      id: 4,
      name: 'Dry dates/பாதாம்',
      weight: '100g',
      price: 150,
      originalPrice: 200,
      image: Nuts,
      rating: 4.5,
      category: 'Dry fruits',
      description: 'Premium quality dry dates.',
    },
    {
      id: 5,
      name: 'Dry fig/பாதாம்',
      weight: '100g',
      price: 199,
      originalPrice: 350,
      image: Nuts,
      rating: 4.5,
      category: 'Dry fruits',
      description: 'Premium quality dry figs.',
    },
    {
      id: 6,
      name: 'Honey/பாதாம்',
      weight: '100g',
      price: 99,
      originalPrice: 400,
      image: honey,
      rating: 4.5,
      category: 'Dry fruits',
      description: 'Premium quality dry amla.',
    },
  ];

  // Initialize filteredProducts with all products
  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  // Filter products based on selected criteria
  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(product.weight);
      const matchesRating = !selectedRating || Math.floor(product.rating) >= selectedRating;
      
      return matchesPrice && matchesSize && matchesRating;
    });

    setFilteredProducts(filtered);
  }, [priceRange, selectedSizes, selectedRating]);

  const handlePriceChange = (type, value) => {
    const newValue = parseInt(value) || 0;
    if (type === 'min') {
      setPriceRange([Math.min(newValue, priceRange[1]), priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], Math.max(newValue, priceRange[0])]);
    }
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleRatingSelect = (rating) => {
    setSelectedRating(rating === selectedRating ? null : rating);
  };

  const addToCart = (e, product, quantity = 1) => {
    e.preventDefault();
    e.stopPropagation();

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });

    setAddedProducts(prev => ({ ...prev, [product.id]: true }));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const navigateBack = () => {
    setCurrentPage('listing');
  };

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage('detail');
  };

  const handleBackToListing = () => {
    setCurrentPage('listing');
    setSelectedProductId(null);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const resetFilters = () => {
    setPriceRange([49, 1000]);
    setSelectedSizes(['100g']);
    setSelectedRating(null);
  };

  if (currentPage === 'cart') {
    return (
      <CartPage
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        navigateBack={navigateBack}
      />
    );
  }

  if (currentPage === 'detail') {
    const selectedProduct = products.find(p => p.id === selectedProductId);
    return (
      <ProductDetail
        product={selectedProduct}
        onBack={handleBackToListing}
        onAddToCart={addToCart}
        cart={cart}
        updateQuantity={updateQuantity}
      />
    );
  }

  return (
    <div className="best-selling">
      {/* Background Animation */}
      <div className="background-animation">
        <div className="background-text">PickNow</div>
        <div className="background-text">PickNow</div>
        <div className="background-text">PickNow</div>
        <div className="floating-circle circle-1" />
        <div className="floating-circle circle-2" />
        <div className="floating-circle circle-3" />
      </div>

      <div className="product-layout">
        {/* Mobile Filter Toggle */}
        <button className="filter-toggle" onClick={toggleFilter}>
          <FaFilter /> Filters
        </button>

        {/* Filter Sidebar */}
        <div className={`filter-sidebar ${isFilterOpen ? 'active' : ''}`}>
          <div className="filter-section">
            <h3>
              Filter By Price
              <button onClick={resetFilters} className="reset-btn">Reset</button>
            </h3>
            <div className="price-range">
              <div className="price-inputs">
                <div className="price-input-group">
                  <label>Min Price</label>
                  <input
                    type="number"
                    value={priceRange[0]}
                    min="49"
                    max={priceRange[1]}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                  />
                </div>
                <div className="price-input-group">
                  <label>Max Price</label>
                  <input
                    type="number"
                    value={priceRange[1]}
                    min={priceRange[0]}
                    max="1000"
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                  />
                </div>
              </div>
              <input
                type="range"
                min="49"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange('max', e.target.value)}
              />
            </div>
          </div>

          <div className="filter-section">
            <h3>Pack Size</h3>
            <div className="size-options">
              {['100g', '200g', '500g', '1kg'].map(size => (
                <label key={size} className="size-option">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => toggleSize(size)}
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Product Rating</h3>
            <div className="rating-options">
              {[5, 4, 3, 2, 1].map(rating => (
                <label key={rating} className="rating-option">
                  <input
                    type="checkbox"
                    checked={selectedRating === rating}
                    onChange={() => handleRatingSelect(rating)}
                  />
                  <div className="stars">
                    {[...Array(rating)].map((_, i) => (
                      <FaStar key={i} className="star-icon" />
                    ))}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Container */}
        <div className="products-container">
          <div className="products-header">
            <span>We found {filteredProducts.length} items for you!</span>
            <select className="sort-select">
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <button 
                    className="wishlist-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add wishlist functionality
                    }}
                  >
                    <FaHeart />
                  </button>
                  <button 
                    className="cart-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(e, product);
                    }}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
                <div className="product-info">
                  <div className="product-category">{product.category}</div>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-weight">{product.weight}</div>
                  <div className="product-rating">
                    <FaStar className="star-icon" />
                    <span>({product.rating})</span>
                  </div>
                  <div className="product-price">
                    <span className="current-price">₹{product.price}</span>
                    <span className="original-price">₹{product.originalPrice}</span>
                  </div>
                  <button 
                    className="buy-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product.id);
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
