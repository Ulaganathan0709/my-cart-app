import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import ErrorPage from './components/ErrorPage';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
