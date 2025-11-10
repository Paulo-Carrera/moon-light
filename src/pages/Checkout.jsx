import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import products from '../data/products.js';

const Checkout = () => {
  const location = useLocation();
  const initialProduct = location.state?.product || null;
  const initialQuantity = location.state?.quantity || 1;

  const [selectedProductId, setSelectedProductId] = useState(initialProduct?.id || products[0].id);
  const selectedProduct = products.find(p => p.id === selectedProductId);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      console.log('Selected product:', selectedProduct.name);
    }
  }, [selectedProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const form = e.target;
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: selectedProduct,
          quantity,
          customerEmail: form.email.value,
          shippingName: form.shippingName.value,
          shippingAddressLine1: form.shippingAddressLine1.value,
          shippingCity: form.shippingCity.value,
          shippingState: form.shippingState.value,
          shippingPostalCode: form.shippingPostalCode.value,
        }),
      });

      const data = await response.json();
      window.location.href = data.url;
    } catch (err) {
      console.error('Stripe checkout error:', err);
      setLoading(false);
    }
  };

  return (
    <div className="gradient-wrapper">
      <div className="star"></div>
      <div>
        <h1 style={{ textAlign: 'center', color: 'white', fontSize: '2.5rem', marginBottom: '2rem' }}>Checkout</h1>

        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            padding: '2rem',
            background: 'transparent',
            color: 'white',
          }}
        >
          <label style={labelStyle}>
            Product:
            <select
              name="product"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              required
              style={inputStyle}
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} (${product.price})
                </option>
              ))}
            </select>
          </label>

          {selectedProduct && (
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                style={{ width: '200px', borderRadius: '8px' }}
              />
              <p>{selectedProduct.description}</p>
            </div>
          )}

          <label style={labelStyle}>
            Quantity:
            <input
              type="number"
              name="quantity"
              min="1"
              max={selectedProduct?.maxQuantity || 10}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={inputStyle}
            />
          </label>

          <label style={labelStyle}>
            Email:
            <input type="email" name="email" required placeholder="you@example.com" style={inputStyle} />
          </label>

          <label style={labelStyle}>
            Full Name:
            <input type="text" name="shippingName" required placeholder="John Doe" style={inputStyle} />
          </label>

          <label style={labelStyle}>
            Street Address:
            <input type="text" name="shippingAddressLine1" required placeholder="123 Main St" style={inputStyle} />
          </label>

          <label style={labelStyle}>
            City:
            <input type="text" name="shippingCity" required placeholder="Los Angeles" style={inputStyle} />
          </label>

          <label style={labelStyle}>
            State:
            <input type="text" name="shippingState" required placeholder="CA" style={inputStyle} />
          </label>

          <label style={labelStyle}>
            ZIP Code:
            <input type="text" name="shippingPostalCode" required placeholder="90001" style={inputStyle} />
          </label>

          <button
            type="submit"
            disabled={loading || !selectedProduct}
            style={{
              backgroundColor: '#3a0066',
              color: 'white',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 0 10px rgba(58, 0, 102, 0.6)',
              transition: 'all 0.3s ease',
              width: '100%',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Processing...' : 'Buy Now'}
          </button>

          {loading && (
            <div className="spinner-container">
              <div className="spinner"></div>
              <p className="spinner-text">Creating Stripe session...</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: 'bold',
  fontSize: '1.1rem',
};

const inputStyle = {
  display: 'block',
  width: '100%',
  marginBottom: '1.5rem',
  padding: '1rem',
  fontSize: '1rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
};

export default Checkout;