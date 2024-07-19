const cartReducer = (state, action) => {
    switch (action.type) {
      case 'INITIALIZE_PRODUCTS': {
        return { ...state, products: action.payload };
      }
      case 'ADD_TO_CART': {
        const existingItem = state.cartItems.find(item => item.id === action.payload.id);
        const updatedProducts = state.products.map(product =>
          product.id === action.payload.id
            ? { ...product, rating: { ...product.rating, count: product.rating.count - 1 } }
            : product
        );
  
        if (existingItem) {
          const updatedItems = state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: Math.min(item.quantity + 1, action.payload.rating.count) }
              : item
          );
          return {
            ...state,
            cartItems: updatedItems,
            products: updatedProducts,
          };
        }
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
          products: updatedProducts,
        };
      }
      case 'INCREASE_QUANTITY': {
        const product = state.products.find(p => p.id === action.payload);
        const existingItem = state.cartItems.find(item => item.id === action.payload);
        if (existingItem.quantity < product.rating.count) {
          const updatedItems = state.cartItems.map(item =>
            item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
          );
          return {
            ...state,
            cartItems: updatedItems,
            products: state.products.map(product =>
              product.id === action.payload
                ? { ...product, rating: { ...product.rating, count: product.rating.count - 1 } }
                : product
            ),
          };
        } else {
          alert('You cannot add more than the available quantity.');
          return state;
        }
      }
      case 'DECREASE_QUANTITY': {
        const existingItem = state.cartItems.find(item => item.id === action.payload);
        if (existingItem.quantity > 1) {
          const updatedItems = state.cartItems.map(item =>
            item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
          );
          return {
            ...state,
            cartItems: updatedItems,
            products: state.products.map(product =>
              product.id === action.payload
                ? { ...product, rating: { ...product.rating, count: product.rating.count + 1 } }
                : product
            ),
          };
        } else {
          return {
            ...state,
            cartItems: state.cartItems.filter(item => item.id !== action.payload),
            products: state.products.map(product =>
              product.id === action.payload
                ? { ...product, rating: { ...product.rating, count: product.rating.count + 1 } }
                : product
            ),
          };
        }
      }
      case 'REMOVE_FROM_CART': {
        const existingItem = state.cartItems.find(item => item.id === action.payload);
        const updatedProducts = state.products.map(product =>
          product.id === action.payload
            ? { ...product, rating: { ...product.rating, count: product.rating.count + existingItem.quantity } }
            : product
        );
  
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.id !== action.payload),
          products: updatedProducts,
        };
      }
      default:
        return state;
    }
  };
  
  const initialState = {
    products: [],
    cartItems: [],
  };
  
  export { cartReducer, initialState };
  