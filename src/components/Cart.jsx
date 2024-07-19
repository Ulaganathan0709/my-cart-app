import React from 'react';
import { useCart } from '../context/useCart';
import CartItem from './CartItem';

const Cart = () => {
  const { state } = useCart();
  const totalAmount = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = state.cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <div>
          Subtotal ({totalItems} items): ${totalAmount.toFixed(2)}
        </div>
      </div>
      {state.cartItems.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      <div className="cart-summary">
        <h3>Total: ${totalAmount.toFixed(2)}</h3>
        <button>Proceed to Buy</button>
      </div>
    </div>
  );
};

export default Cart;
