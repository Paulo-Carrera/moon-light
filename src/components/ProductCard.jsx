import React, { useState } from 'react';
import './ProductCard.css';
import '../styles/global.css';
import products from '../data/products.js';

const ProductCard = () => {
  const [selectedId, setSelectedId] = useState(products[0].id);
  const selectedProduct = products.find(p => p.id === selectedId);
  const [quantity, setQuantity] = useState(1);

  // Debug: Confirm selected product and price
  console.log('🧪 Selected Product:', selectedProduct);

  const handleBuyClick = async () => {
    try {
      const orderData = {
        product: selectedProduct,
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

  const finalPrice = quantity >= 2
    ? selectedProduct.price * quantity * 0.9
    : selectedProduct.price * quantity;

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
          type="number"
          min="1"
          max={selectedProduct.maxQuantity}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <div className="price-group">
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