import React, { useState } from 'react';
import './UserProfile.css';
import { FaUser, FaEnvelope, FaPhone, FaShoppingBag, FaHeart, FaCog, FaSignOutAlt, FaEdit, FaSave, FaExclamationTriangle } from 'react-icons/fa';
import ConfirmationPopup from './ConfirmationPopup';
import LogoutConfirmationPopup from './LogoutConfirmationPopup';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    return {
      fullName: savedUser.fullName || '',
      email: savedUser.email || '',
      phoneNumber: savedUser.phoneNumber || '',
      ...savedUser
    };
  });
  const [editForm, setEditForm] = useState({ ...user });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FaUser /> },
    { id: 'orders', label: 'Orders', icon: <FaShoppingBag /> },
    { id: 'wishlist', label: 'Wishlist', icon: <FaHeart /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> }
  ];

  const handleEditClick = () => {
    setIsEditing(true);
    setEditForm({ ...user });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!editForm.fullName.trim() || !editForm.email.trim()) {
      alert('Name and Email are required!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editForm.email)) {
      alert('Please enter a valid email address!');
      return;
    }

    if (editForm.phoneNumber && !/^\d{10}$/.test(editForm.phoneNumber)) {
      alert('Please enter a valid 10-digit phone number!');
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirmSave = () => {
    const updatedUser = { ...user, ...editForm };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setIsEditing(false);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({ ...user });
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="user-profile-info animate-fade-in">
            <div className="user-profile-header">
              <div className="user-profile-avatar">
                <FaUser className="user-avatar-icon" />
              </div>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={editForm.fullName}
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="Enter your name"
                />
              ) : (
                <h2>{user.fullName || 'User Name'}</h2>
              )}
            </div>
            <div className="user-profile-details">
              <div className="user-detail-item">
                <FaEnvelope className="user-detail-icon" />
                <div className="user-detail-content">
                  <label>Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="edit-input"
                      placeholder="Enter your email"
                    />
                  ) : (
                    <p>{user.email || 'email@example.com'}</p>
                  )}
                </div>
              </div>
              <div className="user-detail-item">
                <FaPhone className="user-detail-icon" />
                <div className="user-detail-content">
                  <label>Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={editForm.phoneNumber}
                      onChange={handleInputChange}
                      className="edit-input"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <p>{user.phoneNumber || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>
            {isEditing ? (
              <div className="edit-buttons">
                <button className="save-btn" onClick={handleSave}>
                  <FaSave /> Save Changes
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            ) : (
              <button className="user-edit-profile-btn" onClick={handleEditClick}>
                <FaEdit /> Edit Profile
              </button>
            )}
          </div>
        );
      case 'orders':
        return (
          <div className="user-orders-section animate-fade-in">
            <h3>Recent Orders</h3>
            <div className="user-orders-list">
              <div className="user-no-orders">
                <FaShoppingBag className="user-empty-icon" />
                <p>No orders yet</p>
              </div>
            </div>
          </div>
        );
      case 'wishlist':
        return (
          <div className="user-wishlist-section animate-fade-in">
            <h3>My Wishlist</h3>
            <div className="user-wishlist-list">
              <div className="user-no-wishlist">
                <FaHeart className="user-empty-icon" />
                <p>Your wishlist is empty</p>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="user-settings-section animate-fade-in">
            <h3>Account Settings</h3>
            <div className="user-settings-list">
              <div className="user-setting-item">
                <label>Notifications</label>
                <label className="user-switch">
                  <input type="checkbox" />
                  <span className="user-slider"></span>
                </label>
              </div>
              <div className="user-setting-item">
                <label>Dark Mode</label>
                <label className="user-switch">
                  <input type="checkbox" />
                  <span className="user-slider"></span>
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="user-profile-page">
      <div className="user-profile-container">
        <div className="user-sidebar">
          <div className="user-sidebar-header">
            <div className="user-avatar">
              <FaUser />
            </div>
            <h3>{user.fullName || 'User Name'}</h3>
          </div>
          <nav className="user-sidebar-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`user-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
          <button className="user-logout-button" onClick={handleLogoutClick}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
        <div className="user-content">
          {renderTabContent()}
        </div>
      </div>

      {showConfirmation && (
        <ConfirmationPopup
          onConfirm={handleConfirmSave}
          onCancel={handleCancelConfirmation}
        />
      )}

      {showLogoutConfirmation && (
        <LogoutConfirmationPopup
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </div>
  );
};

export default UserProfile;

