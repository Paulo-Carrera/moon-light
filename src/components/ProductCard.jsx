import React, { useState } from 'react';
import './ProductCard.css';
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

const ProductCard = () => {
  const [selectedId, setSelectedId] = useState(products[0].id);
  const [quantity, setQuantity] = useState(1);

  const selectedProduct = products.find(p => p.id === selectedId);
  const basePrice = priceMap[selectedProduct.size];
  const compareAtPrice = basePrice + 10;
  const finalPrice = quantity >= 2 ? basePrice * quantity * 0.9 : basePrice * quantity;

  const handleBuyClick = async () => {
    try {
      const orderData = {
        product: {
          ...selectedProduct,
          price: basePrice,
        },
        quantity,
        customerEmail: 'test@example.com',
        shippingName: 'John Doe',
        shippingAddressLine1: '123 Main St',
        shippingCity: 'Los Angeles',
        shippingState: 'CA',
        shippingPostalCode: '90001',
      };

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('❌ No URL returned from Stripe');
      }
    } catch (err) {
      console.error('❌ Error creating Stripe session:', err);
    }
  };

  return (
    <div className="product-card">
      <img
        src={selectedProduct.image}
        alt={selectedProduct.name}
        className="product-image"
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
      />
      <div className="product-info">
        <h2 className="product-name">{selectedProduct.name}</h2>
        <p className="product-description">{selectedProduct.description}</p>

        <label htmlFor="size-select">Choose size:</label>
        <select
          id="size-select"
          className="size-dropdown"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.size}</option>
          ))}
        </select>

        <label htmlFor="quantity-input">Quantity:</label>
        <input
          id="quantity-input"
          className="quantity-input"
          type="number"
          min="1"
          max={selectedProduct.maxQuantity}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <div className="price-group">
          <span className="original-price">${compareAtPrice.toFixed(2)}</span>
          <span className="product-price">${finalPrice.toFixed(2)}</span>
        </div>

        {quantity >= 2 && (
          <p className="bulk-discount">Bulk discount applied!</p>
        )}

        <button className="buy-button" onClick={handleBuyClick}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;