import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './CategoryNav.css';
import grocery from '../../assets/grocery.jpg'
import mobile from '../../assets/mobile.jpg'
import fashion from '../../assets/fashion.jpg'
import Electronics from '../../assets/Electronics.jpg'
import Beauty from '../../assets/Beauty.jpg'


const CategoryNav = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    {
      id: 'Grocery',
      name: 'Grocery',
      Image: grocery,
      dropdownItems: []
    },
    {
      id: 'mobiles',
      name: 'Mobiles',
      Image: mobile, 
       dropdownItems: []
    },
    {
      id: 'fashion',
      name: 'Fashion',
      Image: fashion,
      dropdownItems: ['Men', 'Women', 'Kids', 'Accessories']
    },
    {
      id: 'electronics',
      name: 'Electronics',
      Image:Electronics , 
      dropdownItems: ['Laptops', 'Smartphones', 'Tablets', 'Accessories']
    },
    {
      id: 'home',
      name: 'Home & Furniture',
      icon: 'https://rukminim2.flixcart.com/flap/96/96/image/ab7e2b022a4587dd.jpg',
      dropdownItems: ['Furniture', 'Decor', 'Kitchen', 'Lighting']
    },
    {
      id: 'appliances',
      name: 'Appliances',
      icon: 'https://rukminim2.flixcart.com/flap/96/96/image/0ff199d1bd27eb98.png',
      dropdownItems: []
    },
    {
      id: 'beauty',
      name: 'Beauty, Toys & More',
      Image:Beauty, 
      dropdownItems: ['Beauty', 'Toys', 'Sports', 'Books']
    }
  ];

  return (
    <nav className="category-nav">
      <div className="nav-container">
        <ul className="nav-list">
          {categories.map((category) => (
            <li
              key={category.id}
              className="nav-item"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <button className="category-button">
                <img
                  src={category.Image || category.icon}
                  alt={category.name}
                  className="category-icon"
                />
                <div className="category-title">
                  <span>{category.name}</span>
                  {category.dropdownItems.length > 0 && (
                    <ChevronDown 
                      className={`chevron-icon ${
                        hoveredCategory === category.id ? 'rotated' : ''
                      }`}
                    />
                  )}
                </div>
              </button>

              {category.dropdownItems.length > 0 && (
                <div className={`dropdown-menu ${
                  hoveredCategory === category.id ? 'active' : ''
                }`}>
                  <ul className="dropdown-list">
                    {category.dropdownItems.map((item) => (
                      <li key={item} className="dropdown-item">
                        <a href="#" className="dropdown-link">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default CategoryNav;