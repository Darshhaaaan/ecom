import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../components/Toast';
import styles from '../../styles/ProductDetail.module.css';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const product = products.find(p => p.id === Number(id));
  const related = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  const { dispatch } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');

  if (!product) {
    return (
      <Layout>
        <div style={{textAlign:'center',padding:'200px 24px'}}>
          <h2 style={{fontFamily:'Playfair Display, serif'}}>Product not found</h2>
          <Link href="/shop" className="btn btn-primary" style={{marginTop:'20px',display:'inline-flex'}}>Back to Shop</Link>
        </div>
      </Layout>
    );
  }

  const wished = isWishlisted(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
    addToast(`${qty}× ${product.name} added to cart`, '🛒');
  };

  const handleWish = () => {
    toggle(product.id);
    addToast(wished ? 'Removed from wishlist' : `${product.name} wishlisted`, wished ? '💔' : '❤️');
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Layout>
      <Head><title>{product.name} – FreshMart</title></Head>

      <div className={styles.breadcrumb}>
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/shop">Shop</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Image */}
          <div className={styles.imageSection}>
            <div className={styles.imageMain}>
              <div className={styles.bigEmoji}>{product.emoji}</div>
              {product.badge && (
                <span className={`${styles.badge} ${styles[`badge_${product.badgeType}`]}`}>
                  {product.badge}
                </span>
              )}
              {discount && <span className={styles.discountTag}>-{discount}%</span>}
            </div>
            <div className={styles.thumbs}>
              {[product.emoji, '📦', '🌿'].map((e, i) => (
                <div key={i} className={`${styles.thumb} ${i === 0 ? styles.thumbActive : ''}`}>
                  {e}
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className={styles.info}>
            <p className={styles.category}>{product.category}</p>
            <h1 className={styles.name}>{product.name}</h1>

            <div className={styles.ratingRow}>
              <span className={styles.stars}>{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
              <span className={styles.ratingNum}>{product.rating}</span>
              <span className={styles.reviews}>({product.reviews} reviews)</span>
              {product.inStock
                ? <span className={styles.inStock}>✅ In Stock</span>
                : <span className={styles.outOfStock}>❌ Out of Stock</span>
              }
            </div>

            <div className={styles.priceRow}>
              <span className={styles.price}>₹{product.price}</span>
              <span className={styles.unit}>/ {product.unit}</span>
              {product.originalPrice && (
                <span className={styles.originalPrice}>₹{product.originalPrice}</span>
              )}
            </div>

            <p className={styles.description}>{product.description}</p>

            <div className={styles.tags}>
              {product.tags?.map(tag => (
                <span key={tag} className={styles.tag}>#{tag}</span>
              ))}
            </div>

            {product.organic && (
              <div className={styles.organicBadge}>
                🌱 <strong>Certified Organic</strong> — Grown without pesticides or synthetic fertilisers
              </div>
            )}

            <div className={styles.addRow}>
              <div className={styles.qtyControl}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                style={{flex:1, justifyContent:'center'}}
              >
                🛒 Add to Cart
              </button>
              <button
                className={`${styles.wishBtn} ${wished ? styles.wished : ''}`}
                onClick={handleWish}
              >
                {wished ? '❤️' : '🤍'}
              </button>
            </div>

            <Link href="/checkout" className="btn btn-secondary" style={{width:'100%', justifyContent:'center', marginTop:'12px'}} onClick={handleAddToCart}>
              ⚡ Buy Now
            </Link>

            <div className={styles.deliveryInfo}>
              <div className={styles.deliveryItem}><span>🚚</span><span>Same-day delivery for orders before 12pm</span></div>
              <div className={styles.deliveryItem}><span>🔄</span><span>Easy returns within 24 hours</span></div>
              <div className={styles.deliveryItem}><span>🌡️</span><span>Cold-chain maintained</span></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {['description', 'nutrition', 'reviews'].map(t => (
            <button
              key={t}
              className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.tabBody}>
          {tab === 'description' && (
            <div className={styles.tabContent}>
              <h3>About {product.name}</h3>
              <p>{product.description}</p>
              <p>Sourced directly from trusted farms, our {product.name} are harvested at peak ripeness and delivered within 24 hours. We work with farmers who share our commitment to quality, sustainability, and ethical growing practices.</p>
              <p>Best stored at room temperature until ripe, then refrigerated. Wash thoroughly before consuming.</p>
            </div>
          )}
          {tab === 'nutrition' && (
            <div className={styles.tabContent}>
              <h3>Nutrition (per 100g)</h3>
              <div className={styles.nutriTable}>
                {[
                  { label: 'Calories', value: '52 kcal' },
                  { label: 'Carbohydrates', value: '13.8g' },
                  { label: 'Fiber', value: '2.4g' },
                  { label: 'Sugars', value: '10.4g' },
                  { label: 'Protein', value: '0.3g' },
                  { label: 'Fat', value: '0.2g' },
                  { label: 'Vitamin C', value: '4.6mg' },
                  { label: 'Potassium', value: '107mg' },
                ].map(n => (
                  <div key={n.label} className={styles.nutriRow}>
                    <span>{n.label}</span>
                    <span>{n.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'reviews' && (
            <div className={styles.tabContent}>
              <div className={styles.reviewSummary}>
                <div className={styles.bigRating}>{product.rating}</div>
                <div>
                  <div className={styles.bigStars}>{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</div>
                  <p>Based on {product.reviews} reviews</p>
                </div>
              </div>
              {[5,4,3].map(star => (
                <div key={star} className={styles.ratingBar}>
                  <span>{star} ★</span>
                  <div className={styles.bar}>
                    <div className={styles.barFill} style={{width: star === 5 ? '70%' : star === 4 ? '20%' : '10%'}} />
                  </div>
                  <span>{star === 5 ? '70%' : star === 4 ? '20%' : '10%'}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className={styles.related}>
            <h2 className="section-title">You Might Also <span>Like</span></h2>
            <div className={styles.relatedGrid}>
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
