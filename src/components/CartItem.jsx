import React from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../context/useCart';

const CartItem = ({ item }) => {
  const { dispatch } = useCart();

  const increaseQuantity = () => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: item.id });
  };

  const decreaseQuantity = () => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: item.id });
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="cart-item-quantity">
          <button onClick={decreaseQuantity}>-</button>
          <span>{item.quantity}</span>
          <button onClick={increaseQuantity}>+</button>
        </div>
        <p>${item.price}</p>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    rating: PropTypes.shape({
      count: PropTypes.number.isRequired,
    }).isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CartItem;
