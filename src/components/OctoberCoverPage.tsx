import React from 'react';
import { Star, UserCheck } from 'lucide-react';

export function OctoberCoverPage() {
  return (
    <article className="paper cover-paper" aria-label="October Revision Cover Page - Minia British International School">
      <div className="binding" aria-hidden="true" />
      
      {/* Background Watermark & Math Overlay */}
      <div className="cover-watermark-bg" aria-hidden="true" />
      <svg className="cover-math-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1100" aria-hidden="true">
        <text x="70" y="160" fontSize="56" fontFamily="serif" fill="#0b2f5c">∑</text>
        <text x="680" y="180" fontSize="52" fontFamily="serif" fill="#0b2f5c">π</text>
        <text x="80" y="480" fontSize="48" fontFamily="serif" fill="#0b2f5c">√x</text>
        <text x="690" y="520" fontSize="60" fontFamily="serif" fill="#0b2f5c">∞</text>
        <text x="90" y="850" fontSize="50" fontFamily="serif" fill="#0b2f5c">÷</text>
        <text x="670" y="860" fontSize="56" fontFamily="serif" fill="#0b2f5c">×</text>
        <circle cx="110" cy="1000" r="45" stroke="#0b2f5c" strokeWidth="2" fill="none" />
        <polygon points="690,960 740,1030 640,1030" stroke="#0b2f5c" strokeWidth="2" fill="none" />
      </svg>

      {/* Luxury Dual Borders & Corner Ornaments */}
      <div className="cover-border-outer" aria-hidden="true" />
      <div className="cover-border-inner" aria-hidden="true" />
      <div className="cover-corner corner-tl" aria-hidden="true" />
      <div className="cover-corner corner-tr" aria-hidden="true" />
      <div className="cover-corner corner-bl" aria-hidden="true" />
      <div className="cover-corner corner-br" aria-hidden="true" />

      {/* Main Inner Content Layout */}
      <div className="cover-inner-sheet">
        <div className="cover-content-layout">
          
          {/* Header Section: School Name, Motto & Official Crest */}
          <header className="cover-header">
            <h1 className="cover-school-name">Minia British International School</h1>
            <div className="cover-school-slogan">"We Create Leaders"</div>
            <div className="cover-logo-container">
              <img
                src="/mbis_logo.png"
                alt="Minia British International School Official Crest"
                className="cover-logo-img"
                loading="eager"
              />
            </div>
          </header>

          {/* Hero Section: Grade, Subject, Revision Title & Topics */}
          <section className="cover-hero" aria-label="Booklet Subject Information">
            <div className="cover-grade-pill">
              <Star className="star" size={13} fill="#f7d070" />
              <span>Grade 5 · First Term</span>
              <Star className="star" size={13} fill="#f7d070" />
            </div>

            <h2 className="cover-subject-title">Mathematics</h2>

            <div className="cover-title-divider" aria-hidden="true">
              <span className="line" />
              <span className="diamond" />
              <span className="line" />
            </div>

            <div className="cover-revision-banner">
              <div className="cover-revision-title">OCTOBER REVISION</div>
              <p className="cover-revision-subtitle">Comprehensive Curriculum Review & Mastery Practice</p>
            </div>

            <div className="cover-topics-strip" aria-label="Covered Topics">
              <span>Decimals & Place Value</span>
              <span className="bullet">◆</span>
              <span>Powers of 10</span>
              <span className="bullet">◆</span>
              <span>Multiplication & Division</span>
              <span className="bullet">◆</span>
              <span>Problem Solving</span>
            </div>
          </section>

          {/* Teacher attribution */}
          <section className="cover-credits-grid" aria-label="Academic Credits">
            <div className="cover-credit-card prep-card">
              <div className="credit-badge-label">
                <UserCheck size={14} style={{ color: '#0b2f5c' }} />
                <span>Prepared By</span>
              </div>
              <h3 className="credit-name">Mr. Ali Ashraf</h3>
              <p className="credit-role">Mathematics Specialist</p>
            </div>

          </section>

          {/* Footer Metadata */}
          <footer className="cover-footer-strip">
            <span>Academic Year 2026 – 2027</span>
            <span className="footer-meta-badge">October Assessment Booklet</span>
            <span>Minia, Egypt</span>
          </footer>

        </div>
      </div>
    </article>
  );
}
