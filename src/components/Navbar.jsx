import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { state } = useCart();
  const totalItems = state.cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart" className="cart-icon" title="Cart">
        <FontAwesomeIcon icon={faShoppingCart} /> <span>{totalItems}</span>
      </Link>
    </nav>
  );
};

export default Navbar;
