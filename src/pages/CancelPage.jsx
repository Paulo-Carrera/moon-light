import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const CancelPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="gradient-wrapper">
      {/* Stars layer */}
      <div className="stars-background">
        <div className="star"></div>
      </div>

      {/* Spinner block above stars */}
      <div className="spinner-container">
        <div className="spinner"></div>
        <h2 className="spinner-heading">Payment Canceled</h2>
        <p className="spinner-text">No worries — redirecting you back to products...</p>
      </div>
    </div>
  );
};

export default CancelPage;