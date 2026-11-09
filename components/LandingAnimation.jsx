import React from 'react';

export default function LandingAnimation({ children }) {
  return (
    <>
      {/* All-in-one styles for the landing animation and content reveal */}
      <style jsx>{`
        .loader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #14532d;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: curtainUp 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards 1.2s;
        }

        .loader-logo-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          animation: scaleIn 0.8s ease-out;
        }

        .loader-icon {
          font-size: 3.5rem;
          animation: bounceIcon 1.0s infinite alternate ease-in-out;
        }

        .loader-title {
          color: #ffffff;
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .loader-title span {
          color: #4ade80;
        }

        .loader-subtitle {
          color: #bbf7d0;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .page-content {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInPage 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards 1.4s;
        }

        @keyframes scaleIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes bounceIcon {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }

        @keyframes curtainUp {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; visibility: hidden; }
        }

        @keyframes fadeInPage {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* 1. Entrance Curtain Splash Screen */}
      <div className="loader-overlay">
        <div className="loader-logo-wrap">
          <div className="loader-icon">🌿</div>
          <div className="loader-title">
            Fresh<span>Mart</span>
          </div>
          <div className="loader-subtitle">Farm Fresh Delivered</div>
        </div>
      </div>

      {/* 2. Main Staggered Page Content */}
      <div className="page-content">
        {children}
      </div>
    </>
  );
}