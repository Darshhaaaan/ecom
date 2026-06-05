import '../styles/globals.css';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';
import { ToastProvider } from '../components/Toast';

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
