import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';
import styles from '../styles/SearchModal.module.css';

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const { dispatch } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = '';
    }
  }, [open]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const results = query.length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const handleAdd = (e, product) => {
    e.preventDefault();
    dispatch({ type: 'ADD_ITEM', payload: product });
    addToast(`${product.name} added to cart`, '🛒');
  };

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.inputWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            ref={inputRef}
            className={styles.input}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search fruits, vegetables, herbs..."
          />
          {query && (
            <button className={styles.clearBtn} onClick={() => setQuery('')}>✕</button>
          )}
        </div>

        <div className={styles.body}>
          {query.length === 0 && (
            <div className={styles.hints}>
              <p className={styles.hintsLabel}>Popular searches</p>
              <div className={styles.chips}>
                {['Mango', 'Organic', 'Spinach', 'Berries', 'Herbs', 'Avocado'].map(t => (
                  <button key={t} className={styles.chip} onClick={() => setQuery(t)}>{t}</button>
                ))}
              </div>
            </div>
          )}

          {query.length > 1 && results.length === 0 && (
            <div className={styles.noResults}>
              <span>😕</span>
              <p>No results for &quot;{query}&quot;</p>
              <small>Try a different keyword</small>
            </div>
          )}

          {results.length > 0 && (
            <div className={styles.results}>
              <p className={styles.resultsLabel}>{results.length} result{results.length !== 1 ? 's' : ''}</p>
              {results.map(p => (
                <Link key={p.id} href={`/product/${p.id}`} className={styles.result} onClick={onClose}>
                  <span className={styles.resultEmoji}>{p.emoji}</span>
                  <div className={styles.resultInfo}>
                    <span className={styles.resultName}>{p.name}</span>
                    <span className={styles.resultCat}>{p.category} · {p.unit}</span>
                  </div>
                  <div className={styles.resultRight}>
                    <span className={styles.resultPrice}>₹{p.price}</span>
                    <button
                      className={styles.resultAdd}
                      onClick={(e) => handleAdd(e, p)}
                      disabled={!p.inStock}
                    >+</button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <button className={styles.closeBtn} onClick={onClose}>✕ Close</button>
      </div>
    </div>
  );
}
