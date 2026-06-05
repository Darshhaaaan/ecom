import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';
import styles from '../styles/Checkout.module.css';

const STEPS = ['Cart Review', 'Delivery', 'Payment', 'Confirmation'];

export default function Checkout() {
  const { items, totalPrice, dispatch } = useCart();
  const { addToast } = useToast();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', pincode: '', state: '',
    payMethod: 'card',
    cardNum: '', cardName: '', expiry: '', cvv: '',
  });
  const [placed, setPlaced] = useState(false);

  const delivery = totalPrice >= 500 ? 0 : 49;
  const total = totalPrice + delivery;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handlePlaceOrder = () => {
    dispatch({ type: 'CLEAR_CART' });
    setPlaced(true);
    setStep(3);
    addToast('Order placed successfully! 🎉', '🎊');
  };

  return (
    <Layout>
      <Head><title>Checkout – FreshMart</title></Head>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.stepsBar}>
            {STEPS.map((s, i) => (
              <div key={s} className={`${styles.step} ${i <= step ? styles.stepDone : ''} ${i === step ? styles.stepActive : ''}`}>
                <div className={styles.stepNum}>{i < step ? '✓' : i + 1}</div>
                <span>{s}</span>
              </div>
            ))}
          </div>

          {step === 3 ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>🎊</div>
              <h2>Order Confirmed!</h2>
              <p>Thank you for your order! We&apos;ll have your fresh produce delivered soon.</p>
              <p className={styles.orderId}>Order ID: FM-{Math.random().toString(36).substr(2,8).toUpperCase()}</p>
              <Link href="/shop" className="btn btn-primary" style={{marginTop:'24px'}}>Continue Shopping</Link>
            </div>
          ) : (
            <div className={styles.layout}>
              <div className={styles.main}>
                {step === 0 && (
                  <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Review Your Cart</h2>
                    {items.length === 0 ? (
                      <div className={styles.emptyCart}>
                        <p>Your cart is empty.</p>
                        <Link href="/shop" className="btn btn-primary">Go Shopping</Link>
                      </div>
                    ) : (
                      <>
                        {items.map(item => (
                          <div key={item.id} className={styles.cartItem}>
                            <span className={styles.itemEmoji}>{item.emoji}</span>
                            <div className={styles.itemInfo}>
                              <p className={styles.itemName}>{item.name}</p>
                              <p className={styles.itemUnit}>{item.unit}</p>
                            </div>
                            <div className={styles.itemQtyPrice}>
                              <span className={styles.itemQty}>×{item.quantity}</span>
                              <span className={styles.itemPrice}>₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                        <button className="btn btn-primary" style={{width:'100%',justifyContent:'center',marginTop:'24px'}} onClick={() => setStep(1)}>
                          Continue to Delivery →
                        </button>
                      </>
                    )}
                  </div>
                )}

                {step === 1 && (
                  <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Delivery Details</h2>
                    <div className={styles.formGrid}>
                      {[
                        { key: 'firstName', label: 'First Name', placeholder: 'John' },
                        { key: 'lastName', label: 'Last Name', placeholder: 'Doe' },
                        { key: 'email', label: 'Email', placeholder: 'john@email.com', full: true },
                        { key: 'phone', label: 'Phone', placeholder: '+91 98765 43210' },
                        { key: 'address', label: 'Address', placeholder: '123 Street, Area', full: true },
                        { key: 'city', label: 'City', placeholder: 'Bangalore' },
                        { key: 'pincode', label: 'Pincode', placeholder: '560001' },
                        { key: 'state', label: 'State', placeholder: 'Karnataka' },
                      ].map(f => (
                        <div key={f.key} className={`${styles.field} ${f.full ? styles.fieldFull : ''}`}>
                          <label className={styles.label}>{f.label}</label>
                          <input
                            className={styles.input}
                            placeholder={f.placeholder}
                            value={form[f.key]}
                            onChange={e => set(f.key, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className={styles.btnRow}>
                      <button className="btn btn-secondary" onClick={() => setStep(0)}>← Back</button>
                      <button className="btn btn-primary" onClick={() => setStep(2)}>Continue to Payment →</button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Payment Method</h2>
                    <div className={styles.payMethods}>
                      {[
                        { id: 'card', label: '💳 Credit / Debit Card' },
                        { id: 'upi', label: '📱 UPI' },
                        { id: 'netbanking', label: '🏦 Net Banking' },
                        { id: 'cod', label: '💵 Cash on Delivery' },
                      ].map(m => (
                        <label key={m.id} className={`${styles.payOption} ${form.payMethod === m.id ? styles.payActive : ''}`}>
                          <input
                            type="radio"
                            name="payMethod"
                            value={m.id}
                            checked={form.payMethod === m.id}
                            onChange={() => set('payMethod', m.id)}
                          />
                          {m.label}
                        </label>
                      ))}
                    </div>

                    {form.payMethod === 'card' && (
                      <div className={styles.cardForm}>
                        <div className={styles.field} style={{gridColumn:'1/-1'}}>
                          <label className={styles.label}>Card Number</label>
                          <input className={styles.input} placeholder="1234 5678 9012 3456" value={form.cardNum} onChange={e => set('cardNum', e.target.value)} maxLength={19} />
                        </div>
                        <div className={styles.formGrid}>
                          <div className={styles.field}>
                            <label className={styles.label}>Card Holder Name</label>
                            <input className={styles.input} placeholder="John Doe" value={form.cardName} onChange={e => set('cardName', e.target.value)} />
                          </div>
                          <div className={styles.field}>
                            <label className={styles.label}>Expiry</label>
                            <input className={styles.input} placeholder="MM/YY" value={form.expiry} onChange={e => set('expiry', e.target.value)} maxLength={5} />
                          </div>
                          <div className={styles.field}>
                            <label className={styles.label}>CVV</label>
                            <input className={styles.input} placeholder="123" value={form.cvv} onChange={e => set('cvv', e.target.value)} maxLength={3} type="password" />
                          </div>
                        </div>
                      </div>
                    )}

                    {form.payMethod === 'upi' && (
                      <div className={styles.upiForm}>
                        <div className={styles.field}>
                          <label className={styles.label}>UPI ID</label>
                          <input className={styles.input} placeholder="yourname@upi" />
                        </div>
                      </div>
                    )}

                    <div className={styles.btnRow}>
                      <button className="btn btn-secondary" onClick={() => setStep(1)}>← Back</button>
                      <button className="btn btn-primary" onClick={handlePlaceOrder}>
                        Place Order – ₹{total.toFixed(2)} 🎉
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary Sidebar */}
              <div className={styles.summarySidebar}>
                <h3 className={styles.summaryTitle}>Order Summary</h3>
                {items.map(item => (
                  <div key={item.id} className={styles.sumItem}>
                    <span>{item.emoji} {item.name}</span>
                    <span>×{item.quantity} — ₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className={styles.sumDivider} />
                <div className={styles.sumRow}><span>Subtotal</span><span>₹{totalPrice.toFixed(2)}</span></div>
                <div className={styles.sumRow}><span>Delivery</span><span style={{color:delivery===0?'var(--green-mid)':'inherit'}}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span></div>
                <div className={`${styles.sumRow} ${styles.sumTotal}`}><span>Total</span><span>₹{total.toFixed(2)}</span></div>
                <div className={styles.secBadge}>🔒 Secure &amp; Encrypted Checkout</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
