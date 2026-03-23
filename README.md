# Pranay Rishi — Personal Portfolio

> **Live:** [pranayrishi35.github.io](https://pranayrishi35.github.io)

A dynamic, scrollytelling single-page portfolio built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools. Pure performance.

---

## ✨ Features

| Feature | Detail |
|---|---|
| 🌧 **Matrix Rain Canvas** | Animated cyan/violet character rain in the hero |
| ✨ **CSS Glitch Effect** | Cinematic glitch on the hero title |
| ⌨️ **Typewriter** | Cycles through roles via Typed.js |
| 🖱 **Magnetic Cursor** | Custom cursor with hover bloom effect |
| 📊 **Count-Up Stats** | Animated number counters on page load |
| 🃏 **Skill Rings** | GSAP-animated SVG radial progress indicators |
| 📅 **Live Timeline** | Line that draws itself as you scroll |
| 🚀 **3D Card Tilt** | Perspective tilt on all cards on hover |
| 📬 **Contact Links** | Slide-on-hover animated contact cards |
| 🔔 **Cert Tooltips** | Issue date appears on hover over certs |
| 📱 **Fully Responsive** | Hamburger nav, fluid layouts, mobile-first |
| ⚡ **Offline PWA** | Service Worker caches core assets for offline use |
| 🔍 **SEO Ready** | `robots.txt`, `sitemap.xml`, semantic HTML, meta tags |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (semantic) |
| Styling | Vanilla CSS3 — custom properties, glassmorphism, animations |
| Scripting | Vanilla JavaScript (ES6+) |
| Animations | [GSAP 3](https://greensock.com/gsap/) + ScrollTrigger |
| Typewriter | [Typed.js](https://mattboldt.com/demos/typed-js/) |
| Icons | [Font Awesome 6](https://fontawesome.com/) |
| Fonts | [Space Grotesk + Space Mono](https://fonts.google.com/) via Google Fonts |
| Hosting | GitHub Pages |

---

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML — all sections, fully commented
├── css/
│   └── style.css       # All styles — theme, animations, responsive
├── js/
│   └── main.js         # All JS — GSAP, cursor, matrix, typed, counter
├── images/
│   └── pfp.png         # Profile photo
├── resume.pdf          # CV download (replace with your own)
├── sw.js               # Service Worker (offline/PWA support)
├── robots.txt          # SEO: allow all crawlers
└── sitemap.xml         # SEO: sitemap for search engines
```

---

## 🚀 Running Locally

No build step required — just open in a browser:

```bash
# Option 1: VS Code Live Server (recommended)
# Open the folder in VS Code → click "Go Live" in the status bar

# Option 2: Python HTTP server
python -m http.server 5500
# Then open http://localhost:5500

# Option 3: Node.js
npx serve .
```

> **Note:** The Service Worker requires a server (not `file://` protocol) to register correctly. Use one of the options above.

---

## 📦 Deployment

The portfolio is deployed via **GitHub Pages** from the `main` branch.

```bash
git add .
git commit -m "feat: <your message>"
git push origin main
```

GitHub Pages auto-deploys within ~60 seconds at **https://pranayrishi35.github.io**.

---

## 🎨 Customisation

| What to change | Where |
|---|---|
| Colors / theme | CSS custom properties at the top of `css/style.css` |
| Section content | Each section in `index.html` is clearly HTML-commented |
| Typewriter strings | `strings: [...]` array in `js/main.js` → `initHero()` |
| Skill levels | `data-level` attribute on each `.skill-card` |
| Resume | Replace `resume.pdf` in the root folder |
| Profile photo | Replace `images/pfp.png` (any photo, keeps the ring styling) |

---

## 👤 Author

**Pranay Rishi**
B.Tech Computer Engineering · Lovely Professional University (LPU) · 2027

- 🌐 [Portfolio](https://pranayrishi35.github.io)
- 💼 [LinkedIn](https://www.linkedin.com/in/pranay-rishi-atpr3105)
- 🐙 [GitHub](https://github.com/pranayrishi35)
- 📧 [pranayrishi1418@gmail.com](mailto:pranayrishi1418@gmail.com)

---

## 📄 License

This project is open source. Feel free to fork and adapt it for your own portfolio — a credit link back is appreciated but not required.
