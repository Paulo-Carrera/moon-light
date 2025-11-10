import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import './Home.css';
import '../styles/global.css';

const priceMap = {
  '8cm': 24.99,
  '12cm': 29.99,
  '15cm': 34.99,
};

const products = [
  {
    id: 'moonlight-8cm',
    size: '8cm',
    name: 'MoonLight Lamp - 8cm',
    description: 'Compact cosmic glow. Perfect for desks and small spaces.',
    image: 'https://relaxusonline.com/cdn/shop/products/518119-Luna-Moon-Lamp_-lifestyle.jpg?v=1755529048',
    maxQuantity: 10,
  },
  {
    id: 'moonlight-12cm',
    size: '12cm',
    name: 'MoonLight Lamp - 12cm',
    description: 'Balanced size for bedrooms and cozy corners.',
    image: 'https://relaxusonline.com/cdn/shop/products/518119-Luna-Moon-Lamp_-lifestyle.jpg?v=1755529048',
    maxQuantity: 10,
  },
  {
    id: 'moonlight-15cm',
    size: '15cm',
    name: 'MoonLight Lamp - 15cm',
    description: 'Larger glow for living rooms or statement gifting.',
    image: 'https://relaxusonline.com/cdn/shop/products/518119-Luna-Moon-Lamp_-lifestyle.jpg?v=1755529048',
    maxQuantity: 10,
  },
];

const Home = () => {
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState(products[0].id);
  const [quantity, setQuantity] = useState(1);

  const selectedProduct = products.find(p => p.id === selectedId);
  const basePrice = priceMap[selectedProduct.size];
  const finalPrice = basePrice * quantity;
  const compareAtPrice = basePrice + 10;

  const handleBuyNow = () => {
    navigate('/checkout', {
      state: {
        product: { ...selectedProduct, price: basePrice },
        quantity,
      },
    });
  };

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
  <span className="price-unit">Unit Price: ${basePrice.toFixed(2)}</span><br />
  <span className="price-original">Compare at: ${(compareAtPrice * quantity).toFixed(2)}</span><br />
  <span className="price-sale">Total: ${finalPrice.toFixed(2)}</span>
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