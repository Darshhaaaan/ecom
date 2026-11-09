import React from 'react';
import styles from '../styles/LandingAnimation.module.css';

export default function LandingAnimation({ children }) {
  return (
    <>
      {/* 1. FreshMart Entrance Curtain Loader Animation */}
      <div className={styles.loaderOverlay}>
        <div className={styles.loaderLogoWrap}>
          <div className={styles.loaderIcon}>🌿</div>
          <div className={styles.loaderTitle}>
            Fresh<span>Mart</span>
          </div>
          <div className={styles.loaderSubtitle}>Farm Fresh Delivered</div>
        </div>
      </div>

      {/* 2. Website Content Wrapper */}
      <div className={styles.pageContent}>
        {children}
      </div>
    </>
  );
}