// HeroExperience.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import LogoCarousel from "./LogoCarousel";

// --- Social links (update to your real URLs) ---
const LINKS = [
  { key: "email", img: "/email.png", alt: "Email", href: "mailto:jessica@example.com" },
  { key: "git", img: "/git.png", alt: "GitHub", href: "https://github.com/yourusername" },
  { key: "linkedin", img: "/linkedin.png", alt: "LinkedIn", href: "https://www.linkedin.com/in/yourusername/" },
];

// --- Experience data ---
const experiences = [
  {
    company: "CIBC",
    role: "Data Scientist",
    dates: "Jan – Apr 2025",
    logo: "/cibc_logo.png",
    alt: "CIBC logo",
    blurb: "Built complex datasets using SAS & Tableau to deliver data-driven insights.",
  },
  {
    company: "CIBC - Capital Markets",
    role: "Business Developer",
    dates: "Sept – Dec 2024",
    logo: "/cibc_logo.png",
    alt: "CIBC logo",
    blurb: "Automated repetitive workflows via Power Automate & VBA.",
  },
  {
    company: "UW Formula Electric",
    role: "Electrical Engineering Designer",
    dates: "2023",
    logo: "/formula_electric_logo.png",
    alt: "UW Formula Electric logo",
    blurb: "Designed PCBs; improved EV performance and reduced energy use.",
  },
  {
    company: "Simplii Financial",
    role: "Operations Analyst",
    dates: "Jan – Apr 2024",
    logo: "/simplii_financial_logo.png",
    alt: "Simplii Financial logo",
    blurb: "Analyzed 10k+ client transactions; prototypes boosted daily ops ~25%.",
  },
  {
    company: "Microsoft - WE Accelerate Program",
    role: "Software Developer",
    dates: "Jan – Apr 2023",
    logo: "/microsoft_logo.webp",
    alt: "Microsoft logo",
    blurb: "Built ML models in Azure ML Studio; prototyped a financial savings app.",
  },
];

// --- Helpers ---
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

function useReveal(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}

function TimelineNode({ company, role, dates, logo, alt, blurb }) {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <article ref={ref} className="timeline-item">
      <div className="timeline-logo">{logo && <img src={logo} alt={alt || company} />}</div>
      <div className="timeline-content">
        <h2>{company}</h2>
        <p style={{ margin: "4px 0 8px 0", fontWeight: 600 }}>
          {role} • {dates}
        </p>
        <p>{blurb}</p>
      </div>
    </article>
  );
}

function FloatingIconDock() {
  const dockRef = useRef(null);
  const [mode, setMode] = useState("horizontal"); // above carousel at start
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [vw, setVw] = useState(0);
  const [vh, setVh] = useState(0);

  // size
  useEffect(() => {
    const onResize = () => {
      setVw(window.innerWidth || 0);
      setVh(window.innerHeight || 0);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // mouse/touch follow
  useEffect(() => {
    const onMove = (e) => {
      setMouseX(e.clientX || 0);
      setMouseY(e.clientY || 0);
    };
    const onTouch = (e) => {
      if (!e.touches?.[0]) return;
      setMouseX(e.touches[0].clientX);
      setMouseY(e.touches[0].clientY);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  // position above carousel + flip to left earlier
  useEffect(() => {
    const hero = document.getElementById("home");
    const anchor = document.getElementById("carousel-anchor");

    const onScroll = () => {
      const heroRect = hero?.getBoundingClientRect();
      const carRect = anchor?.getBoundingClientRect();

      // keep dock just above the carousel while horizontal
      if (dockRef.current && carRect) {
        const desiredTop = Math.max(18, Math.min(vh - 100, carRect.top - 16)); // 16px gap
        dockRef.current.style.setProperty("--dock-top", `${desiredTop}px`);
      }

      // move-left EARLIER:
      // - when the carousel gets near the viewport (top < 90% of vh)
      // - OR hero is mostly scrolled (bottom < 55% of vh)
      const moveLeftEarly =
        (carRect && carRect.top < vh * 0.9) ||
        (heroRect && heroRect.bottom < vh * 0.55);

      setMode(moveLeftEarly ? "vertical" : "horizontal");
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // init
    return () => window.removeEventListener("scroll", onScroll);
  }, [vh]);

  // apply follow offset
  useEffect(() => {
    const el = dockRef.current;
    if (!el) return;
    if (mode === "horizontal") {
      const shiftX = clamp((mouseX - vw / 2) * 0.08, -64, 64);
      el.style.setProperty("--dock-shift-x", `${shiftX}px`);
    } else {
      const shiftY = clamp((mouseY - vh / 2) * 0.12, -90, 90);
      el.style.setProperty("--dock-shift-y", `${shiftY}px`);
    }
  }, [mode, mouseX, mouseY, vw, vh]);

  // proximity scaling
  const proximity = useMemo(() => {
    if (mode === "horizontal") {
      if (!vw) return LINKS.map(() => 1);
      const step = vw / (LINKS.length + 1);
      return LINKS.map((_, i) => {
        const iconCenter = step * (i + 1);
        const dist = Math.abs(mouseX - iconCenter);
        return clamp(1 - dist / (vw * 0.9), 0.86, 1.14);
      });
    } else {
      if (!vh) return LINKS.map(() => 1);
      const step = vh / (LINKS.length + 1);
      return LINKS.map((_, i) => {
        const iconCenter = step * (i + 1);
        const dist = Math.abs(mouseY - iconCenter);
        return clamp(1 - dist / (vh * 0.9), 0.86, 1.14);
      });
    }
  }, [mode, mouseX, mouseY, vw, vh]);

  return (
    <div ref={dockRef} className={`dock ${mode}`}>
      <div className="dock-inner">
        {LINKS.map((item, i) => (
          <a
            key={item.key}
            className="dock-item"
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
            style={{ animationDelay: `${i * 0.12}s`, transform: `scale(${(proximity[i] || 1).toFixed(3)})` }}
          >
            <img src={item.img} alt={item.alt} className="dock-icon" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function HeroExperience() {
  const [heartStyle, setHeartStyle] = useState({});
  const dogRef = useRef(null);
  const heartRef = useRef(null);

  // Sync video to scroll
  useEffect(() => {
    const video = document.getElementById("scrollVideo");
    if (!video) return;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = maxScroll ? scrollTop / maxScroll : 0;
      const duration = video.duration || 1;
      video.currentTime = scrollFraction * duration;
    };
    video.addEventListener("loadedmetadata", () => {
      window.addEventListener("scroll", handleScroll);
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate heading
  useEffect(() => {
    const heading = document.getElementById("experience-heading");
    if (!heading) return;
    const handleScroll = () => {
      const rect = heading.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      heading.classList.toggle("start-typing", isVisible);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Heart float (feed button)
  const handleFeed = () => {
    if (!dogRef.current || !heartRef.current) return;
    const dogRect = dogRef.current.getBoundingClientRect();
    const wrapperRect = document.querySelector(".swimming-dog-wrapper")?.getBoundingClientRect();
    if (!wrapperRect) return;
    const dogCenterX = dogRect.left + dogRect.width / 2 - wrapperRect.left;
    setHeartStyle({ left: `${dogCenterX}px` });
    heartRef.current.classList.add("show-heart");
    setTimeout(() => heartRef.current?.classList.remove("show-heart"), 2000);
  };

  return (
    <>
      {/* 🔹 HERO */}
      <section className="content-wrapper" id="home">
        <div className="text-content">
          <h1 className="hero-title">
            JESSICA<br />LUK
          </h1>
          <p className="hero-blurb">
            Electrical Engineering student at the University of Waterloo. Building thoughtful, practical solutions through design and clean code.
          </p>
        </div>
        <div className="image-content">
          <video
            id="scrollVideo"
            className="background-video"
            src="/liquidmetal.mp4"
            muted
            playsInline
            preload="auto"
          />
        </div>
      </section>

      {/* 🔹 LOGO CAROUSEL — wrapped with an anchor so the dock can sit just above it */}
      <div id="carousel-anchor">
        <LogoCarousel />
      </div>

      {/* 🔹 EXPERIENCE */}
      <section className="pad-y" id="experience">
        <h2 className="experience-heading typing-animation" id="experience-heading">MY EXPERIENCE</h2>
        <div className="timeline">
          {experiences.map((item, i) => (
            <TimelineNode key={i} {...item} />
          ))}
        </div>
      </section>

      {/* 🔹 DOG + FEED ME + HEART + BUBBLES */}
      <div className="swimming-dog-wrapper">
        <img
          ref={dogRef}
          src="/dog_walk.gif"
          alt="Swimming dog"
          className="swimming-dog"
        />
        <div className="bubble bubble1"></div>
        <div className="bubble bubble2"></div>
        <div className="bubble bubble3"></div>

        <div ref={heartRef} className="heart" style={heartStyle}>🐾🥩</div>
        <button className="feed-btn" onClick={handleFeed}>feed me</button>
      </div>

      {/* 🔹 Floating Dock */}
      <FloatingIconDock />
    </>
  );
}
