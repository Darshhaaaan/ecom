import { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import styles from '../styles/CartSidebar.module.css';

export default function CartSidebar({ open, onClose }) {
  const { items, dispatch, totalItems, totalPrice } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
  const remove = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });

  return (
    <>
      {open && <div className={styles.backdrop} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Your Cart</h2>
            <p className={styles.count}>{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🛒</div>
            <p className={styles.emptyTitle}>Your cart is empty</p>
            <p className={styles.emptyText}>Add some fresh produce to get started!</p>
            <button className="btn btn-primary" onClick={onClose} style={{marginTop:'16px'}}>
              Browse Shop
            </button>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className={styles.item}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className={styles.itemEmoji}>{item.emoji}</div>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemUnit}>{item.unit}</p>
                    <p className={styles.itemPrice}>₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className={styles.itemControls}>
                    <div className={styles.qtyControl}>
                      <button onClick={() => updateQty(item.id, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button className={styles.removeBtn} onClick={() => remove(item.id)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.promoRow}>
                <input className={styles.promoInput} placeholder="Promo code..." />
                <button className={styles.promoBtn}>Apply</button>
              </div>
              <div className={styles.totals}>
                <div className={styles.totalRow}>
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Delivery</span>
                  <span className={styles.free}>{totalPrice >= 500 ? 'FREE' : '₹49.00'}</span>
                </div>
                {totalPrice < 500 && (
                  <p className={styles.freeMsg}>
                    Add ₹{(500 - totalPrice).toFixed(0)} more for free delivery!
                  </p>
                )}
                <div className={`${styles.totalRow} ${styles.grand}`}>
                  <span>Total</span>
                  <span>₹{(totalPrice + (totalPrice >= 500 ? 0 : 49)).toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout" className="btn btn-primary" style={{width:'100%', justifyContent:'center'}} onClick={onClose}>
                Proceed to Checkout →
              </Link>
              <button
                className={styles.clearBtn}
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
