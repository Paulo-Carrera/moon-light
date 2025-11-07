import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import products from '../data/products.js';
import './Home.css';
import '../styles/global.css';

const Home = () => {
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState(products[0].id);
  const selectedProduct = products.find(p => p.id === selectedId);
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    navigate('/checkout', { state: { product: selectedProduct, quantity } });
  };

  const formatSalePrice = (price) => {
    const rounded = Math.ceil(price / 10) * 10;
    return (rounded - 0.01).toFixed(2);
  };

  const finalPrice = selectedProduct.price * quantity;

  return (
    <div>
      <main className="home-main gradient-wrapper">
        <div className="moon"></div>
        <div className="star"></div>
        <h1 className="home-title">Featured Product</h1>
        <div className="product-grid">
          <div className="product-card">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="product-image" />
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>

            <label htmlFor="size-select">Choose size:</label>
            <select
              id="size-select"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="size-dropdown"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.size}</option>
              ))}
            </select>

            <label htmlFor="quantity-input">Quantity:</label>
            <input
              id="quantity-input"
              type="number"
              min="1"
              max={selectedProduct.maxQuantity}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="quantity-input"
            />

            <p>
              <span className="price-original">${formatSalePrice(selectedProduct.price * 2)}</span>{' '}
              <span className="price-sale">${formatSalePrice(finalPrice)}</span>
            </p>

            <button
              onClick={handleBuyNow}
              className="buy-button"
            >
              Buy Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;