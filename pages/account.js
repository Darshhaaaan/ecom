import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/Account.module.css';

const TABS = ['Profile', 'Orders', 'Addresses', 'Settings'];

const MOCK_ORDERS = [
  { id: 'FM-A3X9KL', date: '28 May 2025', status: 'Delivered', total: 487, items: ['🍓 Strawberries', '🥦 Broccoli', '🥭 Mango'] },
  { id: 'FM-B7Q2MN', date: '14 May 2025', status: 'Delivered', total: 312, items: ['🫐 Blueberries', '🥑 Avocado'] },
  { id: 'FM-C1P8RT', date: '2 May 2025',  status: 'Delivered', total: 198, items: ['🌿 Basil', '🍃 Mint', '🍅 Tomatoes'] },
];

export default function Account() {
  const [tab, setTab] = useState('Profile');
  const [profile, setProfile] = useState({ name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 43210' });

  return (
    <Layout>
      <Head><title>My Account – FreshMart</title></Head>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.sidebar}>
            <div className={styles.avatar}>👩</div>
            <p className={styles.userName}>{profile.name}</p>
            <p className={styles.userEmail}>{profile.email}</p>
            <nav className={styles.nav}>
              {TABS.map(t => (
                <button
                  key={t}
                  className={`${styles.navBtn} ${tab === t ? styles.navActive : ''}`}
                  onClick={() => setTab(t)}
                >
                  {t === 'Profile' && '👤'}
                  {t === 'Orders' && '📦'}
                  {t === 'Addresses' && '📍'}
                  {t === 'Settings' && '⚙️'}
                  {t}
                </button>
              ))}
            </nav>
            <Link href="/shop" className="btn btn-primary" style={{width:'100%', justifyContent:'center', marginTop:'16px', fontSize:'14px'}}>
              🛒 Continue Shopping
            </Link>
          </div>

          <div className={styles.main}>
            {tab === 'Profile' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>My Profile</h2>
                <div className={styles.formGrid}>
                  {[
                    { key: 'name',  label: 'Full Name',     type: 'text' },
                    { key: 'email', label: 'Email Address', type: 'email' },
                    { key: 'phone', label: 'Phone Number',  type: 'tel' },
                  ].map(f => (
                    <div key={f.key} className={styles.field}>
                      <label className={styles.label}>{f.label}</label>
                      <input
                        className={styles.input}
                        type={f.type}
                        value={profile[f.key]}
                        onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
                      />
                    </div>
                  ))}
                </div>
                <button className="btn btn-primary" style={{marginTop:'8px'}}>Save Changes</button>
              </div>
            )}

            {tab === 'Orders' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Order History</h2>
                <div className={styles.orders}>
                  {MOCK_ORDERS.map(order => (
                    <div key={order.id} className={styles.orderCard}>
                      <div className={styles.orderTop}>
                        <div>
                          <p className={styles.orderId}>{order.id}</p>
                          <p className={styles.orderDate}>{order.date}</p>
                        </div>
                        <div className={styles.orderRight}>
                          <span className={styles.orderStatus}>{order.status}</span>
                          <span className={styles.orderTotal}>₹{order.total}</span>
                        </div>
                      </div>
                      <div className={styles.orderItems}>
                        {order.items.map((item, i) => (
                          <span key={i} className={styles.orderItem}>{item}</span>
                        ))}
                      </div>
                      <button className={styles.reorderBtn}>🔄 Reorder</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'Addresses' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Saved Addresses</h2>
                <div className={styles.addressCard}>
                  <div className={styles.addressTop}>
                    <span className={styles.addressDefault}>Default</span>
                    <span>🏠 Home</span>
                  </div>
                  <p>Priya Sharma</p>
                  <p>42, MG Road, Koramangala</p>
                  <p>Bangalore, Karnataka – 560034</p>
                  <p>+91 98765 43210</p>
                  <div className={styles.addressActions}>
                    <button className={styles.editBtn}>Edit</button>
                    <button className={styles.deleteBtn}>Delete</button>
                  </div>
                </div>
                <button className="btn btn-secondary" style={{marginTop:'16px'}}>+ Add New Address</button>
              </div>
            )}

            {tab === 'Settings' && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Settings</h2>
                <div className={styles.settingsGroup}>
                  <h3 className={styles.settingsGroupTitle}>Notifications</h3>
                  {['Email notifications', 'SMS alerts for delivery', 'Weekly fresh deals newsletter', 'Order status updates'].map(s => (
                    <label key={s} className={styles.toggle}>
                      <span>{s}</span>
                      <input type="checkbox" defaultChecked className={styles.toggleInput} />
                    </label>
                  ))}
                </div>
                <div className={styles.settingsGroup}>
                  <h3 className={styles.settingsGroupTitle}>Account</h3>
                  <button className={styles.dangerBtn}>Change Password</button>
                  <button className={styles.dangerBtn} style={{color:'var(--red)'}}>Delete Account</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
