import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import styles from '../styles/Wishlist.module.css';

export default function Wishlist() {
  const { ids } = useWishlist();
  const wishlisted = products.filter(p => ids?.includes(p.id));

  return (
    <Layout>
      <Head><title>Wishlist – FreshMart</title></Head>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Your <em>Wishlist</em></h1>
            <p className={styles.subtitle}>{wishlisted.length} saved item{wishlisted.length !== 1 ? 's' : ''}</p>
          </div>

          {wishlisted.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🤍</span>
              <h2>Nothing saved yet</h2>
              <p>Browse our shop and tap the heart icon to save favourites.</p>
              <Link href="/shop" className="btn btn-primary">Browse Shop</Link>
            </div>
          ) : (
            <div className={styles.grid}>
              {wishlisted.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
