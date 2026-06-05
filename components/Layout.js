import { useState } from 'react';
import Navbar from './Navbar';
import CartSidebar from './CartSidebar';
import SearchModal from './SearchModal';
import Footer from './Footer';

export default function Layout({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <Navbar
        onCartOpen={() => setCartOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
      />
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
