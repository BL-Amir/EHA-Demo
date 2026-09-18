import LogoReveal from './LogoReveal';
import LogoMark from './LogoMark';
import { ColourControl } from './ColourControl';
import { submitEnquiry, confirmationTitle } from './submitEnquiry';
import { useIntroScrollLock } from './useIntroScrollLock';
import {
  accentOptions,
  paletteOptions,
  paletteLabels,
  headingFonts,
  bodyFonts,
} from "./appearance";
import { legalPages } from "./legalContent";
// Editable reconstruction of the public site inspected on 2026-09-15.
// Vendor libraries are imported from packages; preview forms never send enquiries.
import * as T from "react";
import {
  Link as Se,
  useLocation as at,
  useParams as op,
  useNavigate as zu,
  Navigate,
  Routes,
  Route as Un,
} from "react-router-dom";
import { gsap as Pt } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
Pt.registerPlugin(DrawSVGPlugin);
function Navigation({
  introPhase: a14 = "done",
  logoSlotRef: n,
  sharedLogoActive: r = false,
  onScrolledChange: s,
}) {
  const [l, u] = T.useState(false),
    [f, d] = T.useState(false),
    [p, g] = T.useState(false),
    _ = at();
  (T.useEffect(() => {
    const S = () => u(window.scrollY > 10);
    return (
      S(),
      window.addEventListener("scroll", S, {
        passive: true,
      }),
      () => window.removeEventListener("scroll", S)
    );
  }, []),
    T.useEffect(() => {
      const S = document.documentElement;
      (l ? (S.dataset.navScrolled = "true") : delete S.dataset.navScrolled,
        s?.(l));
    }, [l, s]),
    T.useEffect(() => {
      (d(false), (document.body.style.overflow = ""), window.scrollTo(0, 0));
    }, [_.pathname]));
  const y = () => {
      const S = !f;
      (d(S), (document.body.style.overflow = S ? "hidden" : ""));
    },
    w = () => {
      (d(false), (document.body.style.overflow = ""));
    },
    k = (S) =>
      f
        ? {
            transform:
              S === 0
                ? "translateY(3.5px) rotate(45deg)"
                : "translateY(-3.5px) rotate(-45deg)",
          }
        : {},
    C = /^\/portfolio\/[^/]+/.test(_.pathname),
    x = _.pathname === "/portfolio" || C;
  return (
    <>
      <nav
        className={`nav nav--intro-${a14}${l ? " scrolled" : ""}${x ? " nav--portfolio-route" : ""}${C ? " nav--project-route" : ""}${r ? " nav--shared-logo" : ""}`}
      >
        <Se
          to="/"
          className={`nav__logo${r ? " nav__logo--shared-active" : ""}`}
          ref={n}
        >
          {p ? (
            <span className="nav__logo-fallback">{"EHARCHITECTS"}</span>
          ) : (
            <LogoMark className="nav__logo-img" decorative />
          )}
        </Se>
        <ul className="nav__links">
          <li>
            <Se to="/">{"Home"}</Se>
          </li>
          <li>
            <Se to="/portfolio">{"Portfolio"}</Se>
          </li>
          <li>
            <Se to="/about">{"About"}</Se>
          </li>
          <li>
            <Se to="/news">{"News"}</Se>
          </li>
          <li>
            <Se to="/contact">{"Contact"}</Se>
          </li>
        </ul>
        <button className="nav__burger" aria-label="Menu" onClick={y}>
          <span style={k(0)} />
          <span style={k(1)} />
        </button>
      </nav>
      <div className={`nav__mobile-menu${f ? " open" : ""}`}>
        <ul>
          <li>
            <Se to="/" onClick={w}>
              {"Home"}
            </Se>
          </li>
          <li>
            <Se to="/portfolio" onClick={w}>
              {"Portfolio"}
            </Se>
          </li>
          <li>
            <Se to="/about" onClick={w}>
              {"About"}
            </Se>
          </li>
          <li>
            <Se to="/news" onClick={w}>
              {"News"}
            </Se>
          </li>
          <li>
            <Se to="/contact" onClick={w}>
              {"Contact"}
            </Se>
          </li>
        </ul>
      </div>
    </>
  );
}
const mp = paletteOptions,
  xh = paletteLabels;
function oy() {
  const a14 = localStorage.getItem("eh-theme");
  return mp.includes(a14) ? a14 : "dark";
}
function PaletteSwitcher() {
  const [a14, n] = T.useState(oy),
    [r, s] = T.useState(false),
    l = T.useRef(null);
  (T.useEffect(() => {
    const f = document.documentElement;
    (a14 === "light" ? delete f.dataset.theme : (f.dataset.theme = a14),
      localStorage.setItem("eh-theme", a14));
  }, [a14]),
    T.useEffect(() => {
      const f = (p) => {
          l.current && !l.current.contains(p.target) && s(false);
        },
        d = (p) => {
          p.key === "Escape" && s(false);
        };
      return (
        document.addEventListener("pointerdown", f),
        document.addEventListener("keydown", d),
        () => {
          (document.removeEventListener("pointerdown", f),
            document.removeEventListener("keydown", d));
        }
      );
    }, []));
  const u = (f) => {
    (n(f), s(false));
  };
  return (
    <div className="theme-switcher-wrap" ref={l}>
      <button
        type="button"
        className={`theme-switcher${r ? " theme-switcher--open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={r}
        aria-label="Select colour palette"
        onClick={() => s((f) => !f)}
      >
        {xh[a14]}
      </button>
      {r && (
        <div
          className="theme-switcher__menu"
          role="listbox"
          aria-label="Colour palette"
        >
          {mp.map((f) => (
            <button
              type="button"
              className={`theme-switcher__option${a14 === f ? " theme-switcher__option--active" : ""}`}
              role="option"
              aria-selected={a14 === f}
              onClick={() => u(f)}
              key={f}
            >
              {xh[f]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
function DisplaySelect({
  attr: a14,
  storageKey: n,
  options: r,
  defaultValue: s,
}) {
  const [l, u] = T.useState(() => {
      try {
        const _ = localStorage.getItem(n);
        if (r.some((y) => y.value === _)) return _;
      } catch {}
      return s;
    }),
    [f, d] = T.useState(false),
    p = T.useRef(null);
  (T.useEffect(() => {
    document.documentElement.dataset[a14] = l;
    try {
      localStorage.setItem(n, l);
    } catch {}
  }, [a14, n, l]),
    T.useEffect(() => {
      const _ = (w) => {
          p.current && !p.current.contains(w.target) && d(false);
        },
        y = (w) => {
          w.key === "Escape" && d(false);
        };
      return (
        document.addEventListener("pointerdown", _),
        document.addEventListener("keydown", y),
        () => {
          (document.removeEventListener("pointerdown", _),
            document.removeEventListener("keydown", y));
        }
      );
    }, []));
  const g = r.find((_) => _.value === l) || r[0];
  return (
    <div className="theme-switcher-wrap" ref={p}>
      <button
        type="button"
        className={`theme-switcher${f ? " theme-switcher--open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={f}
        onClick={() => d((_) => !_)}
      >
        {g.label}
      </button>
      {f && (
        <div className="theme-switcher__menu" role="listbox">
          {r.map((_) => (
            <button
              type="button"
              role="option"
              aria-selected={l === _.value}
              className={`theme-switcher__option${l === _.value ? " theme-switcher__option--active" : ""}`}
              onClick={() => {
                (u(_.value), d(false));
              }}
              key={_.value}
            >
              {_.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
const uy = headingFonts;
function HeadingSwitcher() {
  return (
    <DisplaySelect
      attr="font"
      storageKey="eh-font"
      options={uy}
      defaultValue="space-grotesk"
    />
  );
}
const fy = bodyFonts;
function BodySwitcher() {
  return (
    <DisplaySelect
      attr="fontBody"
      storageKey="eh-font-body"
      options={fy}
      defaultValue="hanken"
    />
  );
}
const hy = accentOptions;
function AccentSwitcher() {
  return (
    <DisplaySelect
      attr="accent"
      storageKey="eh-accent"
      options={hy}
      defaultValue="orange"
    />
  );
}
function LoadingScreen({ drawn: a14, exiting: n, onEnter: r }) {
  return (
    <div
      className={`loading-screen${a14 ? " loading-screen--drawn" : ""}${n ? " loading-screen--out" : ""}`}
      onClick={r}
    >
      <div className="loading-screen__inner">
        <p
          className={`loading-screen__cue${a14 ? " loading-screen__cue--visible" : ""}`}
        >
          {"enter"}
        </p>
      </div>
    </div>
  );
}
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function SharedLogo({
  phase: a14,
  navLogoSlotRef: n,
  drawn: r,
  navScrolled: s = false,
  hidden: l = false,
  onDrawn: u,
  onDocked: f,
}) {
  const d = T.useRef(null),
    p = T.useRef(null),
    g = T.useRef(null),
    _ = T.useRef(null),
    y = at(),
    w = () => {
      const C = d.current,
        x = n.current;
      if (!C || !x) return null;
      const S = p.current || (p.current = C.getBoundingClientRect()),
        P = x.getBoundingClientRect(),
        L = (P.height * 0.86) / S.height,
        D = S.width * L,
        z = S.height * L;
      return {
        left: P.left + (P.width - D) / 2,
        top: P.top + (P.height - z) / 2,
        width: S.width,
        scale: L,
      };
    },
    k = (C = null, x = false) => {
      const S = d.current,
        P = C || w();
      if (!S || !P) return;
      const L = {
        left: P.left,
        top: P.top,
        width: P.width,
        x: 0,
        y: 0,
        scale: P.scale,
        xPercent: 0,
        yPercent: 0,
        transformOrigin: "top left",
        autoRound: false,
      };
      if (x && !prefersReducedMotion()) {
        Pt.to(S, {
          ...L,
          duration: 0.55,
          ease: "power3.out",
          overwrite: "auto",
        });
        return;
      }
      Pt.set(S, L);
    };
  return (
    T.useLayoutEffect(() => {
      if (a14 !== "docking") return;
      let C = 0,
        x = 0;
      return (
        (C = requestAnimationFrame(() => {
          x = requestAnimationFrame(() => {
            const S = d.current,
              P = n.current;
            if (!S || !P) return;
            _.current?.kill();
            const L = S.getBoundingClientRect();
            ((p.current = L),
              Pt.set(S, {
                left: L.left,
                top: L.top,
                width: L.width,
                x: 0,
                y: 0,
                scale: 1,
                transform: "none",
                transformOrigin: "top left",
              }));
            const D = w();
            if (D) {
              if (((g.current = D), prefersReducedMotion())) {
                (k(D), f?.());
                return;
              }
              ((_.current = Pt.timeline({
                defaults: {
                  ease: "power3.inOut",
                },
                onComplete: () => {
                  (k(g.current), f?.());
                },
              })),
                _.current.to(S, {
                  left: D.left,
                  top: D.top,
                  scale: D.scale,
                  // Keep position and scale continuous through the final frames.
                  autoRound: false,
                  duration: 0.95,
                }));
            }
          });
        })),
        () => {
          (cancelAnimationFrame(C), cancelAnimationFrame(x));
        }
      );
    }, [a14, n, f]),
    T.useLayoutEffect(() => {
      if (a14 !== "docked") return;
      let frame = 0, until = 0;
      const sync = () => {
        const metrics = w();
        if (metrics) { g.current = metrics; k(metrics); }
        frame = performance.now() < until ? requestAnimationFrame(sync) : 0;
      };
      const follow = () => {
        until = performance.now() + 700;
        if (!frame) frame = requestAnimationFrame(sync);
      };
      Pt.killTweensOf(d.current);
      // Direct page loads skip docking, so clear the intro offset before paint.
      sync();
      follow();
      const nav = document.querySelector('.nav');
      const observer = new ResizeObserver(follow);
      if (n.current) observer.observe(n.current);
      if (nav) observer.observe(nav);
      const mutation = new MutationObserver(follow);
      if (nav) mutation.observe(nav, {attributes:true, attributeFilter:['class']});
      window.addEventListener('resize', follow);
      return () => {
        cancelAnimationFrame(frame);
        observer.disconnect(); mutation.disconnect();
        window.removeEventListener('resize', follow);
      };
    }, [a14, n, y.pathname]),
    T.useEffect(() => () => _.current?.kill(), []),
    (
      <div
        ref={d}
        className={`shared-logo shared-logo--${a14}${r ? " shared-logo--drawn" : ""}${l ? " shared-logo--hidden" : ""}`}
        data-shared-logo={true}
      >
        <Se
          to="/"
          className="shared-logo__link"
          aria-label="EH Architects home"
        >
          <div className={`loading-brand${r ? " loading-brand--drawn" : ""}`}>
            <LogoReveal
              className={`loading-screen__svg loading-logo${r ? " loading-logo--drawn" : ""}`}
              revealMode="sequential"
              initialComplete={a14 === "docked"}
              onComplete={u}
            />
          </div>
        </Se>
      </div>
    )
  );
}
function Hero() {
  return (
    <section className="hero">
      <div className="hero__image-wrap">
        <video
          className="hero__video"
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          preload="auto"
        >
          <source src="/assets/video/fireplace.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero__text">
        <span className="hero__label">
          {"Architects, Masterplanners & Designers"}
        </span>
        <div className="hero__statement">
          <a href="#work" className="hero__scroll-cue" aria-label="Scroll down">
            <span className="hero__scroll-line" />
          </a>
          <h1 className="hero__heading">
            {"Architecture"}
            <br />
            {"with Intention."}
          </h1>
        </div>
      </div>
    </section>
  );
}
const forthcomingProjects = [
    {
      code: "Project 06",
      slug: "project-06",
      category: "Coming Soon",
      tagline: "More project photographs to follow",
      placeholder: true,
    },
    {
      code: "Project 07",
      slug: "project-07",
      category: "Coming Soon",
      tagline: "More project photographs to follow",
      placeholder: true,
    },
    {
      code: "Project 08",
      slug: "project-08",
      category: "Coming Soon",
      tagline: "More project photographs to follow",
      placeholder: true,
    },
    {
      code: "Project 09",
      slug: "project-09",
      category: "Coming Soon",
      tagline: "More project photographs to follow",
      placeholder: true,
    },
  ],
  projects = [
    {
      code: "18 WHG",
      slug: "18-whg",
      category: "Residential",
      tagline: "A townhouse in West Hampstead",
      brief:
        "A Victorian townhouse in West Hampstead, updated with contemporary interiors. Natural materials and careful detailing bring the rooms together while respecting the proportions of the original house.",
      collaborators: [
        {
          role: "Architect",
          name: "EH Architects",
          link: "/about",
        },
        {
          role: "Interior Design",
          name: "EH Architects",
        },
      ],
      coverImg: "/assets/images/18 WHG WEBSITE SELECTION/_DSC4340.jpg",
      images: [
        "/assets/images/18 WHG WEBSITE SELECTION/_DSC4340.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/Living-room-5-final-EDIT-new2.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/Living-room-2-final-EDIT.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/Dining-1-final-EDIT.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/Dining-2-final-EDIT.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/Dining-4-final-EDIT.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/Dining-5-final-EDIT.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/Kitchen-1-final-EDIT.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/Kitchen-6-final.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/Kitchen-8-final.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/Kitchen-10-final.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/Stairs-2-final-EDIT.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/0-Bedroom-1-final.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/0-Bedroom-3-final-edit.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/0-Bedroom-4-final.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/0-Bedroom-5-final.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/0-Bedroom-5-close-final.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/0-Bedroom-10-final-edit.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/0-Bathroom-1-final.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/0-Bathroom-3-final.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/0-Bathroom-4-final.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/0-Bathroom-small-1-final.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/0-Bathroom-small-2-final.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/_DSC4406.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/_DSC4547.jpg",
        "/assets/images/18 WHG WEBSITE SELECTION/_DSC4550.jpg",
      ],
    },
    {
      code: "242 WL",
      slug: "242-wl",
      category: "Residential",
      tagline: "An apartment in West London",
      brief:
        "A refurbishment of an apartment in West London. The layout opens up the main living spaces, with bespoke joinery, stone and timber giving the interior a consistent character.",
      collaborators: [
        {
          role: "Architect",
          name: "EH Architects",
          link: "/about",
        },
        {
          role: "Interior Design",
          name: "EH Architects",
        },
      ],
      coverImg: "/assets/images/242 WL WEBSITE SELECTION/_DSC4907.jpg",
      images: [
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4907.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4895-HDR.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4901-HDR.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4892-HDR.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4886-HDR.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4880-HDR.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4744-HDR.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4853-HDR.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4868-HDR.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4877-HDR.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4778-HDR.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4663-HDR.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4651-HDR.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4687-HDR.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4702-HDR.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4708-HDR.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4602-HDR.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4681-HDR.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4572-HDR.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4820.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4793.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4847.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4849.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4802.jpg",
        "/assets/images/242 WL WEBSITE SELECTION/_DSC4806.jpg",
      ],
    },
    {
      code: "50 CR",
      slug: "50-cr",
      category: "Residential",
      tagline: "A home connected to its garden",
      brief:
        "A family home in South West London, with changes focused on the ground-floor living spaces and kitchen. New openings bring more of the garden into view.",
      collaborators: [
        {
          role: "Architect",
          name: "EH Architects",
          link: "/about",
        },
        {
          role: "Interior Design",
          name: "EH Architects",
        },
      ],
      coverImg: "/assets/images/50 CR WEBSITE SELECTION/_DSC3757.jpg",
      images: [
        "/assets/images/50 CR WEBSITE SELECTION/_DSC3757.jpg",
        "/assets/images/50 CR WEBSITE SELECTION/_DSC3584-HDR.jpg",
        "/assets/images/50 CR WEBSITE SELECTION/_DSC3509-HDR.jpg",
        "/assets/images/50 CR WEBSITE SELECTION/_DSC3542-HDR.jpg",
        "/assets/images/50 CR WEBSITE SELECTION/_DSC3605-HDR.jpg",
        "/assets/images/50 CR WEBSITE SELECTION/_DSC3614-HDR.jpg",
        "/assets/images/50 CR WEBSITE SELECTION/_DSC3491-HDR.jpg",
        "/assets/images/50 CR WEBSITE SELECTION/_DSC3671-HDR.jpg",
        "/assets/images/50 CR WEBSITE SELECTION/_DSC3689-HDR.jpg",
        "/assets/images/50 CR WEBSITE SELECTION/_DSC3710-HDR.jpg",
        "/assets/images/50 CR WEBSITE SELECTION/_DSC3719-HDR.jpg",
        "/assets/images/50 CR WEBSITE SELECTION/_DSC3644-HDR.jpg",
        "/assets/images/50 CR WEBSITE SELECTION/_DSC3560-HDR.jpg",
        "/assets/images/50 CR WEBSITE SELECTION/_DSC3433.jpg",
        "/assets/images/50 CR WEBSITE SELECTION/_DSC3445.jpg",
        "/assets/images/50 CR WEBSITE SELECTION/_DSC3450.jpg",
        "/assets/images/50 CR WEBSITE SELECTION/_DSC3458-HDR.jpg",
        "/assets/images/50 CR WEBSITE SELECTION/_DSC3467-HDR.jpg",
        "/assets/images/50 CR WEBSITE SELECTION/_DSC3753.jpg",
      ],
    },
    {
      code: "27 WA",
      slug: "27-wa",
      category: "Residential",
      tagline: "A family home in West London",
      brief:
        "A renovation of a semi-detached home in West London. The design focuses on daylight, generous living spaces and a simple palette of materials.",
      collaborators: [
        {
          role: "Architect",
          name: "EH Architects",
          link: "/about",
        },
        {
          role: "Interior Design",
          name: "EH Architects",
        },
      ],
      coverImg: "/assets/images/27 WA WEBSITE SELECTION/_DSC7447.jpg",
      images: [
        "/assets/images/27 WA WEBSITE SELECTION/_DSC7447.jpg",
        "/assets/images/27 WA WEBSITE SELECTION/_DSC7302-HDR.jpg",
        "/assets/images/27 WA WEBSITE SELECTION/_DSC7344-HDR.jpg",
        "/assets/images/27 WA WEBSITE SELECTION/_DSC7275-HDR.jpg",
        "/assets/images/27 WA WEBSITE SELECTION/_DSC7281-HDR.jpg",
        "/assets/images/27 WA WEBSITE SELECTION/_DSC7413-HDR.jpg",
        "/assets/images/27 WA WEBSITE SELECTION/_DSC7389-HDR.jpg",
        "/assets/images/27 WA WEBSITE SELECTION/_DSC7200-HDR.jpg",
        "/assets/images/27 WA WEBSITE SELECTION/_DSC7145-HDR.jpg",
        "/assets/images/27 WA WEBSITE SELECTION/_DSC7148-HDR.jpg",
        "/assets/images/27 WA WEBSITE SELECTION/_DSC7227-HDR.jpg",
        "/assets/images/27 WA WEBSITE SELECTION/_DSC7179.jpg",
        "/assets/images/27 WA WEBSITE SELECTION/_DSC7420.jpg",
        "/assets/images/27 WA WEBSITE SELECTION/_DSC7433.jpg",
        "/assets/images/27 WA WEBSITE SELECTION/_DSC7435.jpg",
        "/assets/images/27 WA WEBSITE SELECTION/_DSC7442.jpg",
      ],
    },
    {
      code: "15B BR",
      slug: "15b-br",
      category: "Residential",
      tagline: "Period sensitivity, Barnes",
      brief:
        "An interior project shaped around the relationship between rooms, with attention to natural light, materials and the details of everyday use.",
      collaborators: [
        {
          role: "Architect",
          name: "EH Architects",
          link: "/about",
        },
        {
          role: "Interior Design",
          name: "EH Architects",
        },
      ],
      coverImg: "/assets/images/15B BR WEBSITE SELECTION/_DSC4063-HDR.jpg",
      images: [
        "/assets/images/15B BR WEBSITE SELECTION/_DSC4063-HDR.jpg",
        "/assets/images/15B BR WEBSITE SELECTION/_DSC4051-HDR.jpg",
        "/assets/images/15B BR WEBSITE SELECTION/_DSC4105-HDR.jpg",
        "/assets/images/15B BR WEBSITE SELECTION/_DSC4090-HDR.jpg",
        "/assets/images/15B BR WEBSITE SELECTION/_DSC3922-HDR.jpg",
        "/assets/images/15B BR WEBSITE SELECTION/_DSC3940-HDR.jpg",
        "/assets/images/15B BR WEBSITE SELECTION/_DSC3946-HDR.jpg",
        "/assets/images/15B BR WEBSITE SELECTION/_DSC3961-HDR.jpg",
        "/assets/images/15B BR WEBSITE SELECTION/_DSC4021-HDR.jpg",
        "/assets/images/15B BR WEBSITE SELECTION/_DSC3976-HDR.jpg",
      ],
    },
  ],
  Du = [...projects, ...forthcomingProjects];
function LoadingImage({
  className: a14,
  skeletonClassName: n = "",
  onLoad: r,
  onError: s,
  ...l
}) {
  const u = T.useRef(null),
    [f, d] = T.useState(false);
  T.useEffect(() => {
    const g = u.current;
    d(!!(g && g.complete && g.naturalWidth > 0));
  }, [l.src]);
  const p = (g, _) => {
    (d(true), _?.(g));
  };
  return (
    <>
      {!f && <span className={`img-skeleton ${n}`.trim()} aria-hidden="true" />}
      <img
        ref={u}
        className={a14}
        {...l}
        onLoad={(g) => p(g, r)}
        onError={(g) => p(g, s)}
      />
    </>
  );
}
function SelectedWorkCard({ project: a14 }) {
  return a14.placeholder ? (
    <article
      className="work__item work__item--placeholder"
      aria-label={`${a14.code} forthcoming`}
    >
      <div
        className="work__img-wrap work__placeholder-img"
        aria-hidden="true"
      />
      <div className="work__meta">
        <span className="work__title">{a14.code}</span>
        <span className="work__type">{a14.category}</span>
      </div>
    </article>
  ) : (
    <Se to={`/portfolio/${a14.slug}`} className="work__item">
      <div className="work__img-wrap">
        <LoadingImage src={a14.coverImg} alt={a14.code} className="work__img" />
      </div>
      <div className="work__meta">
        <span className="work__title">{a14.code}</span>
        <span className="work__type">{a14.category}</span>
      </div>
    </Se>
  );
}
function SelectedWork() {
  return (
    <section className="work" id="work">
      <div className="work__grid">
        {Du.map((a14) => (
          <SelectedWorkCard project={a14} key={a14.code} />
        ))}
      </div>
      <div className="work__footer">
        <Se to="/portfolio" className="work__view-all">
          {"View all projects"}
        </Se>
      </div>
    </section>
  );
}
const articles = [
  {
    slug: "the-art-of-restraint",
    date: "June 2026",
    image: "/assets/images/news-images/max-bohme-bixyg_ipb88-unsplash.jpg",
    imageAlt: "Subtle layered sand texture with fine horizontal ripples",
    imagePosition: "center",
    title: "The Art of Restraint",
    excerpt:
      "Why a clear plan, a few good materials and careful details can be enough.",
    body: [
      "Good design often comes from deciding what to leave out. A clear plan, a few well-chosen materials and carefully resolved details can give a home a lasting sense of ease.",
      "Restraint does not mean making every room the same. It means giving each element a reason to be there, from the position of a window to the way a cupboard meets a wall.",
      "For us, those decisions start with how a place will be used. The aim is a building that feels comfortable in daily life, rather than one that asks for attention.",
    ],
  },
  {
    slug: "connecting-home-and-landscape",
    date: "May 2026",
    image: "/assets/images/news-images/alexander-mass-xdv8rGTw7Y8-unsplash.jpg",
    imageAlt: "Layered green leaves in soft natural light",
    imagePosition: "center",
    title: "Connecting Home and Landscape",
    excerpt: "Simple ways to bring the garden into the experience of a home.",
    body: [
      "A garden can shape the experience of a room long before you step outside. A view, a patch of daylight or a sheltered threshold can make the connection feel natural.",
      "More glass is not always the answer. Window position, privacy and shade matter just as much as the size of an opening.",
      "Thinking about the house and landscape together helps create places that work through the seasons and suit the way people live.",
    ],
  },
  {
    slug: "old-houses-new-ways-of-living",
    date: "April 2026",
    image: "/assets/images/news-images/Brick%20by%20Window.png",
    imageAlt:
      "Brick, stone, glass, and timber material junction beside a window",
    imagePosition: "center",
    title: "Old Houses, New Ways of Living",
    excerpt:
      "Making an older house work for today while keeping what makes it distinctive.",
    body: [
      "Older houses often have generous proportions and distinctive details, but their layouts may not suit the way a household lives today.",
      "We start by understanding what is worth keeping and where change would make a useful difference. A better connection between kitchen and garden, or a clearer route through the house, can transform daily use.",
      "New work should give the existing building room to remain itself while making it more comfortable and useful for the people who live there.",
    ],
  },
];
function NewsFeatureGraphic({ className: a14 = "" }) {
  return (
    <figure className={`news-feature-graphic ${a14}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 640 480" focusable="false">
        <rect
          className="news-feature-graphic__wash"
          x="0"
          y="0"
          width="640"
          height="480"
        />
        <path
          className="news-feature-graphic__line news-feature-graphic__line--soft"
          d="M80 66 H562"
        />
        <path
          className="news-feature-graphic__line news-feature-graphic__line--soft"
          d="M80 414 H562"
        />
        <path
          className="news-feature-graphic__line news-feature-graphic__line--soft"
          d="M104 66 V414"
        />
        <path
          className="news-feature-graphic__line news-feature-graphic__line--soft"
          d="M508 66 V414"
        />
        <path
          className="news-feature-graphic__line"
          d="M156 360 L302 112 L442 360"
        />
        <path
          className="news-feature-graphic__line news-feature-graphic__line--strong"
          d="M168 304 H498"
        />
        <path className="news-feature-graphic__line" d="M348 112 L486 360" />
        <path
          className="news-feature-graphic__line news-feature-graphic__line--fine"
          d="M104 238 H508"
        />
        <path
          className="news-feature-graphic__line news-feature-graphic__line--fine"
          d="M236 66 V414"
        />
        <path
          className="news-feature-graphic__line news-feature-graphic__line--fine"
          d="M372 66 V414"
        />
      </svg>
    </figure>
  );
}
function NewsMedia({ article: a14, className: n = "" }) {
  return a14?.image ? (
    <figure className={`news-media ${n}`.trim()}>
      <LoadingImage
        src={a14.image}
        alt={a14.imageAlt || ""}
        loading="lazy"
        style={{
          objectPosition: a14.imagePosition || "center",
        }}
      />
    </figure>
  ) : (
    <NewsFeatureGraphic className={n} />
  );
}
function NewsSection() {
  const [a14, ...n] = articles;
  return (
    <section className="news" id="news">
      <div className="news__editorial">
        <Se to={`/news/${a14.slug}`} className="news__feature">
          <div className="news__feature-copy">
            <span className="news__date">{a14.date}</span>
            <h3 className="news__feature-title">{a14.title}</h3>
            <p className="news__feature-excerpt">{a14.excerpt}</p>
            <span className="news__read">{"Read more"}</span>
          </div>
          <NewsMedia article={a14} className="news__feature-visual" />
        </Se>
        <div className="news__supporting">
          {n.map((r) => (
            <Se to={`/news/${r.slug}`} className="news__item" key={r.slug}>
              <NewsMedia article={r} className="news__item-media" />
              <span className="news__date">{r.date}</span>
              <h3 className="news__title">{r.title}</h3>
              <p className="news__excerpt">{r.excerpt}</p>
              <span className="news__read">{"Read more"}</span>
            </Se>
          ))}
        </div>
      </div>
    </section>
  );
}
const X0 = {
  name: "",
  email: "",
  projectType: "",
  message: "",
};
function ContactSection() {
  const [a14, n] = T.useState(X0),
    [r, s] = T.useState({}),
    [l, u] = T.useState("idle"),
    f = (g) => (_) =>
      n((y) => ({
        ...y,
        [g]: _.target.value,
      })),
    d = () => {
      const g = {};
      return (
        a14.name.trim() || (g.name = "Please add your name."),
        a14.email.trim()
          ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a14.email) ||
            (g.email = "Please enter a valid email.")
          : (g.email = "Please add your email."),
        a14.message.trim() ||
          (g.message = "Please tell us about your project."),
        g
      );
    },
    p = async (g) => {
      g.preventDefault();
      const _ = d();
      if ((s(_), Object.keys(_).length)) return;
      u("submitting");
      try {
        await submitEnquiry({...a14, 'bot-field': new FormData(g.currentTarget).get('bot-field') || ''});
        u("submitted");
      } catch { u("error"); }
    };
  return (
    <section className="contact" id="contact">
      <div className="contact__head">
        <h2 className="contact__title">
          {"Get in touch"}
          <span className="accent-dot">{"."}</span>
        </h2>
      </div>
      {l === "submitted" ? (
        <div className="contact__confirm">
          <p className="enquiry__confirm-title">
            {confirmationTitle}
          </p>
          <p className="enquiry__confirm-body">
            {"To send a real enquiry, email "}{" "}
            <a href="mailto:enquiries@eharchitects.co.uk">
              {"enquiries@eharchitects.co.uk"}
            </a>
            {"."}
          </p>
        </div>
      ) : (
        <form
          className="contact__form"
          name="contact"
          onSubmit={p}
          noValidate={true}
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p className="enquiry__hp">
            <label>
              {"Do not fill this out "}
              <input name="bot-field" tabIndex="-1" autoComplete="off" />
            </label>
          </p>
          <div className="contact__grid">
            <label className="enquiry__field">
              <span className="enquiry__label">{"Name"}</span>
              <input
                name="name"
                value={a14.name}
                onChange={f("name")}
                autoComplete="name"
                placeholder="Your name"
                aria-invalid={!!r.name}
              />
              {r.name && <span className="enquiry__error">{r.name}</span>}
            </label>
            <label className="enquiry__field">
              <span className="enquiry__label">{"Email"}</span>
              <input
                name="email"
                type="email"
                value={a14.email}
                onChange={f("email")}
                autoComplete="email"
                placeholder="your@email.com"
                aria-invalid={!!r.email}
              />
              {r.email && <span className="enquiry__error">{r.email}</span>}
            </label>
            <label className="enquiry__field">
              <span className="enquiry__label">{"Project type"}</span>
              <input
                name="projectType"
                value={a14.projectType}
                onChange={f("projectType")}
                placeholder="New home, extension, listed building…"
              />
            </label>
            <label className="enquiry__field contact__field--full">
              <span className="enquiry__label">{"Message"}</span>
              <span className="enquiry__message-box"><textarea
                name="message"
                rows="2"
                value={a14.message}
                onChange={f("message")}
                placeholder="Tell us about your project"
                aria-invalid={!!r.message}
              /></span>
              {r.message && <span className="enquiry__error">{r.message}</span>}
            </label>
          </div>
          {l === "error" && (
            <p className="enquiry__formerror">
              {"Something went wrong \u2014 please email us directly."}
            </p>
          )}
          <div className="contact__actions">
            <button
              type="submit"
              className="enquiry__submit"
              disabled={l === "submitting"}
            >
              <span>
                {l === "submitting" ? "Sending\u2026" : "Send enquiry"}
              </span>
              <svg
                className="enquiry__arrow"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <line
                  x1="5"
                  y1="12"
                  x2="19"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <polyline
                  points="12 5 19 12 12 19"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
const Z0 = () => <LogoMark decorative />,
  e1 = [
    {
      name: "Instagram",
      href: "#",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      name: "X",
      href: "#",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="5" y1="5" x2="19" y2="19" />
          <line x1="19" y1="5" x2="5" y2="19" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "#",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
  ];
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand-wrap">
          <Z0 />
          <span className="footer__brand">{"EH Architects"}</span>
        </div>
        <nav className="footer__links" aria-label="Legal">
          <Se to="/privacy-policy" className="footer__link">
            {"Privacy Policy"}
          </Se>
          <Se to="/terms" className="footer__link">
            {"Terms"}
          </Se>
        </nav>
      </div>
      <div className="footer__base">
        <nav className="footer__social" aria-label="Social media">
          {e1.map((a14) => (
            <a
              href={a14.href}
              aria-label={a14.name}
              className="footer__social-link"
              key={a14.name}
            >
              {a14.icon}
            </a>
          ))}
        </nav>
        <span className="footer__copy">
          <span className="footer__copyright-symbol">{"\xA9"}</span>{" "}
          {/* @__PURE__ */ new Date().getFullYear()}
          {" EH Architects"}
        </span>
      </div>
    </footer>
  );
}
function useSmoothScroll() {
  T.useEffect(() => {
    const a14 = (n) => {
      const r = n.target.closest('a[href^="#"]');
      if (!r) return;
      const s = r.getAttribute("href").slice(1);
      if (!s) return;
      n.preventDefault();
      const l = document.getElementById(s);
      if (!l) return;
      const u =
          parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--nav-h",
            ),
          ) || 72,
        f = window.scrollY,
        d = l.getBoundingClientRect().top + window.scrollY - u,
        p = 1100;
      let g = null;
      const _ = (w) =>
          w < 0.5 ? 4 * w * w * w : 1 - Math.pow(-2 * w + 2, 3) / 2,
        y = (w) => {
          g || (g = w);
          const k = Math.min((w - g) / p, 1);
          (window.scrollTo(0, f + (d - f) * _(k)),
            k < 1 && requestAnimationFrame(y));
        };
      requestAnimationFrame(y);
    };
    return (
      document.addEventListener("click", a14),
      () => document.removeEventListener("click", a14)
    );
  }, []);
}
function useScrollReveal(a14) {
  T.useEffect(() => {
    const n = document.querySelectorAll(a14);
    if (!n.length) return;
    n.forEach((s) => s.classList.add("reveal"));
    const r = new IntersectionObserver(
      (s) => {
        s.forEach((l) => {
          if (l.isIntersecting) {
            const f = [
              ...l.target.parentElement.querySelectorAll(
                ".reveal:not(.visible)",
              ),
            ].indexOf(l.target);
            (setTimeout(() => l.target.classList.add("visible"), f * 80),
              r.unobserve(l.target));
          }
        });
      },
      {
        threshold: 0.12,
      },
    );
    return (n.forEach((s) => r.observe(s)), () => r.disconnect());
  }, []);
}
function HomePage() {
  const { hash: a14 } = at();
  return (
    useSmoothScroll(),
    useScrollReveal(".work__item, .contact__inner"),
    T.useEffect(() => {
      if (!a14) return;
      const n = document.querySelector(a14);
      n &&
        setTimeout(
          () =>
            n.scrollIntoView({
              behavior: "smooth",
            }),
          100,
        );
    }, [a14]),
    (
      <main>
        <Hero />
        <SelectedWork />
        <NewsSection />
        <ContactSection />
        <Footer />
      </main>
    )
  );
}
const r1 = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Extensions",
    value: "Extension",
  },
  {
    label: "Conversions",
    value: "Conversion",
  },
  {
    label: "New builds",
    value: "New build",
  },
];
function ProjectCard({ project: a14 }) {
  return a14.placeholder ? (
    <article
      className="work-grid__item work-grid__item--placeholder"
      aria-label={`${a14.code} forthcoming`}
    >
      <div
        className="work-grid__img-wrap work-grid__placeholder-img"
        aria-hidden="true"
      />
      <div className="work-grid__meta">
        <span className="work-grid__title">{a14.code}</span>
        <span className="work-grid__info">{a14.category}</span>
      </div>
    </article>
  ) : (
    <Se to={`/portfolio/${a14.slug}`} className="work-grid__item">
      <div className="work-grid__img-wrap">
        <LoadingImage
          src={a14.coverImg}
          alt={a14.code}
          className="work-grid__img"
        />
      </div>
      <div className="work-grid__meta">
        <span className="work-grid__title">{a14.code}</span>
        <span className="work-grid__info">{a14.category}</span>
      </div>
    </Se>
  );
}
function PortfolioPage() {
  const [a14, n] = T.useState("all");
  useScrollReveal(".work-grid__item, .work-page__header");
  const r = a14 === "all" ? Du : Du.filter((s) => s.type === a14);
  return (
    <div className="work-page">
      <div className="work-page__header">
        <h1 className="work-page__title">{"Portfolio"}</h1>
        <div
          className="work-page__filters"
          role="tablist"
          aria-label="Filter projects by type"
        >
          {r1.map((s) => (
            <button
              type="button"
              role="tab"
              aria-selected={a14 === s.value}
              className={`filter-btn${a14 === s.value ? " active" : ""}`}
              onClick={() => n(s.value)}
              key={s.value}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      {r.length > 0 ? (
        <div className="work-grid">
          {r.map((s) => (
            <ProjectCard project={s} key={s.code} />
          ))}
        </div>
      ) : (
        <div className="work-empty">
          
        </div>
      )}
      <Footer />
    </div>
  );
}
function Lightbox({ images: a14, index: n, onClose: r, onPrev: s, onNext: l }) {
  const u = n > 0,
    f = n < a14.length - 1,
    d = T.useCallback(
      (p) => {
        (p.key === "Escape" && r(),
          p.key === "ArrowLeft" && u && s(),
          p.key === "ArrowRight" && f && l());
      },
      [r, s, l, u, f],
    );
  return (
    T.useEffect(
      () => (
        document.addEventListener("keydown", d),
        (document.body.style.overflow = "hidden"),
        () => {
          (document.removeEventListener("keydown", d),
            (document.body.style.overflow = ""));
        }
      ),
      [d],
    ),
    (
      <div className="lightbox" onClick={r}>
        <button className="lightbox__close" onClick={r} aria-label="Close">
          {"\u2715"}
        </button>
        {u && (
          <button
            className="lightbox__arrow lightbox__arrow--prev"
            onClick={(p) => {
              (p.stopPropagation(), s());
            }}
            aria-label="Previous"
          >
            <span className="lightbox__bar" />
          </button>
        )}
        <div
          className="lightbox__img-wrap"
          onClick={(p) => p.stopPropagation()}
        >
          <img src={a14[n]} alt={`Image ${n + 1}`} className="lightbox__img" />
        </div>
        {f && (
          <button
            className="lightbox__arrow lightbox__arrow--next"
            onClick={(p) => {
              (p.stopPropagation(), l());
            }}
            aria-label="Next"
          >
            <span className="lightbox__bar" />
          </button>
        )}
        <span className="lightbox__counter">
          {n + 1}
          {" / "}
          {a14.length}
        </span>
      </div>
    )
  );
}
function wm(a14) {
  const n = a14.slice(1),
    r = [];
  let s = 0;
  for (; s < n.length;) {
    if (n.length - s <= 3 || r.length >= 4) {
      r.push({
        type: "grid",
        imgs: n.slice(s),
        startIdx: s + 1,
      });
      break;
    }
    (s + 1 < n.length &&
      (r.push({
        type: "pair",
        imgs: [n[s], n[s + 1]],
        startIdx: s + 1,
      }),
      (s += 2)),
      s < n.length &&
        r.length < 4 &&
        (r.push({
          type: "full",
          imgs: [n[s]],
          startIdx: s + 1,
        }),
        (s += 1)));
  }
  return r;
}
function GalleryEditor({ images: a14, onChange: n, onExit: r }) {
  const [s, l] = T.useState(null),
    [u, f] = T.useState(false),
    d = (w, k) => {
      if (w === k || w < 0 || k < 0 || w >= a14.length || k >= a14.length)
        return;
      const C = a14.slice();
      (([C[w], C[k]] = [C[k], C[w]]), n(C));
    },
    p = (w) => {
      s !== null && (d(s, w), l(null));
    },
    g = async () => {
      const w = a14.map((C) => `      '${C}',`).join(`
`),
        k = `    coverImg: '${a14[0]}',
    images: [
${w}
    ],`;
      try {
        (await navigator.clipboard.writeText(k),
          f(true),
          setTimeout(() => f(false), 1800));
      } catch {
        window.prompt("Copy the new gallery order:", k);
      }
    },
    _ = (w) => (
      <div
        className={`gem-tile${s === w ? " is-dragging" : ""}`}
        data-index={w}
        draggable={true}
        onDragStart={() => l(w)}
        onDragOver={(k) => k.preventDefault()}
        onDrop={() => p(w)}
        onDragEnd={() => l(null)}
        key={a14[w] ?? w}
      >
        <span className="gem-tile__num">{w + 1}</span>
        <img src={a14[w]} alt="" loading="lazy" />
        <span className="gem-tile__move">
          <button
            type="button"
            aria-label="Swap with previous"
            onClick={() => d(w, w - 1)}
          >
            {"\u25C0"}
          </button>
          <button
            type="button"
            aria-label="Swap with next"
            onClick={() => d(w, w + 1)}
          >
            {"\u25B6"}
          </button>
        </span>
      </div>
    ),
    y = wm(a14);
  return (
    <div className="gallery-editor">
      <div className="gallery-editor__bar">
        <div className="gallery-editor__lead">
          <button type="button" className="gallery-editor__btn" onClick={g}>
            {u ? "Copied \u2713" : "Copy order"}
          </button>
          <p className="gallery-editor__hint">
            {
              "Reorder sections by dragging and dropping, or use the arrows to move an image to the left or right (hover over an image to see these arrows)."
            }
            <br />
            <br />
            {
              "Click the \u201CCopy order\u201D button to copy a list of image links to your clipboard."
            }
            <br />
            <br />
            {"Press Shift + E to toggle reorder mode."}
          </p>
        </div>
        {r && (
          <button
            type="button"
            className="gallery-editor__btn gallery-editor__btn--ghost gallery-editor__btn--icon"
            onClick={r}
            aria-label="Exit reorder mode"
          >
            {"\xD7"}
          </button>
        )}
      </div>
      <div className="gallery-editor__mini">
        {a14.length > 0 && <div className="gem-row gem-row--hero">{_(0)}</div>}
        {y.map((w, k) =>
          w.type === "pair" ? (
            <div className="gem-row gem-row--pair" key={k}>
              {w.imgs.map((C, x) => _(w.startIdx + x))}
            </div>
          ) : w.type === "full" ? (
            <div className="gem-row gem-row--full" key={k}>
              {_(w.startIdx)}
            </div>
          ) : (
            <div className="gem-row gem-row--grid" key={k}>
              {w.imgs.map((C, x) => _(w.startIdx + x))}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
const xm = (a14) => `eh-gallery-order:portfolio-edit:${a14}`;
function Gh(a14, n) {
  try {
    const r = sessionStorage.getItem(xm(a14));
    if (!r) return n;
    const s = JSON.parse(r);
    if (
      Array.isArray(s) &&
      s.length === n.length &&
      s.every((l) => n.includes(l))
    )
      return s;
  } catch {}
  return n;
}
function ImageOrderControls({ index: a14, total: n, onMove: r }) {
  return (
    <div className="reorder-arrows" onClick={(s) => s.stopPropagation()}>
      <button
        type="button"
        className="reorder-arrows__btn"
        aria-label="Move image left"
        disabled={a14 <= 0}
        onClick={(s) => {
          (s.stopPropagation(), r(a14, -1));
        }}
      >
        {"\u25C0"}
      </button>
      <button
        type="button"
        className="reorder-arrows__btn"
        aria-label="Move image right"
        disabled={a14 >= n - 1}
        onClick={(s) => {
          (s.stopPropagation(), r(a14, 1));
        }}
      >
        {"\u25B6"}
      </button>
    </div>
  );
}
function ProjectPage() {
  const { slug: a14 } = op(),
    l = projects.findIndex((F) => F.slug === a14),
    u = l === -1 ? null : projects[l],
    f = u ? u.images : [],
    [d, p] = T.useState(null),
    [g, _] = T.useState(false),
    [y, w] = T.useState(() => f);
  if (
    (T.useEffect(() => {
      (w(f), p(null), _(false));
    }, [a14]),
    useScrollReveal(
      ".project-gallery__pair, .project-gallery__full, .project-gallery__grid",
    ),
    l === -1)
  )
    return <Navigate to="/portfolio" replace={true} />;
  const k = l > 0 ? projects[l - 1] : null,
    C = l < projects.length - 1 ? projects[l + 1] : null,
    x = y,
    S = false,
    P = x[0],
    L = wm(x),
    D = (F) => p(F),
    z = () => p(null),
    A = () => p((F) => Math.max(0, F - 1)),
    G = () => p((F) => Math.min(x.length - 1, F + 1)),
    B = (F) => {
      w(F);
      try {
        sessionStorage.setItem(xm(a14), JSON.stringify(F));
      } catch {}
    },
    V = (F, re) => {
      if (F === re || F < 0 || re < 0 || F >= y.length || re >= y.length)
        return;
      const le = y.slice();
      (([le[F], le[re]] = [le[re], le[F]]), B(le));
    },
    b = (F, re) => V(F, F + re);
  return (
    <div className={`project-page${S ? " project-page--editing" : ""}`}>
      <div className="project-hero" data-index="0" onClick={() => D(0)}>
        <LoadingImage src={P} alt={u.code} className="project-hero__img" />
        {S && <ImageOrderControls index={0} total={y.length} onMove={b} />}
      </div>
      <div className="project-info">
        <div className="project-info__left">
          <h1 className="project-info__code">{u.code}</h1>
          <span className="project-info__category">{u.category}</span>
        </div>
        <Se to="/portfolio" className="project-info__back">
          {"\u2190 Back to the gallery"}
        </Se>
      </div>
      <div className="project-brief">
        <p className="project-brief__text">{u.brief}</p>
        {u.collaborators?.length > 0 && (
          <dl className="project-collaborators">
            {u.collaborators.map((credit) => (
              <div className="project-collaborators__row" key={credit.role}>
                <dt>{credit.role}</dt>
                <dd>{credit.name}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      {S && <GalleryEditor images={y} onChange={B} onExit={() => s(false)} />}
      <div className="project-gallery">
        {L.map((F, re) =>
          F.type === "pair" ? (
            <div className="project-gallery__pair reveal" key={re}>
              {F.imgs.map((le, te) => (
                <div
                  className="project-gallery__pair-img"
                  data-index={F.startIdx + te}
                  onClick={() => D(F.startIdx + te)}
                  key={te}
                >
                  <LoadingImage
                    src={le}
                    alt={`${u.code} ${re}-${te}`}
                    loading="lazy"
                  />
                  {S && (
                    <ImageOrderControls
                      index={F.startIdx + te}
                      total={y.length}
                      onMove={b}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : F.type === "full" ? (
            <div
              className="project-gallery__full reveal"
              data-index={F.startIdx}
              onClick={() => D(F.startIdx)}
              key={re}
            >
              <LoadingImage
                src={F.imgs[0]}
                alt={`${u.code} ${re}`}
                loading="lazy"
              />
              {S && (
                <ImageOrderControls
                  index={F.startIdx}
                  total={y.length}
                  onMove={b}
                />
              )}
            </div>
          ) : (
            <div className="project-gallery__grid reveal" key={re}>
              {F.imgs.map((le, te) => (
                <div
                  className="project-gallery__grid-img"
                  data-index={F.startIdx + te}
                  onClick={() => D(F.startIdx + te)}
                  key={te}
                >
                  <img src={le} alt={`${u.code} ${re}-${te}`} loading="lazy" />
                  {S && (
                    <ImageOrderControls
                      index={F.startIdx + te}
                      total={y.length}
                      onMove={b}
                    />
                  )}
                </div>
              ))}
            </div>
          ),
        )}
      </div>
      <nav className="project-nav">
        <div className="project-nav__inner">
          {k ? (
            <Se
              to={`/portfolio/${k.slug}`}
              className="project-nav__link project-nav__link--prev"
            >
              <span className="project-nav__dir">{"\u2190 Previous"}</span>
              <span className="project-nav__name">{k.code}</span>
            </Se>
          ) : (
            <span />
          )}
          {C && (
            <Se
              to={`/portfolio/${C.slug}`}
              className="project-nav__link project-nav__link--next"
            >
              <span className="project-nav__dir">{"Next \u2192"}</span>
              <span className="project-nav__name">{C.code}</span>
            </Se>
          )}
        </div>
      </nav>
      <Footer />
      {d !== null && (
        <Lightbox images={x} index={d} onClose={z} onPrev={A} onNext={G} />
      )}
    </div>
  );
}
const u1 = {
  name: "",
  email: "",
  projectType: "",
  message: "",
};
function EnquiryForm() {
  const [a14, n] = T.useState(u1),
    [r, s] = T.useState({}),
    [l, u] = T.useState("idle"),
    f = (g) => (_) =>
      n((y) => ({
        ...y,
        [g]: _.target.value,
      })),
    d = () => {
      const g = {};
      return (
        a14.name.trim() || (g.name = "Please add your name."),
        a14.email.trim()
          ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a14.email) ||
            (g.email = "Please enter a valid email.")
          : (g.email = "Please add your email."),
        a14.message.trim() ||
          (g.message = "Please tell us a little about your project."),
        g
      );
    },
    p = async (g) => {
      g.preventDefault();
      const _ = d();
      if ((s(_), Object.keys(_).length)) return;
      u("submitting");
      try {
        await submitEnquiry({...a14, 'bot-field': new FormData(g.currentTarget).get('bot-field') || ''});
        u("submitted");
      } catch { u("error"); }
    };
  return l === "submitted" ? (
    <section className="enquiry" id="enquiry">
      <div className="enquiry__confirm">
        <p className="enquiry__confirm-title">
          {confirmationTitle}
        </p>
        <p className="enquiry__confirm-body">
          {"To send a real enquiry, email "}{" "}
          <a href="mailto:enquiries@eharchitects.co.uk">
            {"enquiries@eharchitects.co.uk"}
          </a>
          {"."}
        </p>
      </div>
    </section>
  ) : (
    <section className="enquiry" id="enquiry">
      <div className="enquiry__head">
        <h2 className="enquiry__title">
          {"Get in touch"}
          <span className="accent-dot">{"."}</span>
        </h2>
      </div>
      <form
        className="enquiry__form"
        name="enquiry"
        onSubmit={p}
        noValidate={true}
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="enquiry" />
        <p className="enquiry__hp">
          <label>
            {"Do not fill this out "}
            <input name="bot-field" tabIndex="-1" autoComplete="off" />
          </label>
        </p>
        <div className="enquiry__grid">
          <label className="enquiry__field">
            <span className="enquiry__label">{"Name"}</span>
            <input
              name="name"
              value={a14.name}
              onChange={f("name")}
              autoComplete="name"
              placeholder="Your name"
              aria-invalid={!!r.name}
            />
            {r.name && <span className="enquiry__error">{r.name}</span>}
          </label>
          <label className="enquiry__field">
            <span className="enquiry__label">{"Email"}</span>
            <input
              name="email"
              type="email"
              value={a14.email}
              onChange={f("email")}
              autoComplete="email"
              placeholder="your@email.com"
              aria-invalid={!!r.email}
            />
            {r.email && <span className="enquiry__error">{r.email}</span>}
          </label>
          <label className="enquiry__field">
            <span className="enquiry__label">{"Project type"}</span>
            <input
              name="projectType"
              value={a14.projectType}
              onChange={f("projectType")}
              placeholder="New home, extension, listed building…"
            />
          </label>
          <label className="enquiry__field enquiry__field--full">
            <span className="enquiry__label">{"Message"}</span>
            <span className="enquiry__message-box"><textarea
              name="message"
              rows="2"
              value={a14.message}
              onChange={f("message")}
              placeholder="Tell us about your project"
              aria-invalid={!!r.message}
            /></span>
            {r.message && <span className="enquiry__error">{r.message}</span>}
          </label>
        </div>
        {l === "error" && (
          <p className="enquiry__formerror">
            {
              "Something went wrong \u2014 please try again or email us directly."
            }
          </p>
        )}
        <div className="enquiry__actions">
          <button
            type="submit"
            className="enquiry__submit"
            disabled={l === "submitting"}
          >
            <span>{l === "submitting" ? "Sending\u2026" : "Send enquiry"}</span>
            <svg
              className="enquiry__arrow"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <line
                x1="5"
                y1="12"
                x2="19"
                y2="12"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <polyline
                points="12 5 19 12 12 19"
                stroke="currentColor"
                strokeWidth="1.7"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </form>
    </section>
  );
}
const f1 = [
  {
    "title": "Feasibility",
    "body": "You may know exactly what you want to change, or simply that something is no longer working. We turn that starting point into options, testing what the building, budget and planning context will allow before you commit to a direction."
  },
  {
    "title": "Planning",
    "body": "Every project becomes part of a wider place. We consider neighbours, streets and the character of the area as the proposal develops, then bring together the drawings and information needed for a planning application."
  },
  {
    "title": "Building regulations",
    "body": "This is where the proposal becomes a set of instructions for building. We resolve the technical requirements, prepare drawings and specifications, and coordinate the details with the other specialists involved."
  },
  {
    "title": "Project management",
    "body": "A building project involves many conversations. We help keep them connected, coordinating information and decisions as the work moves towards construction, so everyone can work from a shared understanding of the design."
  }
];
function AboutPage() {
  const [a14, n] = T.useState(null);
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero__col">
          <h1 className="about-hero__title">
            {
              "Make room for what comes next."
            }
          </h1>
          <div className="about-hero__description"><p className="about-hero__body">
            {
              "A growing family. A new way of working. A building ready for another chapter. The reason to build often arrives before the idea of what to build. At EH Architects, we help you make that leap: from a need for change to a place that makes it possible."
            }
          </p>
          <div className="about-hero__byline">
            <span className="about-hero__byline-name">
              {"Eric\xA0Haendler"}
            </span>
          </div></div>
        </div>
        <div
          className="about-hero__media img-placeholder"
          aria-label="Studio image — placeholder"
        >
          <span>{"About image"}</span>
        </div>
      </section>
      <section className="about-services">
        <span className="about-services__eyebrow section-label">
          {"What we do"}
        </span>
        <div className="about-services__list">
          {f1.map((r, s) => {
            const l = a14 === s;
            return (
              <div
                className={`about-services__item${l ? " is-open" : ""}`}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) n(s);
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine)").matches && !event.currentTarget.querySelector(":focus-visible")) n(current => current === s ? null : current);
                }}
                key={r.title}
              >
                <button className="about-services__header" type="button"
                  aria-expanded={l} aria-controls={`about-service-${s}`}
                  onClick={() => n(current => current === s ? null : s)}>
                  <span className="about-services__title">{r.title}</span>
                  <span className="about-services__toggle" aria-hidden="true">
                    {"+"}
                  </span>
                </button>
                <div className="about-services__body-wrap" id={`about-service-${s}`} aria-hidden={!l}>
                  <div className="about-services__body-clip">
                    <p className="about-services__body">{r.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="about-overview">
        <span className="about-overview__eyebrow section-label">
          {"Working together"}
        </span>
        <div className="about-overview__cols">
          <div className="about-overview__left">
            <h2 className="about-overview__heading">
              {"You bring the ambition. We work out the architecture."}
            </h2>
          </div>
          <div className="about-overview__right">
            <p className="about-overview__body">
              {
                "You do not need a finished brief to begin. Bring the things you want to make possible, the frustrations you want to leave behind and the questions you have yet to answer. We use drawings and conversation to give those ideas shape, making the choices clear as the project develops. Established in 2009, EH Architects works on homes and commercial spaces in London."
              }
            </p>
            <dl className="about-overview__facts">
              <span className="about-overview__fact-label">{"Location"}</span>
              <span className="about-overview__fact-value">{"London"}</span>
              <span className="about-overview__fact-label">{"Scope"}</span>
              <span className="about-overview__fact-value">
                {"Residential & Commercial"}
              </span>
            </dl>
          </div>
        </div>
      </section>
      <EnquiryForm />
      <Footer />
    </main>
  );
}
function NewsPage() {
  const [a14, ...n] = articles;
  return (
    useScrollReveal(".news-page__header, .news-page__feature"),
    (
      <div className="news-page">
        <div className="news-page__header reveal">
          <h1 className="news-page__title">{"News"}</h1>
        </div>
        <Se to={`/news/${a14.slug}`} className="news-page__feature reveal">
          <div className="news-page__feature-copy">
            <span className="news-page__date">{a14.date}</span>
            <h2 className="news-page__feature-title">{a14.title}</h2>
            <p className="news-page__feature-excerpt">{a14.excerpt}</p>
            <span className="news__read">{"Read more"}</span>
          </div>
          <NewsMedia article={a14} className="news-page__feature-visual" />
        </Se>
        <div className="news-page__list">
          {n.map((r) => (
            <Se to={`/news/${r.slug}`} className="news-page__item" key={r.slug}>
              <NewsMedia article={r} className="news-page__item-media" />
              <span className="news-page__date">{r.date}</span>
              <div className="news-page__body">
                <h2 className="news-page__item-title">{r.title}</h2>
                <p className="news-page__excerpt">{r.excerpt}</p>
              </div>
            </Se>
          ))}
        </div>
        <Footer />
      </div>
    )
  );
}
function NewsArticlePage() {
  const { slug: a14 } = op(),
    n = zu(),
    [r, s] = T.useState("entering"),
    [l, u] = T.useState("next"),
    f = T.useRef(null),
    d = articles.findIndex((w) => w.slug === a14);
  if (
    (T.useEffect(() => {
      s("entering");
      const w = requestAnimationFrame(() => s("idle"));
      return () => {
        (cancelAnimationFrame(w), f.current && clearTimeout(f.current));
      };
    }, [a14]),
    d === -1)
  )
    return <Navigate to="/news" replace={true} />;
  const p = articles[d],
    g = d > 0 ? articles[d - 1] : null,
    _ = d < articles.length - 1 ? articles[d + 1] : null,
    y = (w, k, C) => {
      if (
        !(w.metaKey || w.ctrlKey || w.shiftKey || w.altKey || w.button !== 0) &&
        (w.preventDefault(), r !== "exiting")
      ) {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          n(`/news/${k}`);
          return;
        }
        (u(C),
          s("exiting"),
          (f.current = setTimeout(() => {
            n(`/news/${k}`);
          }, 320)));
      }
    };
  return (
    <div className="article-page">
      <div
        className={`article-transition article-transition--${r} article-transition--${l}`}
        key={p.slug}
      >
        <div className="article-layout">
        <div className="article-header">
          <Se to="/news" className="article-header__back">
            <span className="article-nav__arrow" aria-hidden="true">←</span>{" All News"}
          </Se>
          <span className="article-header__date">{p.date}</span>
          <h1 className="article-header__title">{p.title}</h1>
        </div>
        <NewsMedia article={p} className="article-media" />
        <div className="article-body">
          {p.body.map((w, k) => (
            <p key={k}>{w}</p>
          ))}
        </div>
        </div>
        <nav className="project-nav">
          <div className="project-nav__inner">
            {g ? (
              <Se
                to={`/news/${g.slug}`}
                className="project-nav__link project-nav__link--prev"
                onClick={(w) => y(w, g.slug, "prev")}
              >
                <span className="project-nav__dir"><span className="article-nav__arrow" aria-hidden="true">←</span>{" Previous"}</span>
                <span className="project-nav__name">{g.title}</span>
              </Se>
            ) : (
              <span />
            )}
            {_ && (
              <Se
                to={`/news/${_.slug}`}
                className="project-nav__link project-nav__link--next"
                onClick={(w) => y(w, _.slug, "next")}
              >
                <span className="project-nav__dir">{"Next "}<span className="article-nav__arrow" aria-hidden="true">→</span></span>
                <span className="project-nav__name">{_.title}</span>
              </Se>
            )}
          </div>
        </nav>
      </div>
      <Footer />
    </div>
  );
}
const m1 = {
  name: "",
  email: "",
  projectType: "",
  message: "",
};
function ContactPage() {
  const [a14, n] = T.useState(m1),
    [r, s] = T.useState({}),
    [l, u] = T.useState("idle"),
    f = (g) => (_) =>
      n((y) => ({
        ...y,
        [g]: _.target.value,
      })),
    d = () => {
      const g = {};
      return (
        a14.name.trim() || (g.name = "Please add your name."),
        a14.email.trim()
          ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a14.email) ||
            (g.email = "Please enter a valid email.")
          : (g.email = "Please add your email."),
        a14.message.trim() ||
          (g.message = "Please tell us a little about your project."),
        g
      );
    },
    p = async (g) => {
      g.preventDefault();
      const _ = d();
      if ((s(_), Object.keys(_).length)) return;
      u("submitting");
      try {
        await submitEnquiry({...a14, 'bot-field': new FormData(g.currentTarget).get('bot-field') || ''});
        u("submitted");
      } catch { u("error"); }
    };
  return (
    <main className="contact-page">
      <header className="contact-page__header">
        <h1 className="contact-page__title">
          {"Get in touch"}
          <span className="accent-dot">{"."}</span>
        </h1>
        <p className="contact-page__subtitle">
          {
            "Tell us a little about your project and we'll get back to you as soon as possible."
          }
        </p>
      </header>
      <div className="contact-page__body">
        {l === "submitted" ? (
          <div className="contact-page__confirm">
            <p className="enquiry__confirm-title">
              {confirmationTitle}
            </p>
          </div>
        ) : (
          <form
            className="contact-page__form"
            name="contact"
            onSubmit={p}
            noValidate={true}
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="enquiry__hp">
              <label>
                {"Do not fill this out "}
                <input name="bot-field" tabIndex="-1" autoComplete="off" />
              </label>
            </p>
            <div className="enquiry__grid">
              <label className="enquiry__field">
                <span className="enquiry__label">{"Name"}</span>
                <input
                  name="name"
                  value={a14.name}
                  onChange={f("name")}
                  autoComplete="name"
                  placeholder="Your name"
                  aria-invalid={!!r.name}
                />
                {r.name && <span className="enquiry__error">{r.name}</span>}
              </label>
              <label className="enquiry__field">
                <span className="enquiry__label">{"Email"}</span>
                <input
                  name="email"
                  type="email"
                  value={a14.email}
                  onChange={f("email")}
                  autoComplete="email"
                  placeholder="your@email.com"
                  aria-invalid={!!r.email}
                />
                {r.email && <span className="enquiry__error">{r.email}</span>}
              </label>
              <label className="enquiry__field enquiry__field--full">
                <span className="enquiry__label">{"Project type"}</span>
                <input
                  name="projectType"
                  value={a14.projectType}
                  onChange={f("projectType")}
                  placeholder="New home, extension, listed building…"
                />
              </label>
              <label className="enquiry__field enquiry__field--full">
                <span className="enquiry__label">{"Message"}</span>
                <textarea
                  name="message"
                  rows="5"
                  value={a14.message}
                  onChange={f("message")}
                  placeholder="Tell us about your project"
                  aria-invalid={!!r.message}
                />
                {r.message && (
                  <span className="enquiry__error">{r.message}</span>
                )}
              </label>
            </div>
            {l === "error" && (
              <p className="enquiry__formerror">
                {
                  "Something went wrong \u2014 please try again shortly."
                }
              </p>
            )}
            <div className="contact-page__bottom">
              <button
                type="submit"
                className="enquiry__submit"
                disabled={l === "submitting"}
              >
                <span>
                  {l === "submitting" ? "Sending\u2026" : "Send enquiry"}
                </span>
                <svg
                  className="enquiry__arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <line
                    x1="5"
                    y1="12"
                    x2="19"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <polyline
                    points="12 5 19 12 12 19"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    fill="none"
                  />
                </svg>
              </button>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </main>
  );
}
const _1 = (a14, n, r) => Math.min(Math.max(a14, n), r),
  v1 = (a14) =>
    a14.deltaMode === WheelEvent.DOM_DELTA_LINE
      ? a14.deltaY * 18
      : a14.deltaMode === WheelEvent.DOM_DELTA_PAGE
        ? a14.deltaY * window.innerHeight
        : a14.deltaY,
  y1 = () =>
    Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    ) - window.innerHeight,
  w1 = (a14) => {
    let n = a14;
    for (; n && n !== document.body && n !== document.documentElement;) {
      const s = window.getComputedStyle(n).overflowY;
      if (/(auto|scroll)/.test(s) && n.scrollHeight > n.clientHeight)
        return true;
      n = n.parentElement;
    }
    return false;
  };
function useSmoothWheelScroll() {
  T.useEffect(() => {
    const a14 = window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      n = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (a14 || !n) return;
    let r = window.scrollY,
      s = window.scrollY,
      l = 0,
      u = false;
    const f = () => {
        (l && cancelAnimationFrame(l), (l = 0), (u = false));
      },
      d = () => {
        if (((s += (r - s) * 0.13), Math.abs(r - s) < 0.45)) {
          ((s = r), window.scrollTo(0, s), f());
          return;
        }
        (window.scrollTo(0, s), (l = requestAnimationFrame(d)));
      },
      p = (_) => {
        if (
          document.body.style.overflow === "hidden" ||
          Math.abs(_.deltaX) > Math.abs(_.deltaY) ||
          w1(_.target)
        )
          return;
        const y = y1();
        y <= 0 ||
          (_.preventDefault(),
          u || ((s = window.scrollY), (r = s)),
          (r = _1(r + v1(_), 0, y)),
          u || ((u = true), (l = requestAnimationFrame(d))));
      },
      g = () => {
        u || ((s = window.scrollY), (r = s));
      };
    return (
      window.addEventListener("wheel", p, {
        passive: false,
      }),
      window.addEventListener("scroll", g, {
        passive: true,
      }),
      () => {
        (f(),
          window.removeEventListener("wheel", p),
          window.removeEventListener("scroll", g));
      }
    );
  }, []);
}
function LiveSite() {
  const playIntro = T.useRef(window.location.pathname === "/").current;
  const [a14, n] = T.useState(playIntro ? "active" : "done"),
    [r, s] = T.useState(!playIntro),
    [l, u] = T.useState(playIntro ? "loading" : "docked"),
    [f, d] = T.useState(false),
    [p, g] = T.useState(() => {
      try {
        return localStorage.getItem("eh-dock-hidden") !== "1";
      } catch {
        return true;
      }
    }),
    _ = T.useRef(null),
    y = at();
  useSmoothWheelScroll();
  const w = T.useCallback(() => {
      (n("done"), u("docked"));
    }, []),
    k = () => {
      !r || l !== "loading" || (n("exiting"), u("docking"));
    },
    C = a14 !== "done",
    x = /^\/portfolio\/[^/]+/.test(y.pathname),
    S = y.pathname === "/portfolio" || x,
    P = false;
  useIntroScrollLock(C);
  return (
    T.useEffect(() => {
      const L = document.documentElement,
        D = localStorage.getItem("eh-theme"),
        z = paletteOptions.includes(D) ? D : "dark";
      (z === "light" ? delete L.dataset.theme : (L.dataset.theme = z),
        (L.dataset.style = "architectural"));
    }, []),
    T.useEffect(() => {
      const L = document.documentElement;
      x
        ? (L.dataset.route = "project")
        : S
          ? (L.dataset.route = "portfolio")
          : delete L.dataset.route;
    }, [S, x]),
    T.useEffect(() => {
      const L = (D) => {
        if (window.matchMedia("(max-width: 900px)").matches) return;
        const z = D.target,
          A = (z.tagName || "").toLowerCase();
        A === "input" ||
          A === "textarea" ||
          z.isContentEditable ||
          (!D.shiftKey && !D.ctrlKey && !D.metaKey && !D.altKey && !D.repeat &&
            (D.key === "D" || D.key === "d") &&
            (D.preventDefault(),
            g((G) => {
              const B = !G;
              try {
                localStorage.setItem("eh-dock-hidden", B ? "0" : "1");
              } catch {}
              return B;
            })));
      };
      return (
        window.addEventListener("keydown", L),
        () => window.removeEventListener("keydown", L)
      );
    }, []),
    (
      <>
        <SharedLogo
          phase={l}
          navLogoSlotRef={_}
          drawn={r}
          navScrolled={f}
          onDrawn={() => s(true)}
          onDocked={w}
          hidden={false}
        />
        {C && (
          <LoadingScreen drawn={r} exiting={a14 === "exiting"} onEnter={k} />
        )}
        <Navigation
          introPhase={a14}
          logoSlotRef={_}
          sharedLogoActive={true}
          onScrolledChange={d}
        />
        {!C && p && (
          <div
            className={`switcher-dock${S ? " switcher-dock--portfolio" : ""}${x ? " switcher-dock--project" : ""}`}
            aria-label="Display controls"
          >
            <p className="switcher-dock__hint">Press 'D' to open/close this window.</p>
            <div className="switcher-control">
              <span className="switcher-control__label">{"Heading"}</span>
              <HeadingSwitcher />
            </div>
            <div className="switcher-control">
              <span className="switcher-control__label">{"Body"}</span>
              <BodySwitcher />
            </div>
            <div className="switcher-control">
              <span className="switcher-control__label">{"Accent"}</span>
              <ColourControl kind="accent" />
            </div>
            <div className="switcher-control">
              <span className="switcher-control__label">{"Palette"}</span>
              <ColourControl kind="palette" />
            </div>
          </div>
        )}
        <Routes>
          <Un path="/" element={<HomePage />} />
          <Un path="/work/*" element={<LegacyPortfolioRedirect />} />
          <Un path="/portfolio" element={<PortfolioPage />} />
          <Un path="/portfolio/:slug" element={<ProjectPage />} />
          <Un path="/about" element={<AboutPage />} />
          <Un path="/news" element={<NewsPage />} />
          <Un path="/news/:slug" element={<NewsArticlePage />} />
          <Un path="/contact" element={<ContactPage />} />
          <Un path="/privacy-policy" element={<LegalPage kind="privacy" />} />
          <Un path="/terms" element={<LegalPage kind="terms" />} />
        </Routes>
      </>
    )
  );
}
function LegacyPortfolioRedirect() {
  const location = at();
  return <Navigate replace to={location.pathname.replace(/^\/work(?=\/|$)/, '/portfolio') + location.search + location.hash} />;
}
function LegalPage({ kind }) {
  const page = legalPages[kind];
  T.useEffect(() => {
    document.title = page.title + " | EH Architects";
    window.scrollTo(0, 0);
    return () => {
      document.title = "EH Architects";
    };
  }, [page]);
  return (
    <main className="legal-page">
      <header>
        <h1>{page.title}</h1>
      </header>
      <div className="legal-page__content">
        {page.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </section>
        ))}
      </div>
      <Footer />
    </main>
  );
}
export default LiveSite;
