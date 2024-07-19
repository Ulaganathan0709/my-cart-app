import React, { useState } from 'react';
import { useCart } from '../context/useCart';
import Notification from './Notification';

const ProductList = () => {
  const { state, dispatch } = useCart();
  const [notification, setNotification] = useState({ message: '', show: false });

  const addToCart = (product) => {
    if (product.rating.count > 0) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
      setNotification({ message: 'Item Added', show: true });
    } else {
      alert('This product is out of stock.');
    }
  };

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product.id });
    setNotification({ message: 'Item Removed', show: true });
  };

  const renderStars = (rate) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i} className="rating">{i <= rate ? '★' : '☆'}</span>);
    }
    return stars;
  };

  return (
    <div className="product-list">
      {Array.isArray(state.products) && state.products.map(product => {
        const cartItem = state.cartItems.find(item => item.id === product.id);
        return (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p className="category">Category: {product.category}</p>
              <div>{renderStars(product.rating.rate)}</div>
              <p>Available Stock: {product.rating.count}</p>
              <p className="mrp">MRP: ${(product.price * 1.2).toFixed(2)}</p>
              <p className="price">${product.price}</p>
              {cartItem ? (
                <>
                  <p>In Cart: {cartItem.quantity}</p>
                  <button className="remove-button" onClick={() => removeFromCart(product)}>Remove</button>
                </>
              ) : (
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              )}
            </div>
          </div>
        );
      })}
      <Notification message={notification.message} show={notification.show} duration={2000} />
    </div>
  );
};

export default ProductList;
