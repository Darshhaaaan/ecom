import Link from 'next/link';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.marqueeBar}>
        <div className={styles.marqueeTrack}>
          {['🍓 Farm Fresh', '🥦 Organic', '🚚 Fast Delivery', '🌿 Sustainable', '🍋 Seasonal', '🥕 Nutritious', '🌱 Chemical-free', '🍅 Hand-picked'].map((t, i) => (
            <span key={i} className={styles.marqueeItem}>{t}</span>
          ))}
          {['🍓 Farm Fresh', '🥦 Organic', '🚚 Fast Delivery', '🌿 Sustainable', '🍋 Seasonal', '🥕 Nutritious', '🌱 Chemical-free', '🍅 Hand-picked'].map((t, i) => (
            <span key={`b${i}`} className={styles.marqueeItem}>{t}</span>
          ))}
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>🌿 <strong>FreshMart</strong></div>
          <p className={styles.tagline}>
            Bringing the farm to your table — fresh, fast and full of goodness.
          </p>
          <div className={styles.socials}>
            {['Instagram', 'Facebook', 'Twitter', 'WhatsApp'].map(s => (
              <a key={s} href="#" className={styles.social} aria-label={s}>
                {s === 'Instagram' && '📸'}
                {s === 'Facebook' && '📘'}
                {s === 'Twitter' && '🐦'}
                {s === 'WhatsApp' && '💬'}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.linksGroup}>
          <h4>Shop</h4>
          <Link href="/shop">All Products</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/shop?filter=organic">Organic Range</Link>
          <Link href="/shop?filter=exotic">Exotic Fruits</Link>
          <Link href="/shop?filter=sale">On Sale</Link>
        </div>

        <div className={styles.linksGroup}>
          <h4>Account</h4>
          <Link href="/account">My Account</Link>
          <Link href="/orders">My Orders</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/account#addresses">Addresses</Link>
        </div>

        <div className={styles.linksGroup}>
          <h4>Help</h4>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms &amp; Conditions</Link>
        </div>

        <div className={styles.newsletter}>
          <h4>Stay Fresh</h4>
          <p>Get seasonal picks and exclusive deals in your inbox.</p>
          <div className={styles.form}>
            <input placeholder="your@email.com" type="email" />
            <button>→</button>
          </div>
          <div className={styles.badges}>
            <span>🔒 No spam</span>
            <span>📦 Weekly drops</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2025 FreshMart. All rights reserved. Made with 💚 for fresh living.</p>
        <div className={styles.payments}>
          {['💳 Visa', '💳 Mastercard', '📱 UPI', '🏦 Net Banking'].map(p => (
            <span key={p} className={styles.payBadge}>{p}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
