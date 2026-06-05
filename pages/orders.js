import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Account.module.css';

export default function Orders() {
  return (
    <Layout>
      <Head><title>My Orders – FreshMart</title></Head>
      <div className={styles.page}>
        <div style={{maxWidth:'1100px',margin:'0 auto',padding:'48px 24px 80px'}}>
          <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'2rem',color:'var(--green-deep)',marginBottom:'32px'}}>
            My <em style={{color:'var(--green-mid)'}}>Orders</em>
          </h1>
          <p style={{color:'var(--text-light)'}}>Sign in to view your order history. <Link href="/account" style={{color:'var(--green-mid)'}}>Go to Account →</Link></p>
        </div>
      </div>
    </Layout>
  );
}
