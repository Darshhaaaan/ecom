import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/About.module.css';

export default function About() {
  return (
    <Layout>
      <Head><title>About – FreshMart</title></Head>

      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <span className="section-label" style={{color:'var(--green-light)'}}>Our Story</span>
          <h1 className={styles.heroTitle}>Growing <em>Together</em></h1>
          <p>We started FreshMart because we believed everyone deserves access to truly fresh, quality produce — not the week-old stuff sitting under fluorescent supermarket lights.</p>
        </div>
      </div>

      <div className={styles.container}>

        {/* Mission */}
        <section className={styles.mission}>
          <div className={styles.missionText}>
            <span className="section-label">Our Mission</span>
            <h2 className="section-title">From Farm to <span>Your Table</span></h2>
            <p>FreshMart was founded with one simple idea: cut the chain. We connect local farms directly with homes, ensuring your produce travels the shortest possible distance and arrives in the best possible condition.</p>
            <p>We partner only with farms that share our values — sustainable practices, fair wages, and a deep respect for the land.</p>
            <Link href="/shop" className="btn btn-primary" style={{marginTop:'16px'}}>Shop Now</Link>
          </div>
          <div className={styles.missionVisual}>
            <div className={styles.emojiGrid}>
              {['🌾','🚜','🌿','🥦','🍅','🚚','🏠','😊'].map((e,i) => (
                <div key={i} className={styles.emojiBox} style={{animationDelay:`${i*0.15}s`}}>{e}</div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className={styles.values}>
          <div className={styles.sectionHead}>
            <span className="section-label">What we stand for</span>
            <h2 className="section-title">Our <span>Values</span></h2>
          </div>
          <div className={styles.valuesGrid}>
            {[
              { icon: '🌱', title: 'Sustainability', desc: 'We offset 100% of our delivery carbon footprint and use only biodegradable packaging.' },
              { icon: '🤝', title: 'Farmer Fairness', desc: 'We pay farmers 40% above market rate. They work hard; they deserve to be rewarded.' },
              { icon: '🔬', title: 'Quality First', desc: 'Every batch is tested for freshness. If it doesn\'t meet our standard, it doesn\'t reach you.' },
              { icon: '🏘️', title: 'Community', desc: 'A portion of every order goes back to rural farming communities and agricultural education.' },
            ].map((v,i) => (
              <div key={i} className={styles.valueCard}>
                <span className={styles.valueIcon}>{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className={styles.team}>
          <div className={styles.sectionHead}>
            <span className="section-label">The people</span>
            <h2 className="section-title">Meet the <span>Team</span></h2>
          </div>
          <div className={styles.teamGrid}>
            {[
              { name: 'Arjun Patel', role: 'Founder & CEO', emoji: '👨‍💼', bio: 'Former farmer turned entrepreneur. Arjun grew up on a mango plantation and knows quality from the root.' },
              { name: 'Priya Singh', role: 'Head of Sourcing', emoji: '👩‍🌾', bio: 'With 12 years in sustainable agriculture, Priya handpicks every farm partner personally.' },
              { name: 'Ravi Kumar', role: 'Operations Lead', emoji: '👨‍🔧', bio: 'Ravi built our cold-chain logistics from scratch. Your produce stays fresh because of him.' },
            ].map((m,i) => (
              <div key={i} className={styles.teamCard}>
                <div className={styles.teamAvatar}>{m.emoji}</div>
                <h3 className={styles.teamName}>{m.name}</h3>
                <p className={styles.teamRole}>{m.role}</p>
                <p className={styles.teamBio}>{m.bio}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </Layout>
  );
}
