import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const CancelPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="gradient-wrapper">
      <div className="star"></div>
      <div className="spinner-container">
        <div className="spinner"></div>
        <h2 className="spinner-heading">Payment Canceled</h2>
        <p className="spinner-text">No worries — redirecting you back to products...</p>
      </div>
    </div>
  );
};

export default CancelPage;