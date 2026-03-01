# Portfolio Site — Repo Navigation Guide

> **Purpose:** Quick reference for AI assistants and developers to navigate this repo when making changes. This is Gaurav Verma's portfolio site.

---

## 1. Tech Stack & Entry Points

| Item | Value |
|------|-------|
| **Framework** | Next.js 14 (App Router) |
| **Styling** | styled-components v6 |
| **Animations** | react-transition-group, ScrollReveal, anime.js |
| **Content** | Markdown + gray-matter + remark/remark-html |
| **Dev** | `npm run dev` → http://localhost:3000 |
| **Build** | `npm run build` |
| **Path alias** | `@/*` → `./src/*` (see `jsconfig.json`) |

---

## 2. Directory Structure (Quick Map)

```
gaurav_verma_v1/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.js           # Root layout (Nav, Social, Email, Footer, Loader)
│   │   ├── page.js             # Home page — composes all sections
│   │   ├── projects/route.js   # API: GET /projects
│   │   ├── jobs/route.js       # API: GET /jobs
│   │   └── featured/route.js   # API: GET /featured
│   │
│   ├── components/
│   │   ├── sections/           # Main page sections (in order)
│   │   │   ├── hero.js         # Intro, name, tagline
│   │   │   ├── about.js        # About section
│   │   │   ├── jobs.js         # Experience (fetches /jobs)
│   │   │   ├── featured.js     # "Some Things I've Built" (fetches /featured)
│   │   │   ├── projects.js     # "Other Noteworthy Projects" (fetches /projects)
│   │   │   └── contact.js      # Contact form/CTA
│   │   ├── nav.js              # Top nav + hamburger menu
│   │   ├── menu.js             # Mobile menu
│   │   ├── footer.js
│   │   ├── social.js           # Left sidebar social links
│   │   ├── email.js            # Right sidebar email
│   │   ├── loader.js           # Initial page loader
│   │   └── icons/              # Icon components (GitHub, External, etc.)
│   │
│   ├── styles/
│   │   ├── GlobalStyle.js      # Global CSS
│   │   ├── theme.js            # Breakpoints + mixins
│   │   ├── variables.js        # CSS variables (colors, fonts, spacing)
│   │   ├── mixins.js           # Reusable styled-component mixins
│   │   └── ...
│   │
│   ├── hooks/
│   │   ├── useScrollDirection.js
│   │   └── useOnClickOutside.js
│   │
│   ├── utils/
│   │   ├── index.js            # navDelay, loaderDelay, KEY_CODES, hex2rgba
│   │   └── sr.js               # ScrollReveal init
│   │
│   └── config.js               # email, socialMedia, navLinks, colors, srConfig
│
├── public/
│   ├── content/
│   │   ├── projects/           # Flat .md files — listed in "Other Noteworthy Projects"
│   │   ├── jobs/               # One folder per company: CompanyName/index.md
│   │   ├── featured/           # One folder per project: ProjectName/index.md + cover image
│   │   ├── posts/              # Blog-style posts (folder/index.md)
│   │   └── blogs/              # Blog posts (folder/index.md)
│   ├── favicon.ico
│   └── ...
│
├── package.json
├── jsconfig.json
└── README.md
```

---

## 3. Content System — Where to Edit What

### 3.1 Projects (Other Noteworthy Projects)

- **Location:** `public/content/projects/*.md`
- **Format:** One `.md` file per project (flat structure)
- **API:** `GET /projects` → reads all `.md`, returns only those with `showInProjects: true`
- **Slug:** Derived from filename: `filename.replace(/\.md$/, "").replace(/\s+/g, "-")`

**Frontmatter schema:**
```yaml
---
date: '2024-04-14'
title: 'Project Name'
github: 'https://github.com/...'
external: 'https://...'        # optional
tech: [PyTorch, React, ...]
showInProjects: true           # required — only these appear
---
Body markdown (description)
```

**To add a project:** Create `public/content/projects/MyProject.md` with `showInProjects: true`.

**To hide a project:** Set `showInProjects: false` or remove the key.

---

### 3.2 Featured Projects (Some Things I've Built)

- **Location:** `public/content/featured/ProjectName/index.md` + cover image
- **Format:** One folder per project; `index.md` + optional `cover` image (e.g. `aura.webp`)
- **API:** `GET /featured` → reads all subfolders, returns sorted by `date`
- **Slug:** `projectName.replace(/[^a-z0-9]+/gi, "-")` (used for image path)

**Frontmatter schema:**
```yaml
---
date: "2"                      # sort order (lower = earlier)
title: "Aura"
cover: "aura.webp"             # image in same folder
github: "https://github.com/..."
external: "https://..."
tech: [React-Native, CSS, ...]
cta: "..."                     # optional "Learn More" link
---
Body markdown (description)
```

**Image path:** `/content/featured/{slug}/{cover}` (e.g. `/content/featured/Aura/aura.webp`)

**To add:** Create `public/content/featured/NewProject/index.md` and add cover image in same folder.

---

### 3.3 Jobs (Experience)

- **Location:** `public/content/jobs/CompanyName/index.md`
- **Format:** One folder per company
- **API:** `GET /jobs` → reads all company folders, returns `{ ...frontmatter, html }`

**Frontmatter schema:**
```yaml
---
date: '2023-8-15'
title: 'Machine Learning and DevOps lead'
company: 'GDSC'
location: 'Kota, Raj'
range: 'Aug 2023 - Aug 2024'
url: 'https://...'
---
Bullet points (markdown)
```

**To add:** Create `public/content/jobs/NewCompany/index.md`.

---

### 3.4 Posts & Blogs

- **Location:** `public/content/posts/` and `public/content/blogs/`
- **Format:** `FolderName/index.md`
- **Note:** No API routes found for these — they may be used elsewhere or planned for future use. Check for `fetch('/posts')` or similar before adding.

---

## 4. Key Files for Common Changes

| Change | File(s) |
|--------|---------|
| Update name, tagline, bio, links | `src/components/sections/hero.js`, `src/components/sections/about.js` |
| Add/remove nav links | `src/config.js` → `navLinks` |
| Add/remove social links | `src/config.js` → `socialMedia` |
| Change email | `src/config.js` → `email` |
| Change colors | `src/config.js` → `colors`, `src/styles/variables.js` → CSS variables |
| Add project | `public/content/projects/NewProject.md` |

---

## 5. Data Flow

```
Home page (page.js)
├── Hero
├── About
├── Jobs
│   └── fetch('/jobs') → src/app/jobs/route.js → public/content/jobs/*/index.md
├── Featured
│   └── fetch('/featured') → src/app/featured/route.js → public/content/featured/*/index.md
├── Projects
│   └── fetch('/projects') → src/app/projects/route.js → public/content/projects/*.md
│       └── Each project: fetch(`/content/projects/${slug}.md`) for body content
└── Contact
```

---

## 6. Styling Conventions

- **Theme:** `src/styles/theme.js` (breakpoints, mixins)
- **Variables:** `src/styles/variables.js` (colors, fonts, spacing)
- **Global:** `src/styles/GlobalStyle.js`
- **Breakpoints:** `theme.bp.mobileS`, `mobileM`, `mobileL`, `tabletS`, `tabletL`, `desktopXS`, `desktopS`, `desktopM`, `desktopL`
- **Colors:** CSS vars like `--green`, `--navy`, `--light-slate`, etc.

---

## 7. Gotchas & Notes

1. **Projects slug vs filename:** Slug is derived from filename. `RAG_PDF_Chatbot.md` → slug `RAG_PDF_Chatbot`. The `ProjectContent` component fetches `/content/projects/${slug}.md`, so slug must match the actual filename (minus `.md`).

2. **Featured cover images:** Must live in the same folder as `index.md`. Path: `public/content/featured/ProjectName/cover.webp`.

3. **Loader:** Only shown on home (`pathname === "/"`). Other routes skip loader.

4. **Client-only:** Layout uses `ClientOnly` to avoid hydration issues with loader/state.

5. **External links:** Layout's `handleExternalLinks` adds `rel="noopener noreferrer"` and `target="_blank"` to external links after load.

---

## 8. Quick Command Reference

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

---

*Last updated: Mar 2025*
