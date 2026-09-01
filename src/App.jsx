import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MapPin, ArrowUp, ShieldCheck, Cpu, Layers, Sparkles, Home, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [dayNight, setDayNight] = useState('day');
  const [activeTab, setActiveTab] = useState('bostanli1');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navVisible, setNavVisible] = useState(false);

  // Animation Refs
  const circleTextRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroDayNightRef = useRef(null);
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
        heroDayNightRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.7'
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

  const heroBg = dayNight === 'day'
    ? '/exterior.jpg'
    : '/interior.jpg';

  const [apiProjects, setApiProjects] = useState(null);

  useEffect(() => {
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
    <div style={{ backgroundColor: '#1C2A39', color: '#FAF8F5', minHeight: '100vh', fontFamily: "'Jost', sans-serif" }}>

      {/* SABİT ÜST NAVBAR */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 40px',
        backgroundColor: navVisible ? 'rgba(28,42,57,0.97)' : 'transparent',
        backdropFilter: navVisible ? 'blur(12px)' : 'none',
        borderBottom: navVisible ? '1px solid rgba(250,248,245,0.08)' : 'none',
        transition: 'background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
        pointerEvents: navVisible ? 'all' : 'none',
        opacity: navVisible ? 1 : 0,
      }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', letterSpacing: '3px', textTransform: 'uppercase', color: '#FAF8F5', fontWeight: 400 }}>
          BAYRAKTAR İNŞAAT
        </div>
        <a
          href="tel:05551571881"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            border: '1px solid rgba(250,248,245,0.6)',
            color: '#FAF8F5',
            fontSize: '12px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            fontFamily: "'Jost', sans-serif",
            fontWeight: 500,
            transition: 'background 0.2s ease, border-color 0.2s ease',
            backgroundColor: 'transparent',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(250,248,245,0.12)'; e.currentTarget.style.borderColor = '#FAF8F5'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(250,248,245,0.6)'; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
          </svg>
          BİZİ ARAYIN
        </a>
      </nav>
      
      {/* SOL SABİT İNDİKATÖR (Yazı ve Çizgi Rengi Açık Krem) */}
      <div style={{
        position: 'fixed',
        left: '40px',
        top: '220px',
        bottom: '80px',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        pointerEvents: 'none'
      }}>
        <div style={{ fontSize: '11px', letterSpacing: '2px', fontWeight: 600, color: 'rgba(250,248,245,0.8)' }}>
          {String(scrollProgress).padStart(2, '0')}
        </div>
        
        <div style={{ width: '1px', flex: 1, backgroundColor: 'rgba(250,248,245,0.2)', margin: '15px 0', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${scrollProgress}%`,
            backgroundColor: '#FAF8F5',
            transition: 'height 0.1s ease-out'
          }} />
        </div>

        <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(250,248,245,0.6)' }}>
          KAYDIRIN
        </div>
      </div>

      {/* 1. HERO SECTION (Zemin Lacivert & Açık Krem Metinler) */}
      <section id="hero" style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        backgroundColor: dayNight === 'day' ? '#1C2A39' : '#131F2B',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '30px 40px',
        transition: 'background-color 0.8s cubic-bezier(0.76, 0, 0.24, 1)'
      }}>

        {/* Header */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {/* Dönen Monogram */}
          <div style={{ position: 'relative', width: '95px', height: '95px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
            <a href="#info" className="nav-hero-link active-link" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '16px',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              PROJE & MALZEME BİLGİLERİ
            </a>
            <a href="tel:05551571881" className="nav-hero-link" style={{
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              RANDEVU ALIN
            </a>
            <a href="#contact" className="nav-hero-link" style={{
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              İLETİŞİM
            </a>
          </div>
        </div>

        {/* Center Typography */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', margin: 'auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            ref={heroTitleRef}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(56px, 9vw, 130px)',
              lineHeight: '0.85',
              letterSpacing: '2px',
              fontWeight: 400,
              color: '#FAF8F5',
              textTransform: 'uppercase',
              textShadow: '0 4px 30px rgba(0,0,0,0.3)'
            }}
          >
            BAYRAKTAR<br />İNŞAAT
          </div>

          <div
            ref={heroSubtitleRef}
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: 'clamp(48px, 8vw, 110px)',
              color: '#FAF8F5',
              marginTop: '-35px',
              marginBottom: '20px',
              textShadow: '0 2px 20px rgba(0,0,0,0.4)'
            }}
          >
            Bostanlı
          </div>

          {/* GÜNDÜZ / GECE Butonu */}
          <div ref={heroDayNightRef} style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(250,248,245,0.9)' }}>
            <button onClick={() => setDayNight('day')} style={{ background: 'none', border: 'none', color: dayNight === 'day' ? '#FAF8F5' : 'rgba(250,248,245,0.5)', fontWeight: dayNight === 'day' ? 700 : 400, cursor: 'pointer' }}>
              GÜNDÜZ
            </button>
            <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(250,248,245,0.5)' }} />
            <button onClick={() => setDayNight('night')} style={{ background: 'none', border: 'none', color: dayNight === 'night' ? '#FAF8F5' : 'rgba(250,248,245,0.5)', fontWeight: dayNight === 'night' ? 700 : 400, cursor: 'pointer' }}>
              GECE
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div ref={heroBottomRef} style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(16px, 2vw, 26px)', letterSpacing: '4px', textTransform: 'uppercase', color: '#FAF8F5', fontWeight: 500, textAlign: 'center' }}>
            GELECEĞİ GÜVENLE İNŞA EDİYORUZ
          </div>
        </div>
      </section>

      {/* 2. MİMARİ SLOGAN BÖLÜMÜ (Zemin Koyu Lacivert / #152230) */}
      <section ref={quoteSecRef} style={{ padding: '160px 40px 160px 140px', backgroundColor: '#152230', borderBottom: '1px solid rgba(250,248,245,0.1)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          
          <div ref={quoteMarkRef} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '64px', color: 'rgba(250,248,245,0.4)', marginBottom: '20px' }}>“</div>
          
          <h2 ref={quoteTextRef} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(24px, 3.2vw, 46px)',
            fontWeight: 400,
            lineHeight: 1.35,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#FAF8F5',
            marginBottom: '40px'
          }}>
            BAYRAKTAR İNŞAAT OLARAK BOSTANLI'DA MÜKEMMEL İŞÇİLİK, KALİTELİ MALZEME VE SAĞLAM MÜHENDİSLİK İLE GELECEĞE GÜVENLİ YAPILAR BIRAKIYORUZ.
          </h2>

          <div ref={quoteAuthorRef} style={{ fontSize: '12px', letterSpacing: '2px', color: 'rgba(250,248,245,0.85)', textTransform: 'uppercase' }}>
            MİMARİ EKİP — BAYRAKTAR İNŞAAT
          </div>
        </div>
      </section>

      {/* ŞANTİYE DURUMU BÖLÜMÜ */}
      <section style={{ backgroundColor: '#1C2A39', borderBottom: '1px solid rgba(250,248,245,0.08)', padding: '48px 40px 48px 140px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4ADE80', boxShadow: '0 0 0 3px rgba(74,222,128,0.25)', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(250,248,245,0.75)', fontFamily: "'Jost', sans-serif" }}>
            ŞANTİYE DEVAM EDİYOR
          </span>
        </div>
      </section>


      {/* 3. PROJE VE MALZEME BİLGİLERİ BÖLÜMÜ (AÇIK MAVİ / GRİ ZEMİN: #ADC4CE, YAZILAR LACİVERT: #1C2A39) */}
      <section ref={infoSecRef} id="info" style={{
        backgroundColor: '#ADC4CE',
        color: '#1C2A39',
        padding: '140px 40px 140px 140px',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          {/* Proje Seçim Sekmeleri */}
          <div ref={infoTabsRef} style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '40px' }}>
            <button
              onClick={() => setActiveTab('bostanli1')}
              style={{
                background: 'none', border: 'none',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '16px', letterSpacing: '2px', cursor: 'pointer',
                color: activeTab === 'bostanli1' ? '#1C2A39' : 'rgba(28, 42, 57, 0.4)',
                borderBottom: activeTab === 'bostanli1' ? '2px solid #1C2A39' : '2px solid transparent',
                paddingBottom: '6px'
              }}
            >
              BAYRAKTAR I
            </button>
            <button
              onClick={() => setActiveTab('bostanli2')}
              style={{
                background: 'none', border: 'none',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '16px', letterSpacing: '2px', cursor: 'pointer',
                color: activeTab === 'bostanli2' ? '#1C2A39' : 'rgba(28, 42, 57, 0.4)',
                borderBottom: activeTab === 'bostanli2' ? '2px solid #1C2A39' : '2px solid transparent',
                paddingBottom: '6px'
              }}
            >
              BAYRAKTAR II
            </button>
          </div>

          {/* Başlık ve Özet */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 ref={infoTitleRef} style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(36px, 5vw, 76px)',
              fontWeight: 400,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              lineHeight: 1,
              marginBottom: '16px'
            }}>
              {currentProject.title}
            </h2>
            <div style={{ fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 600, opacity: 0.9 }}>
              {currentProject.location} — {currentProject.badge}
            </div>
            <p ref={infoSummaryRef} style={{ maxWidth: '750px', margin: '0 auto', fontSize: '16px', lineHeight: 1.8, opacity: 0.95 }}>
              {currentProject.summary}
            </p>
          </div>

          <div ref={infoTaglineRef} style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(20px, 2.8vw, 34px)',
            textAlign: 'center',
            textTransform: 'uppercase',
            marginTop: '60px',
            lineHeight: 1.3
          }}>
            BOSTANLI'DA KALİTELİ İŞÇİLİK VE GÜVENLİ YAPILAR
          </div>

        </div>
      </section>

      {/* 4. İLETİŞİM BÖLÜMÜ (DERİN BORDO / PLUM ZEMİN: #2A0D18) */}
      <section ref={contactSecRef} id="contact" style={{
        backgroundColor: '#2A0D18',
        color: '#FAF8F5',
        padding: '140px 40px 80px 140px',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div ref={contactStarRef} style={{ width: '40px', height: '40px', margin: '0 auto 24px auto', color: '#FAF8F5' }}>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#FAF8F5"/>
              </svg>
            </div>

            <div ref={contactLabelRef} style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.85, marginBottom: '16px' }}>
              DOĞRUDAN SATIŞ & BİLGİ HATTI
            </div>

            {/* Ahmetcan Bayraktar Telefon */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase', opacity: 0.9, marginBottom: '6px', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
                AHMETCAN BAYRAKTAR
              </div>
              <a 
                ref={contactPhone1Ref}
                href="tel:05551571881"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(36px, 6vw, 76px)',
                  color: '#FAF8F5',
                  textDecoration: 'none',
                  display: 'block',
                  lineHeight: 1.1,
                }}
              >
                0555 157 18 81
              </a>
            </div>

            {/* Bülent Bayraktar Telefon */}
            <div>
              <div style={{ fontSize: '14px', letterSpacing: '0.5px', textTransform: 'uppercase', opacity: 0.9, marginBottom: '6px', fontFamily: "'Jost', sans-serif", fontWeight: 500 }}>
                BÜLENT BAYRAKTAR
              </div>
              <a 
                ref={contactPhone2Ref}
                href="tel:05321524295"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(28px, 4.5vw, 56px)',
                  color: 'rgba(250, 248, 245, 0.85)',
                  textDecoration: 'none',
                  display: 'block',
                  lineHeight: 1.1
                }}
              >
                0532 152 42 95
              </a>
            </div>

            <div ref={contactAddressRef} style={{ fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '24px', opacity: 0.9 }}>
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


          {/* KONUM HARİTASI (Tıklayınca Doğrudan Google Maps Açılır) */}
          <div style={{ marginBottom: '60px' }}>
            <a 
              href="https://maps.google.com/?q=38.455940,27.104025" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textAlign: 'center',
                opacity: 0.85,
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                color: '#FAF8F5',
                textDecoration: 'none'
              }}
            >
              <MapPin size={14} /> KONUM — BOSTANLI MAH. KARŞIYAKA / İZMİR (HARİTADA AÇ ↗)
            </a>
            <a
              href="https://maps.google.com/?q=38.455940,27.104025"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', position: 'relative', width: '100%', paddingBottom: '38%', border: '1px solid rgba(250,248,245,0.2)', overflow: 'hidden', cursor: 'pointer' }}
              title="Google Haritalar'da Yol Tarifi Alın"
            >
              <iframe
                title="Bostanlı Karşıyaka Harita"
                src="https://maps.google.com/maps?q=38.455940,27.104025&z=16&output=embed"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', filter: 'grayscale(40%) sepia(15%)', pointerEvents: 'none' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                backgroundColor: 'rgba(28, 42, 57, 0.92)',
                color: '#FAF8F5',
                padding: '10px 18px',
                fontSize: '11px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                border: '1px solid rgba(250,248,245,0.3)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 500,
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
              }}>
                <MapPin size={14} /> HARİTADA AÇ & YOL TARİFİ AL ↗
              </div>
            </a>
          </div>

          {/* Alt Bilgi & Telif */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(250, 248, 245, 0.15)', paddingTop: '32px', fontSize: '12px', opacity: 0.8, flexWrap: 'wrap', gap: '16px' }}>
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
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          zIndex: 999,
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.12)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,211,102,0.6)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.45)'; }}
        title="WhatsApp ile hızlı iletişim"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </div>
  );
}
