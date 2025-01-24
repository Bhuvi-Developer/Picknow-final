import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingPage from '../Landingpage/LandingPage';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin) {
      // Registration Process
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.some((user) => user.email === formData.email)) {
        alert('Email already registered!');
        return;
      }

      const newUser = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      setPopupMessage('Registered successfully!');
      setTimeout(() => {
        setPopupMessage('');
        setIsLogin(true); // Redirect to login form
      }, 2000);
    } else {
      // Login Process
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(
        (user) => user.email === formData.email && user.password === formData.password
      );

      if (!user) {
        alert('Invalid email or password!');
        return;
      }
      localStorage.setItem('currentUser', JSON.stringify(user));
      setPopupMessage('Logged in successfully!');
      setTimeout(() => {
        setPopupMessage('');
        navigate('/');
        window.location.reload();
      }, 2000); 
    }
  };

  return (
    <div className="profile-container">
      {/* Background Animation */}
      <div className="background-animation">
        <div className="background-text">PickNow</div>
        <div className="background-text">PickNow</div>
        <div className="background-text">PickNow</div>
        <div className="floating-circle circle-1" />
        <div className="floating-circle circle-2" />
        <div className="floating-circle circle-3" />
      </div>

      <div className="form-container">
        <div className="form-header">
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <p>{isLogin ? 'Welcome back!' : 'Create your account'}</p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group password-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
              <span
                className="toggle-password"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? '👁️' : '🙈'}
              </span>
            </div>
        
          </div>

          {!isLogin && (
            <div className="form-group password-group">
              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={confirmPasswordVisible ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                />
                <span
                  className="toggle-password"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                >
                  {confirmPasswordVisible ? '👁️' : '🙈'}
                </span>
              </div>
            </div>
          )}

          <button type="submit" className="submit-button">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="toggle-form">
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>
      </div>

      {/* Popup for Success Message */}
      {popupMessage && (
        <div className="popup-message">
          {popupMessage}
        </div>
      )}
    </div>
  );
};

export default Login;