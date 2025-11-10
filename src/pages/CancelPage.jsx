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
    <div style={styles.container}>
      <div className="spinner"></div>
      <h2 style={styles.heading}>Payment Canceled</h2>
      <p style={styles.text}>No worries — redirecting you back to products...</p>
    </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  heading: {
    marginTop: '1rem',
    fontSize: '1.5rem',
    color: '#333',
  },
  text: {
    marginTop: '0.5rem',
    fontSize: '1rem',
    color: '#666',
  },
};

// Add this to your global CSS or inside a <style> tag:
/*
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
*/

export default CancelPage;