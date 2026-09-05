import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MapPin, ArrowUp, ShieldCheck, Cpu, Layers, Sparkles, Home, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeTab, setActiveTab] = useState('bostanli1');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navVisible, setNavVisible] = useState(false);

  // Animation Refs
  const circleTextRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroBottomRef = useRef(null);
  const quoteSecRef = useRef(null);
  const quoteMarkRef = useRef(null);
  const quoteTextRef = useRef(null);
  const quoteAuthorRef = useRef(null);
  const infoSecRef = useRef(null);
  const infoTabsRef = useRef(null);
  const infoTitleRef = useRef(null);
  const infoSummaryRef = useRef(null);
  const infoCardsRef = useRef(null);
  const infoTaglineRef = useRef(null);
  const contactSecRef = useRef(null);
  const contactStarRef = useRef(null);
  const contactLabelRef = useRef(null);
  const contactPhone1Ref = useRef(null);
  const contactPhone2Ref = useRef(null);
  const contactAddressRef = useRef(null);
  const contactFormRef = useRef(null);

  useEffect(() => {
    // 1. Dönen Monogram (GSAP Infinite Rotation)
    gsap.to(circleTextRef.current, {
      rotation: 360,
      duration: 25,
      repeat: -1,
      ease: 'none'
    });

    // 2. Hero Giriş Animasyonu — cascade
    const heroTl = gsap.timeline({ delay: 0.2 });
    heroTl
      .fromTo(
        heroTitleRef.current,
        { y: 100, opacity: 0, skewY: 3 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.3, ease: 'power4.out' }
      )
      .fromTo(
        heroSubtitleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
        '-=0.9'
      )
      .fromTo(
        heroBottomRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      );

    // 3. Scroll Progress Indicator Update
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.round((window.scrollY / totalHeight) * 100);
        setScrollProgress(progress);
      }
      setNavVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', handleScroll);

    // 4. Quote Section — staggered children
    const anim = (el, from, to) => { if (el) gsap.fromTo(el, from, to); };

    anim(quoteMarkRef.current,
      { y: -30, opacity: 0, scale: 0.7 },
      { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: quoteSecRef.current, start: 'top 80%' } }
    );
    anim(quoteTextRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: quoteSecRef.current, start: 'top 75%' } }
    );
    anim(quoteAuthorRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: quoteSecRef.current, start: 'top 70%' } }
    );

    // 5. Info Section — tabs, title, summary, cards stagger, tagline
    anim(infoTabsRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: infoSecRef.current, start: 'top 80%' } }
    );
    anim(infoTitleRef.current,
      { y: 60, opacity: 0, skewY: 2 },
      { y: 0, opacity: 1, skewY: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: infoTitleRef.current, start: 'top 85%' } }
    );
    anim(infoSummaryRef.current,
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: infoSummaryRef.current, start: 'top 85%' } }
    );

    // Cards staggered — animate children of the grid wrapper
    if (infoCardsRef.current && infoCardsRef.current.children.length > 0) {
      gsap.fromTo(
        infoCardsRef.current.children,
        { y: 70, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: infoCardsRef.current, start: 'top 80%' } }
      );
    }

    anim(infoTaglineRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: infoTaglineRef.current, start: 'top 85%' } }
    );

    // 6. Contact Section — every element slides in
    anim(contactStarRef.current,
      { scale: 0, rotation: -90, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: contactSecRef.current, start: 'top 80%' } }
    );
    anim(contactLabelRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: contactSecRef.current, start: 'top 75%' } }
    );
    anim(contactPhone1Ref.current,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: contactSecRef.current, start: 'top 70%' } }
    );
    anim(contactPhone2Ref.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: contactSecRef.current, start: 'top 68%' } }
    );
    anim(contactAddressRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: contactSecRef.current, start: 'top 65%' } }
    );
    anim(contactFormRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: contactFormRef.current, start: 'top 85%' } }
    );

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const [apiProjects, setApiProjects] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      fetch('http://127.0.0.1:8000/api/projects')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            const map = {};
            data.forEach(p => { map[p.id] = p; });
            setApiProjects(map);
          }
        })
        .catch(() => {});
    }
  }, []);

  const defaultProjectsData = {
    bostanli1: {
      title: "BAYRAKTAR I",
      badge: "SATIŞTA & TESLİME YAKIN",
      location: "Bostanlı Mah. Karşıyaka / İzmir",
      summary: "Bostanlı'da 5 katlı modern daireler. Kaliteli malzeme ve sağlam bina altyapısı."
    },
    bostanli2: {
      title: "BAYRAKTAR II",
      badge: "YENİ PROJE — ÖN SATIŞTA",
      location: "Bostanlı İskele Yakını / İzmir",
      summary: "Bostanlı sahil aksında, modern mimarisi ve kaliteli detaylarıyla yükselen konut projesi."
    }
  };

  const currentProject = (apiProjects && apiProjects[activeTab]) || defaultProjectsData[activeTab];

  return (
    <div className="app-container">

      {/* SABİT ÜST NAVBAR */}
      <nav className={`site-navbar ${navVisible ? 'visible' : ''}`}>
        <div className="navbar-logo">
          BAYRAKTAR İNŞAAT
        </div>
        <a href="tel:05551571881" className="navbar-call-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
          </svg>
          BİZİ ARAYIN
        </a>
      </nav>
      
      {/* SOL SABİT İNDİKATÖR */}
      <div className="left-scroll-indicator">
        <div className="left-scroll-num">
          {String(scrollProgress).padStart(2, '0')}
        </div>
        
        <div className="left-scroll-track">
          <div className="left-scroll-fill" style={{ height: `${scrollProgress}%` }} />
        </div>

        <div className="left-scroll-text">
          KAYDIRIN
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section id="hero" className="hero-section">
        {/* Header */}
        <div className="hero-header">
          {/* Dönen Monogram */}
          <div className="hero-monogram">
            <svg ref={circleTextRef} viewBox="0 0 100 100" style={{ position: 'absolute', width: '100%', height: '100%' }}>
              <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
              <text fill="#FAF8F5" fontSize="8.5" letterSpacing="3" fontWeight="500">
                <textPath href="#circlePath">BAYRAKTAR • İNŞAAT •</textPath>
              </text>
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#FAF8F5"/>
            </svg>
          </div>

          {/* Menü Bağlantıları */}
          <div className="hero-nav-links">
            <a href="#info" className="nav-hero-link active-link">
              PROJE & MALZEME BİLGİLERİ
            </a>
            <a href="tel:05551571881" className="nav-hero-link">
              RANDEVU ALIN
            </a>
            <a href="#contact" className="nav-hero-link">
              İLETİŞİM
            </a>
          </div>
        </div>

        {/* Center Typography */}
        <div className="hero-center">
          <div ref={heroTitleRef} className="hero-title">
            BAYRAKTAR<br />İNŞAAT
          </div>

          <div ref={heroSubtitleRef} className="hero-subtitle">
            Bostanlı
          </div>
        </div>

        {/* Bottom Bar */}
        <div ref={heroBottomRef} className="hero-bottom">
          <div className="hero-bottom-text">
            GELECEĞİ GÜVENLE İNŞA EDİYORUZ
          </div>
        </div>
      </section>

      {/* 2. MİMARİ SLOGAN BÖLÜMÜ */}
      <section ref={quoteSecRef} className="quote-section">
        <div className="quote-container">
          <div ref={quoteMarkRef} className="quote-mark">“</div>
          
          <h2 ref={quoteTextRef} className="quote-text">
            BAYRAKTAR İNŞAAT OLARAK BOSTANLI'DA MÜKEMMEL İŞÇİLİK, KALİTELİ MALZEME VE SAĞLAM MÜHENDİSLİK İLE GELECEĞE GÜVENLİ YAPILAR BIRAKIYORUZ.
          </h2>

          <div ref={quoteAuthorRef} className="quote-author">
            MİMARİ EKİP — BAYRAKTAR İNŞAAT
          </div>
        </div>
      </section>

      {/* ŞANTİYE DURUMU BÖLÜMÜ */}
      <section className="santiye-section">
        <div className="santiye-container">
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ADE80', boxShadow: '0 0 0 3px rgba(74,222,128,0.25)', animation: 'pulse 2s infinite', flexShrink: 0 }} />
          <span className="santiye-text">
            ŞANTİYE DEVAM EDİYOR
          </span>
        </div>
      </section>

      {/* 3. PROJE VE MALZEME BİLGİLERİ BÖLÜMÜ */}
      <section ref={infoSecRef} id="info" className="info-section">
        <div className="info-container">
          
          {/* Proje Seçim Sekmeleri */}
          <div ref={infoTabsRef} className="info-tabs">
            <button
              onClick={() => setActiveTab('bostanli1')}
              className={`info-tab-btn ${activeTab === 'bostanli1' ? 'active' : ''}`}
            >
              BAYRAKTAR I
            </button>
            <button
              onClick={() => setActiveTab('bostanli2')}
              className={`info-tab-btn ${activeTab === 'bostanli2' ? 'active' : ''}`}
            >
              BAYRAKTAR II
            </button>
          </div>

          {/* Başlık ve Özet */}
          <div className="info-header">
            <h2 ref={infoTitleRef} className="info-title">
              {currentProject.title}
            </h2>
            <div className="info-badge">
              {currentProject.location} — {currentProject.badge}
            </div>
            <p ref={infoSummaryRef} className="info-summary">
              {currentProject.summary}
            </p>
          </div>

          <div ref={infoTaglineRef} className="info-tagline">
            BOSTANLI'DA KALİTELİ İŞÇİLİK VE GÜVENLİ YAPILAR
          </div>

        </div>
      </section>

      {/* 4. İLETİŞİM BÖLÜMÜ */}
      <section ref={contactSecRef} id="contact" className="contact-section">
        <div className="contact-container">
          
          <div className="contact-content-center">
            <div ref={contactStarRef} className="contact-star">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#FAF8F5"/>
              </svg>
            </div>

            <div ref={contactLabelRef} className="contact-label">
              DOĞRUDAN SATIŞ & BİLGİ HATTI
            </div>

            {/* Ahmetcan Bayraktar Telefon */}
            <div className="contact-phone-item">
              <div className="contact-person-name">
                AHMETCAN BAYRAKTAR
              </div>
              <a 
                ref={contactPhone1Ref}
                href="tel:05551571881"
                className="contact-phone-link phone-1"
              >
                0555 157 18 81
              </a>
            </div>

            {/* Bülent Bayraktar Telefon */}
            <div className="contact-phone-item">
              <div className="contact-person-name">
                BÜLENT BAYRAKTAR
              </div>
              <a 
                ref={contactPhone2Ref}
                href="tel:05321524295"
                className="contact-phone-link phone-2"
              >
                0532 152 42 95
              </a>
            </div>

            <div ref={contactAddressRef} className="contact-address">
              SATIŞ OFİSİ — AHMETCAN BAYRAKTAR & BÜLENT BAYRAKTAR<br />
              <a 
                href="https://maps.google.com/?q=38.455940,27.104025" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#FAF8F5', textDecoration: 'underline', textUnderlineOffset: '4px' }}
                title="Google Haritalar'da Aç"
              >
                BOSTANLI MAHALLESİ, KARŞIYAKA / İZMİR ↗
              </a>
            </div>
          </div>

          {/* KONUM HARİTASI */}
          <div className="contact-map-wrapper">
            <a 
              href="https://maps.google.com/?q=38.455940,27.104025" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-map-title"
            >
              <MapPin size={14} /> KONUM — BOSTANLI MAH. KARŞIYAKA / İZMİR (HARİTADA AÇ ↗)
            </a>
            <a
              href="https://maps.google.com/?q=38.455940,27.104025"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-map-container"
              title="Google Haritalar'da Yol Tarifi Alın"
            >
              <iframe
                title="Bostanlı Karşıyaka Harita"
                src="https://maps.google.com/maps?q=38.455940,27.104025&z=16&output=embed"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', filter: 'grayscale(40%) sepia(15%)', pointerEvents: 'none' }}
              />
              <div className="contact-map-btn">
                <MapPin size={14} /> HARİTADA AÇ & YOL TARİFİ AL ↗
              </div>
            </a>
          </div>

          {/* Alt Bilgi & Telif */}
          <div className="contact-footer-bar">
            <a href="#hero" style={{ color: '#FAF8F5', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              <ArrowUp size={14} /> YUKARI ÇIK
            </a>

            <div>
              BAYRAKTAR İNŞAAT. ©2026 TÜM HAKLARI SAKLIDIR
            </div>
          </div>

        </div>
      </section>

      {/* SABİT WHATSAPP BUTONU */}
      <a
        href="https://wa.me/905551571881?text=Merhaba%2C%20Bayraktar%20Bostanl%C4%B1%20projesi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fixed-btn"
        title="WhatsApp ile hızlı iletişim"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </div>
  );
}
