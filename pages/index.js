import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { products, categories, testimonials, stats } from '../data/products';
import styles from '../styles/Home.module.css';

function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                setInView(true);
                obs.disconnect();
            }
        }, { threshold });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView];
}

export default function Home() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [heroVisible, setHeroVisible] = useState(false);
    const [statsRef, statsInView] = useInView();
    const [featRef, featInView] = useInView();
    const [testRef, testInView] = useInView();

    useEffect(() => {
        const t = setTimeout(() => setHeroVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    const filtered = activeCategory === 'all' ?
        products.slice(0, 8) :
        products.filter(p => p.category === activeCategory).slice(0, 8);

    return ( <
        Layout >
        <
        Head >
        <
        title > FreshMart– Farm Fresh Delivered < /title> < /
        Head >

        { /* ── HERO ── */ } <
        section className = { styles.hero } >
        <
        div className = { styles.heroBg } >
        <
        div className = { styles.blob1 }
        /> <
        div className = { styles.blob2 }
        /> <
        div className = { styles.blob3 }
        /> < /
        div > <
        div className = { styles.heroInner } >
        <
        div className = { `${styles.heroText} ${heroVisible ? styles.visible : ''}` } >
        <
        span className = { `section-label ${styles.heroLabel}` } > 100 % Farm Fresh < /span> <
        h1 className = { styles.heroTitle } >
        Nature & apos; s Best, < br / >
        <
        em > Delivered < /em> to<br / >
        Your Door <
        /h1> <
        p className = { styles.heroDesc } >
        Hand - picked seasonal fruits, vegetables and herbs straight from local farms.Freshness guaranteed or your money back. <
        /p> <
        div className = { styles.heroCtas } >
        <
        Link href = "/shop"
        className = "btn btn-primary" >
        Shop Now🛒 <
        /Link> <
        Link href = "/about"
        className = "btn btn-secondary" >
        Our Story <
        /Link> < /
        div > <
        div className = { styles.heroPills } >
        <
        span > 🚚Free delivery over₹ 500 < /span> <
        span > 🌱100 % Organic options < /span> <
        span > ⚡Same - day delivery < /span> < /
        div > <
        /div>

        <
        div className = { `${styles.heroVisual} ${heroVisible ? styles.visible : ''}` } >
        <
        div className = { styles.floatGrid } > {
            [
                { e: '🍓', d: '0s', s: '1.1' },
                { e: '🥦', d: '0.4s', s: '0.9' },
                { e: '🥭', d: '0.2s', s: '1.2' },
                { e: '🍋', d: '0.6s', s: '0.8' },
                { e: '🥕', d: '0.3s', s: '1.0' },
                { e: '🍅', d: '0.5s', s: '1.15' },
                { e: '🫐', d: '0.1s', s: '0.95' },
                { e: '🥑', d: '0.7s', s: '1.05' },
                { e: '🌿', d: '0.35s', 's': '1.0' },
            ].map((item, i) => ( <
                div key = { i }
                className = { styles.floatItem }
                style = {
                    {
                        animationDelay: item.d,
                        animationName: i % 2 === 0 ? 'floatA' : 'floatB',
                        fontSize: `${Number(item.s) * 52}px`,
                    }
                } > { item.e } <
                /div>
            ))
        } <
        /div> <
        div className = { styles.freshBadge } >
        <
        span className = { styles.freshNum } > 24 hr < /span> <
        span className = { styles.freshLabel } > Fresh Delivery < /span> < /
        div > <
        /div> < /
        div >

        <
        div className = { styles.heroWave } >
        <
        svg viewBox = "0 0 1440 80"
        preserveAspectRatio = "none" >
        <
        path d = "M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
        fill = "var(--cream)" / >
        <
        /svg> < /
        div > <
        /section>

        { /* ── STATS ── */ } <
        section ref = { statsRef }
        className = { styles.statsSection } >
        <
        div className = { styles.statsInner } > {
            stats.map((s, i) => ( <
                div key = { s.label }
                className = { `${styles.stat} ${statsInView ? styles.statVisible : ''}` }
                style = {
                    { transitionDelay: `${i * 0.1}s` }
                } >
                <
                span className = { styles.statEmoji } > { s.emoji } < /span> <
                span className = { styles.statValue } > { s.value } < /span> <
                span className = { styles.statLabel } > { s.label } < /span> < /
                div >
            ))
        } <
        /div> < /
        section >

        { /* ── CATEGORIES ── */ } <
        section className = { styles.catSection } >
        <
        div className = { styles.container } >
        <
        div className = { styles.sectionHead } >
        <
        span className = "section-label" > Browse by < /span> <
        h2 className = "section-title" > Shop by < span > Category < /span></h
        2 >
        <
        /div> <
        div className = { styles.catGrid } > {
            [
                { id: 'fruits', emoji: '🍎', label: 'Fruits', count: products.filter(p => p.category === 'fruits').length, color: '#ffe8e8' },
                { id: 'vegetables', emoji: '🥦', label: 'Vegetables', count: products.filter(p => p.category === 'vegetables').length, color: '#e8f5e9' },
                { id: 'herbs', emoji: '🌿', label: 'Herbs', count: products.filter(p => p.category === 'herbs').length, color: '#e8f5e0' },
                { id: 'exotic', emoji: '🥭', label: 'Exotic', count: products.filter(p => p.category === 'exotic').length, color: '#fff3e0' },
                { id: 'organic', emoji: '🌱', label: 'Organic', count: products.filter(p => p.organic).length, color: '#e0f2f1' },
            ].map((cat, i) => ( <
                Link key = { cat.id }
                href = { `/shop?category=${cat.id}` }
                className = { styles.catCard }
                style = {
                    { '--cat-bg': cat.color, animationDelay: `${i * 0.1}s` }
                } >
                <
                span className = { styles.catEmoji } > { cat.emoji } < /span> <
                span className = { styles.catLabel } > { cat.label } < /span> <
                span className = { styles.catCount } > { cat.count }
                items < /span> < /
                Link >
            ))
        } <
        /div> < /
        div > <
        /section>

        { /* ── FEATURED PRODUCTS ── */ } <
        section ref = { featRef }
        className = { styles.productsSection } >
        <
        div className = { styles.container } >
        <
        div className = { styles.sectionHead } >
        <
        span className = "section-label" > Handpicked < /span> <
        h2 className = "section-title" > Featured < span > Products < /span></h
        2 >
        <
        /div>

        <
        div className = { styles.filterBar } > {
            categories.map(cat => ( <
                button key = { cat.id }
                className = { `${styles.filterBtn} ${activeCategory === cat.id ? styles.filterActive : ''}` }
                onClick = {
                    () => setActiveCategory(cat.id)
                } > { cat.emoji } { cat.label } <
                /button>
            ))
        } <
        /div>

        <
        div className = { `${styles.productGrid} ${featInView ? styles.gridVisible : ''}` } > {
            filtered.map((p, i) => ( <
                ProductCard key = { p.id }
                product = { p }
                index = { i }
                />
            ))
        } <
        /div>

        <
        div className = { styles.viewAll } >
        <
        Link href = "/shop"
        className = "btn btn-secondary" >
        View All Products→ <
        /Link> < /
        div > <
        /div> < /
        section >

        { /* ── BANNER ── */ } <
        section className = { styles.banner } >
        <
        div className = { styles.bannerInner } >
        <
        div className = { styles.bannerText } >
        <
        span className = "section-label"
        style = {
            { color: 'var(--green-light)' }
        } > Limited time < /span> <
        h2 className = { styles.bannerTitle } > Get 20 % Off Your < br / > < em > First Order < /em></h
        2 >
        <
        p className = { styles.bannerDesc } > Use code < strong > FRESH20 < /strong> at checkout. New customers only.</p >
        <
        Link href = "/shop"
        className = "btn btn-accent" > Claim Offer🎉 < /Link> < /
        div > <
        div className = { styles.bannerEmojis } > {
            ['🍓', '🥭', '🫐', '🍋', '🥑', '🥦', '🌿', '🍅'].map((e, i) => ( <
                span key = { i }
                className = { styles.bannerEmoji }
                style = {
                    { animationDelay: `${i*0.2}s` }
                } > { e } < /span>
            ))
        } <
        /div> < /
        div > <
        /section>

        { /* ── WHY US ── */ } <
        section className = { styles.whySection } >
        <
        div className = { styles.container } >
        <
        div className = { styles.sectionHead } >
        <
        span className = "section-label" > Why choose us < /span> <
        h2 className = "section-title" > The < span > FreshMart < /span> Promise</h
        2 >
        <
        /div> <
        div className = { styles.whyGrid } > {
            [
                { icon: '🌾', title: 'Farm to Table', desc: 'We work directly with local farmers, cutting out middlemen so you get the freshest produce at fair prices.' },
                { icon: '🌡️', title: 'Cold Chain Delivery', desc: 'Our temperature-controlled delivery ensures your produce stays fresh from harvest to your doorstep.' },
                { icon: '♻️', title: 'Eco Packaging', desc: 'All our packaging is 100% biodegradable. We\'re committed to sustainable farming and zero plastic.' },
                { icon: '✅', title: 'Quality Guarantee', desc: 'Not satisfied? We\'ll replace or refund every item — no questions asked. Your satisfaction is our priority.' },
            ].map((item, i) => ( <
                div key = { i }
                className = { styles.whyCard } >
                <
                span className = { styles.whyIcon } > { item.icon } < /span> <
                h3 className = { styles.whyTitle } > { item.title } < /h3> <
                p className = { styles.whyDesc } > { item.desc } < /p> < /
                div >
            ))
        } <
        /div> < /
        div > <
        /section>

        { /* ── TESTIMONIALS ── */ } <
        section ref = { testRef }
        className = { styles.testimonialSection } >
        <
        div className = { styles.container } >
        <
        div className = { styles.sectionHead } >
        <
        span className = "section-label" > Happy customers < /span> <
        h2 className = "section-title" > What People < span > Say < /span></h
        2 >
        <
        /div> <
        div className = { styles.testGrid } > {
            testimonials.map((t, i) => ( <
                div key = { t.id }
                className = { `${styles.testCard} ${testInView ? styles.testVisible : ''}` }
                style = {
                    { transitionDelay: `${i * 0.15}s` }
                } >
                <
                div className = { styles.testStars } > { '★'.repeat(t.rating) } < /div> <
                p className = { styles.testText } > & ldquo; { t.text } & rdquo; < /p> <
                div className = { styles.testAuthor } >
                <
                span className = { styles.testAvatar } > { t.avatar } < /span> <
                div >
                <
                span className = { styles.testName } > { t.name } < /span> <
                span className = { styles.testLocation } > { t.location } < /span> < /
                div > <
                /div> < /
                div >
            ))
        } <
        /div> < /
        div > <
        /section> < /
        Layout >
    );
}