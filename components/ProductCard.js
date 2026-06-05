import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from './Toast';
import styles from '../styles/ProductCard.module.css';

export default function ProductCard({ product, index = 0 }) {
  const { dispatch } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const [adding, setAdding] = useState(false);
  const wished = isWishlisted(product.id);

  const handleAdd = (e) => {
    e.preventDefault();
    setAdding(true);
    dispatch({ type: 'ADD_ITEM', payload: product });
    addToast(`${product.name} added to cart`, '🛒');
    setTimeout(() => setAdding(false), 600);
  };

  const handleWish = (e) => {
    e.preventDefault();
    toggle(product.id);
    addToast(
      wished ? `Removed from wishlist` : `${product.name} wishlisted`,
      wished ? '💔' : '❤️'
    );
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Link
      href={`/product/${product.id}`}
      className={styles.card}
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      {!product.inStock && <div className={styles.outOfStock}>Out of Stock</div>}

      <div className={styles.imageWrap}>
        <div className={styles.emoji}>{product.emoji}</div>
        {product.badge && (
          <span className={`${styles.badge} ${styles[`badge_${product.badgeType}`]}`}>
            {product.badge}
          </span>
        )}
        {discount && <span className={styles.discount}>-{discount}%</span>}
        <button
          className={`${styles.wishBtn} ${wished ? styles.wished : ''}`}
          onClick={handleWish}
          aria-label="Wishlist"
        >
          {wished ? '❤️' : '🤍'}
        </button>
        {product.organic && <span className={styles.organicTag}>🌱 Organic</span>}
      </div>

      <div className={styles.body}>
        <p className={styles.category}>{product.category}</p>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.rating}>
          <span className={styles.stars}>
            {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
          </span>
          <span className={styles.ratingNum}>{product.rating}</span>
          <span className={styles.reviews}>({product.reviews})</span>
        </div>
        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            <span className={styles.price}>₹{product.price}</span>
            <span className={styles.unit}>/ {product.unit}</span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>₹{product.originalPrice}</span>
            )}
          </div>
          <button
            className={`${styles.addBtn} ${adding ? styles.adding : ''}`}
            onClick={handleAdd}
            disabled={!product.inStock || adding}
          >
            {adding ? '✓' : '+'}
          </button>
        </div>
      </div>
    </Link>
  );
}
