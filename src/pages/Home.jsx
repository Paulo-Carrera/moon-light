import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import products from '../data/products.js';
import './Home.css';
import '../styles/global.css';

const Home = () => {
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    navigate('/checkout', { state: { product } });
  };

  const formatSalePrice = (price) => {
    const rounded = Math.ceil(price / 10) * 10;
    return (rounded - 0.01).toFixed(2);
  };

  useEffect(() => {
    const wrapper = document.querySelector('.home-main');

    // Generate 50 twinkling stars
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      wrapper.appendChild(star);
    }

    // Trigger shooting star randomly
    const interval = setInterval(() => {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      shootingStar.style.top = `${Math.random() * 50}%`;
      document.body.appendChild(shootingStar);
      setTimeout(() => shootingStar.remove(), 2000);
    }, Math.random() * 30000 + 15000); // every 15–45 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <main className="home-main gradient-wrapper">
        <div className="moon"></div>
        <h1 className="home-title">Featured Products</h1>
        <div className="product-grid">
          {products.map((product, index) => (
            <div key={index} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>
                <span className="price-original">${formatSalePrice(product.price * 2)}</span>{' '}
                <span className="price-sale">${formatSalePrice(product.price)}</span>
              </p>
              <button
                onClick={() => handleBuyNow(product)}
                className="buy-button"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;