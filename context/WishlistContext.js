import { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext(null);

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return state.ids.includes(action.payload)
        ? { ids: state.ids.filter(id => id !== action.payload) }
        : { ids: [...state.ids, action.payload] };
    case 'LOAD':
      return { ids: action.payload };
    default:
      return state;
  }
};

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, { ids: [] });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('freshmart_wishlist');
      if (saved) dispatch({ type: 'LOAD', payload: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('freshmart_wishlist', JSON.stringify(state.ids));
  }, [state.ids]);

  const toggle = (id) => dispatch({ type: 'TOGGLE', payload: id });
  const isWishlisted = (id) => state.ids.includes(id);

  return (
    <WishlistContext.Provider value={{ ...state, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
