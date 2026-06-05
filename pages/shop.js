import { useState, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import styles from '../styles/Shop.module.css';

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'Name A-Z' },
];

export default function Shop() {
  const router = useRouter();
  const initCat = router.query.category || 'all';
  const [activeCategory, setActiveCategory] = useState(initCat);
  const [sort, setSort] = useState('default');
  const [search, setSearch] = useState('');
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [priceMax, setPriceMax] = useState(20);
  const [gridCols, setGridCols] = useState(3);

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== 'all') {
      if (activeCategory === 'organic') list = list.filter(p => p.organic);
      else list = list.filter(p => p.category === activeCategory);
    }
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (onlyOrganic) list = list.filter(p => p.organic);
    if (onlyInStock) list = list.filter(p => p.inStock);
    list = list.filter(p => p.price <= priceMax);
    switch (sort) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
      case 'name':       list.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return list;
  }, [activeCategory, search, onlyOrganic, onlyInStock, priceMax, sort]);

  return (
    <Layout>
      <Head><title>Shop – FreshMart</title></Head>

      <div className={styles.pageHero}>
        <div className={styles.pageHeroInner}>
          <span className="section-label" style={{color:'var(--green-light)'}}>Our Selection</span>
          <h1 className={styles.pageTitle}>Fresh <em>Everything</em></h1>
          <p>Browse our full range of farm-fresh produce</p>
        </div>
      </div>

      <div className={styles.shopLayout}>
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Categories</h3>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`${styles.catBtn} ${activeCategory === cat.id ? styles.catActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                <span className={styles.catBtnCount}>
                  {cat.id === 'all' ? products.length
                   : cat.id === 'organic' ? products.filter(p=>p.organic).length
                   : products.filter(p=>p.category===cat.id).length}
                </span>
              </button>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Max Price</h3>
            <p className={styles.priceDisplay}>Up to ₹{priceMax}</p>
            <input
              type="range" min="2" max="20" step="0.5"
              value={priceMax}
              onChange={e => setPriceMax(Number(e.target.value))}
              className={styles.rangeInput}
            />
            <div className={styles.priceRange}><span>₹2</span><span>₹20</span></div>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Filter By</h3>
            <label className={styles.checkLabel}>
              <input type="checkbox" checked={onlyOrganic} onChange={e => setOnlyOrganic(e.target.checked)} />
              <span>🌱 Organic only</span>
            </label>
            <label className={styles.checkLabel}>
              <input type="checkbox" checked={onlyInStock} onChange={e => setOnlyInStock(e.target.checked)} />
              <span>✅ In stock only</span>
            </label>
          </div>

          <button
            className={styles.resetBtn}
            onClick={() => { setActiveCategory('all'); setSort('default'); setSearch(''); setOnlyOrganic(false); setOnlyInStock(false); setPriceMax(20); }}
          >
            Reset Filters
          </button>
        </aside>

        {/* Products Area */}
        <div className={styles.main}>
          <div className={styles.toolbar}>
            <div className={styles.searchWrap}>
              <span>🔍</span>
              <input
                className={styles.searchInput}
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className={styles.toolbarRight}>
              <span className={styles.resultsCount}>{filtered.length} products</span>
              <select
                className={styles.sortSelect}
                value={sort}
                onChange={e => setSort(e.target.value)}
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <div className={styles.gridToggle}>
                {[2, 3, 4].map(n => (
                  <button
                    key={n}
                    className={`${styles.gridBtn} ${gridCols === n ? styles.gridBtnActive : ''}`}
                    onClick={() => setGridCols(n)}
                  >
                    {n === 2 ? '▦' : n === 3 ? '⊞' : '⊟'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <span>🌿</span>
              <p>No products found</p>
              <small>Try adjusting your filters</small>
            </div>
          ) : (
            <div
              className={styles.grid}
              style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
            >
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
