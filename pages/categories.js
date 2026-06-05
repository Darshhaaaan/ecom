import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { products } from '../data/products';
import styles from '../styles/Categories.module.css';

const CATS = [
  { id: 'fruits', emoji: '🍎', label: 'Fruits', desc: 'Juicy, sun-ripened fruits packed with natural sweetness and vitamins.', color: '#ffe8e8', accent: '#e63946' },
  { id: 'vegetables', emoji: '🥦', label: 'Vegetables', desc: 'Farm-fresh vegetables bursting with nutrients, colour and crunch.', color: '#e8f5e9', accent: '#2d6a4f' },
  { id: 'herbs', emoji: '🌿', label: 'Herbs', desc: 'Fragrant, freshly harvested herbs to elevate every dish.', color: '#e8f5e0', accent: '#40c074' },
  { id: 'exotic', emoji: '🥭', label: 'Exotic', desc: 'Rare tropical treasures sourced from the best farms worldwide.', color: '#fff3e0', accent: '#e07a30' },
  { id: 'organic', emoji: '🌱', label: 'Organic', desc: 'Certified organic produce grown without pesticides or chemicals.', color: '#e0f2f1', accent: '#00897b' },
];

export default function Categories() {
  return (
    <Layout>
      <Head><title>Categories – FreshMart</title></Head>
      <div className={styles.pageHero}>
        <h1 className={styles.heroTitle}>Shop by <em>Category</em></h1>
        <p>Find exactly what you&apos;re looking for</p>
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          {CATS.map((cat, i) => {
            const count = cat.id === 'organic' ? products.filter(p => p.organic).length : products.filter(p => p.category === cat.id).length;
            const items = cat.id === 'organic' ? products.filter(p => p.organic).slice(0, 4) : products.filter(p => p.category === cat.id).slice(0, 4);
            return (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                className={styles.card}
                style={{ '--cat-bg': cat.color, '--cat-accent': cat.accent, animationDelay: `${i * 0.1}s` }}
              >
                <div className={styles.cardTop}>
                  <div className={styles.iconWrap}>
                    <span className={styles.catEmoji}>{cat.emoji}</span>
                  </div>
                  <div>
                    <h2 className={styles.catName}>{cat.label}</h2>
                    <p className={styles.catCount}>{count} products</p>
                  </div>
                </div>
                <p className={styles.catDesc}>{cat.desc}</p>
                <div className={styles.preview}>
                  {items.map(p => (
                    <span key={p.id} className={styles.previewEmoji}>{p.emoji}</span>
                  ))}
                </div>
                <span className={styles.cta}>Shop {cat.label} →</span>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
