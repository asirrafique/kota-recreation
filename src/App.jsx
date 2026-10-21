import {
  ArrowDown,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import './App.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    number: '01',
    name: 'Goodside',
    type: 'Brand world · Digital',
    theme: 'goodside',
    year: '2026',
    description: 'A fresh identity for a new generation.',
    image:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=85',
  },
  {
    number: '02',
    name: 'Future Folk',
    type: 'Strategy · E-commerce',
    theme: 'futurefolk',
    year: '2025',
    description: 'Turning bold ideas into digital experiences.',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
  },
  {
    number: '03',
    name: 'Form & Field',
    type: 'Identity · Digital',
    theme: 'formfield',
    year: '2025',
    description: 'A distinctive brand built to stand apart.',
    image:
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=85',
  },
];

const services = [
  {
    number: '01',
    name: 'Brand strategy & identity',
    tags: ['Brand strategy', 'Brand identity design', 'Tone of voice'],
    detail:
      'When growth pulls at it, new audiences dilute it, and good intentions blur it, we’ll strengthen your brand with clear decisions that feel inevitable.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=80',
  },
  {
    number: '02',
    name: 'Web design & development',
    tags: ['Creative web design', 'Web development', 'WordPress & CMS'],
    detail:
      'Crafting digital experiences where beauty meets ROI, turning heads and unlocking revenue potential with every click.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
  },
  {
    number: '03',
    name: 'Growth marketing',
    tags: ['SiteCare', 'SEO & GEO', 'Copywriting'],
    detail:
      'SEO & AI search, content creation, copywriting, and ongoing support. Whatever you need, get seen and make it count with work that moves, connects and performs.',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1000&q=80',
  },
];

const clients = [
  'PENGUIN BOOKS',
  'TRIBE',
  'WAGAMAMA',
  'JAMIE OLIVER',
  'BAFTA',
  'BRITISH RED CROSS',
  'DIAGEO',
  'SAATCHI ART',
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [showProjectCta, setShowProjectCta] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const root = useRef(null);

  // 1. Lenis Smooth Scrolling Integration
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  // 2. Floating CTA visibility observer
  useEffect(() => {
    const hero = root.current?.querySelector('.hero');
    if (!hero) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowProjectCta(!entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // 3. Magnetic Buttons Effect
  useGSAP(
    () => {
      const magneticElements = gsap.utils.toArray('.magnetic');
      const cleanups = magneticElements.map((el) => {
        const onMove = (e) => {
          const rect = el.getBoundingClientRect();
          const relX = e.clientX - (rect.left + rect.width / 2);
          const relY = e.clientY - (rect.top + rect.height / 2);
          gsap.to(el, {
            x: relX * 0.28,
            y: relY * 0.28,
            duration: 0.4,
            ease: 'power3.out',
          });
        };
        const onLeave = () => {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.4)',
          });
        };
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        return () => {
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
        };
      });

      return () => {
        cleanups.forEach((fn) => fn());
      };
    },
    { scope: root }
  );

  // 4. Master Scroll, Marquee, Dark-Mode Shift & Entrance Animations
  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Hero Masked Line-by-Line Reveal
      tl.fromTo(
        '.hero-word',
        { yPercent: 115, rotateZ: 3, opacity: 0 },
        {
          yPercent: 0,
          rotateZ: 0,
          opacity: 1,
          duration: 1.25,
          stagger: 0.14,
          ease: 'expo.out',
        }
      ).fromTo(
        '.hero-copy, .award-strip > div, .hero-cue, .hero-side-note',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.7'
      );

      // Hero Scroll-Scrubbed kinetic typography shift
      gsap.to('.title-row-one', {
        xPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.to('.title-row-two', {
        xPercent: 14,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.to('.title-row-three', {
        xPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      gsap.to('.hero-glow', {
        yPercent: 25,
        scale: 1.18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // KOTA Scroll-Triggered Dark Mode Shift when entering Selected Work
      ScrollTrigger.create({
        trigger: '.work',
        start: 'top 52%',
        end: 'bottom 45%',
        onEnter: () => setIsDarkTheme(true),
        onLeave: () => setIsDarkTheme(false),
        onEnterBack: () => setIsDarkTheme(true),
        onLeaveBack: () => setIsDarkTheme(false),
      });

      // Dual-Direction Kinetic Marquee Scrub
      gsap.to('.marquee-track-left', {
        xPercent: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: '.kinetic-marquee',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      gsap.fromTo(
        '.marquee-track-right',
        { xPercent: -22 },
        {
          xPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.kinetic-marquee',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );

      // Reveal content when entering viewport
      gsap.utils.toArray('.reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 48, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Section Topline Divider Draw Animation
      gsap.utils.toArray('.section-topline').forEach((topline) => {
        gsap.fromTo(
          topline,
          { '--line-scale': 0 },
          {
            '--line-scale': 1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: topline,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Staggered Brand Pillars
      gsap.fromTo(
        '.pillar',
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.brand-pillars',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Deep Parallax on Project Cards & Images
      gsap.utils.toArray('.project-card').forEach((card, index) => {
        const frame = card.querySelector('.project-image-frame');
        if (frame) {
          gsap.fromTo(
            frame,
            { scale: 1.14, yPercent: -8 },
            {
              scale: 1,
              yPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          );
        }

        if (index === 2 && window.innerWidth > 900) {
          gsap.fromTo(
            card,
            { y: 70 },
            {
              y: -30,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }
      });

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.utils.toArray('.service-card-item').forEach((card) => {
          const content = card.querySelectorAll(
            '.service-card-num, .service-card-heading, .service-tags, .service-card-desc, .service-find-more'
          );
          const artwork = card.querySelector('.artwork-window');

          gsap.fromTo(
            content,
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.75,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 76%',
                once: true,
              },
            }
          );

          if (artwork) {
            gsap.fromTo(
              artwork,
              { yPercent: 3 },
              {
                yPercent: -3,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.8,
                },
              }
            );
          }
        });
      }

      // Contact Orb Scroll Float
      gsap.fromTo(
        '.contact-orb',
        { yPercent: -25, scale: 0.85 },
        {
          yPercent: 15,
          scale: 1.1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.contact',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

    },
    { scope: root }
  );

  const closeMenu = () => {
    if (!menuOpen) return;
    setMenuOpen(false);
    setMenuClosing(true);
  };

  const finishMenuClose = (event) => {
    if (
      event.target === event.currentTarget &&
      event.propertyName === 'opacity' &&
      menuClosing
    ) {
      setMenuClosing(false);
    }
  };

  return (
    <main
      ref={root}
      className={isDarkTheme ? 'theme-dark' : 'theme-light'}
    >
      {/* Navigation */}
      <header
        className={`site-header${
          menuOpen || menuClosing ? ' is-open' : ''
        }${menuClosing ? ' is-closing' : ''}`}
      >
        <a
          className="brand-mark magnetic"
          href="#home"
          aria-label="Kota home"
          onClick={closeMenu}
        >
          <span>K</span>
          <span>O</span>
          <span>T</span>
          <span>A</span>
        </a>

        {/* Inline right next to the brand mark */}
        <p className="header-note">
          CELEBRATING 13 YEARS : 2013 - 2026
        </p>

        <a
          href="#contact"
          className="hire-link magnetic"
        >
          <span className="btn-text-wrap">
            <span className="btn-text-primary">Hire us</span>
            <span className="btn-text-clone" aria-hidden="true">
              Hire us
            </span>
          </span>
          <ArrowRight size={16} />
        </a>

        <button
          className="menu-toggle magnetic"
          type="button"
          onClick={() => {
            if (menuOpen) {
              closeMenu();
            } else {
              setMenuClosing(false);
              setMenuOpen(true);
            }
          }}
          aria-label={
            menuOpen ? 'Close navigation' : 'Open navigation'
          }
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X size={24} strokeWidth={1.6} />
          ) : (
            <Menu size={25} strokeWidth={1.6} />
          )}
        </button>

        <button
          className="menu-backdrop"
          type="button"
          aria-label="Close navigation"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
        />

        <nav
          className="menu-panel"
          aria-hidden={!menuOpen}
          onTransitionEnd={finishMenuClose}
        >
          <a href="#work" onClick={closeMenu}>
            Work
          </a>
          <a href="#about" onClick={closeMenu}>
            Agency
          </a>
          <a href="#services" onClick={closeMenu}>
            Services <span className="menu-plus">+</span>
          </a>
          <a href="#work" onClick={closeMenu}>
            Blog
          </a>
          <a href="#about" onClick={closeMenu}>
            Culture
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
          <a
            href="#contact"
            className="menu-project-cta"
            onClick={closeMenu}
          >
            Start your project <ArrowRight size={22} />
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-title" aria-label="Rebel against boring.">
          <div className="title-row title-row-one">
            <span className="hero-word">rebel</span>
          </div>

          <div className="title-row title-row-two">
            <span className="hero-word">against</span>
          </div>

          <div className="title-row title-row-three">
            <span className="hero-word">
              boring
            </span>
          </div>
        </div>

        <p className="hero-copy">
          A global branding agency and creative web design studio based in
          London,{' '}
          <strong>
            where strategic-thinkers give bold brands their edge.
          </strong>
        </p>

        <span className="hero-side-note" aria-hidden="true">
          LDN / NYC
        </span>

        <div
          className="award-strip"
          aria-label="Agency awards and recognition"
        >
          <div className="award-dan">
            <span>DAN</span>
            <small>
              DIGITAL AGENCY
              <br />
              NETWORK
            </small>
          </div>

          <div className="award-clutch">
            <span>Clutch</span>
            <small>HIRING&apos;S BEST DIGITAL</small>
          </div>

          <div className="award-awwwards">
            <span>
              AWWWARDS<sup>®</sup>
            </span>
            <small>HONORABLE MENTION</small>
          </div>

          <div className="award-design">
            <span>✳</span>
            <small>
              DESIGN
              <br />
              AWARDS
            </small>
          </div>
        </div>

        <a
          className="hero-cue magnetic"
          href="#work"
          aria-label="Scroll to selected work"
        >
          <span>Scroll to explore</span>
          <span className="circle-arrow">
            <ArrowDown size={19} />
          </span>
        </a>
      </section>

      {/* About */}
      <section className="intro section-wrap" id="about">
        <div className="section-topline">
          <span>01 / A little about us</span>
          <span>Small enough to care. Big enough to deliver.</span>
        </div>

        <div className="intro-content">
          <h2 className="intro-title reveal">
            Shaping how global
            <br />
            brands are seen, trusted,
            <br />
            and remembered.
          </h2>

          <div className="intro-aside reveal">
            <p>
              There are moments of change for every brand, whether it&apos;s
              rapid growth, new goals, or new expectations. That&apos;s where our
              work begins.
            </p>
          </div>
        </div>

        <div className="brand-pillars">
          <article className="pillar reveal">
            <span className="pillar-num">01 —</span>
            <div className="pillar-text">
              <h3>
                Brand
                <br />
                Clarity
              </h3>
              <p>Decisions that help brands re-position and commit.</p>
            </div>
          </article>

          <div className="pillar-separator" aria-hidden="true">
            ×
          </div>

          <article className="pillar reveal">
            <span className="pillar-num">02 —</span>
            <div className="pillar-text">
              <h3>
                Creative
                <br />
                Craft
              </h3>
              <p>Visually confident design built to stand out.</p>
            </div>
          </article>

          <div className="pillar-separator" aria-hidden="true">
            ×
          </div>

          <article className="pillar reveal">
            <span className="pillar-num">03 —</span>
            <div className="pillar-text">
              <h3>
                Commercial
                <br />
                Momentum
              </h3>
              <p>Scalable systems with growth in mind.</p>
            </div>
          </article>
        </div>
      </section>

      {/* KOTA Dual-Direction Kinetic Marquee */}
      <section className="kinetic-marquee" aria-label="Agency capabilities">
        <div className="marquee-row">
          <div className="marquee-track marquee-track-left">
            {[1, 2, 3, 4].map((n) => (
              <span className="marquee-item" key={`left-${n}`}>
                BRANDING <em>✳</em> DIGITAL EXPERIENCES <em>✳</em> E-COMMERCE{' '}
                <em>✳</em>
              </span>
            ))}
          </div>
        </div>

        <div className="marquee-row">
          <div className="marquee-track marquee-track-right">
            {[1, 2, 3, 4].map((n) => (
              <span className="marquee-item marquee-outline" key={`right-${n}`}>
                REBEL AGAINST BORING <em>✳</em> MAKE DIGITAL MATTER <em>✳</em>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Selected work (Triggers Dark Mode Shift) */}
      <section className="work section-wrap" id="work">
        <div className="section-topline">
          <span>02 / Selected work</span>
          <span>Good people. Brave ideas. Better outcomes.</span>
        </div>

        <div className="work-grid">
          {projects.map((project, idx) => (
            <a
              className={`project-card reveal ${project.theme}${
                idx === 0 ? ' project-featured' : ''
              }`}
              href="#contact"
              key={project.number}
            >
              <div className="project-art">
                <div className="project-image-frame">
                  <img
                    className="project-image"
                    src={project.image}
                    alt={`${project.name} creative portfolio artwork`}
                    loading="lazy"
                  />
                </div>

                <div className="project-image-overlay">
                  <span>{project.type}</span>
                  <strong>{project.name}</strong>
                  <span className="project-open">
                    <ArrowUpRight size={21} />
                  </span>
                </div>
              </div>

              <div className="project-caption">
                <div>
                  <span>
                    {project.number} / {project.name}
                  </span>
                  <p>{project.description}</p>
                </div>

                <span>
                  {project.type} · {project.year}
                </span>
              </div>
            </a>
          ))}
        </div>

        <a
          className="all-work-link reveal"
          href="#contact"
        >
          More of the good stuff <ArrowRight size={17} />
        </a>

        {/* Continuous Client Logo Ticker */}
        <div className="client-ticker" aria-label="Selected clients">
          <p className="client-ticker-label">
            TRUSTED BY AMBITIOUS BRANDS GLOBALLY
          </p>
          <div className="client-ticker-mask">
            <div className="client-ticker-track">
              {[...clients, ...clients].map((client, i) => (
                <span className="client-pill" key={`${client}-${i}`}>
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services section-wrap" id="services">
        <div className="section-topline">
          <span>03 / What we do</span>
          <span>Curiosity, craft and a little bit of nerve.</span>
        </div>

        <div className="services-header-area">
          <h2 className="services-title reveal">
            OUR
            <br />
            SERVICES
          </h2>
          <div className="services-header-arrow reveal" aria-hidden="true">
            <ArrowDownLeft size={36} strokeWidth={1.5} />
          </div>
        </div>

        <div className="services-cards-stack">
          {services.map((service) => (
            <div className="service-card-item reveal" key={service.number}>
              <div className="service-card-inner">
                <div className="service-card-content">
                  <span className="service-card-num">{service.number} —</span>
                  <h3 className="service-card-heading">{service.name}</h3>

                  <div className="service-tags">
                    {service.tags.map((tag) => (
                      <span className="service-tag" key={tag}>{tag}</span>
                    ))}
                  </div>

                  <p className="service-card-desc">{service.detail}</p>

                  <a href="#contact" className="service-find-more">
                    Find out more <ArrowRight size={16} />
                  </a>
                </div>

                <div className="service-card-art">
                  <div className="artwork-window">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="service-art-main"
                      loading="lazy"
                    />
                    <div className="artwork-floating-badge">
                      <span>KOTA WORK</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="contact section-wrap" id="contact">
        <div className="contact-orb" aria-hidden="true" />

        <div className="section-topline">
          <span>04 / Your move</span>
          <span>Have a good one in mind?</span>
        </div>

        <div className="contact-content reveal">
          <p>Let&apos;s make a little noise.</p>

          <a
            href="mailto:hello@kota.co.uk"
            className="contact-title"
          >
            Tell us
            <br />
            what&apos;s next<sup>↗</sup>
          </a>

          <a
            className="contact-email"
            href="mailto:hello@kota.co.uk"
          >
            hello@kota.co.uk <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <a
          className="brand-mark footer-mark"
          href="#home"
          aria-label="Kota home"
        >
          <span>K</span>
          <span>O</span>
          <span>T</span>
          <span>A</span>
        </a>

        <span>Independent thinking. Unmistakable digital.</span>

        <a href="#home">Back to the top ↑</a>

        <span className="copyright">© KOTA 2026</span>
      </footer>

      {/* Floating call to action */}
      <a
        className={`floating-cta magnetic${
          showProjectCta ? ' is-visible' : ''
        }`}
        href="#contact"
      >
        Start your project <ArrowRight size={18} />
      </a>
    </main>
  );
}