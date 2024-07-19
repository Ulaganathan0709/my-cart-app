import React, { createContext, useReducer, useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { cartReducer, initialState } from './cartReducer';

// Create context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    // Fetch JSON data from the local file
    fetch('/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        dispatch({ type: 'INITIALIZE_PRODUCTS', payload: data.products });
      })
      .catch(error => {
        console.error('Error fetching the cart data:', error);
      });
  }, []);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

// PropTypes validation
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CartContext };
