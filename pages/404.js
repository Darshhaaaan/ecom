import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/NotFound.module.css';

export default function NotFound() {
  return (
    <Layout>
      <Head><title>404 – FreshMart</title></Head>
      <div className={styles.page}>
        <div className={styles.emojis}>
          {['🍓','🥦','🥭','🌿','🥕'].map((e, i) => (
            <span key={i} className={styles.floatEmoji} style={{ animationDelay: `${i * 0.3}s` }}>{e}</span>
          ))}
        </div>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Oops! Page not found</h2>
        <p className={styles.desc}>Looks like this page went off to the farm. Let&apos;s get you back to something fresh.</p>
        <div className={styles.btns}>
          <Link href="/" className="btn btn-primary">Go Home</Link>
          <Link href="/shop" className="btn btn-secondary">Browse Shop</Link>
        </div>
      </div>
    </Layout>
  );
}
