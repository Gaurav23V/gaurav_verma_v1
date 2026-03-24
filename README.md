# gaurav_verma_v1

A personal portfolio website showcasing full-stack development skills, projects, and professional experience.

## Purpose

This is a personal portfolio website for Gaurav Verma, a Full-Stack Developer passionate about building scalable backend systems and data pipelines. The site features a modern, animated design with sections for work experience, featured projects, and contact information.

## Tech Stack

- **Framework:** Next.js 14.2.5 (React 18)
- **Styling:** styled-components 6.1.12
- **Animations:** anime.js 3.2.2, scrollreveal 4.0.9
- **Markdown Processing:** gray-matter, remark, remark-html
- **Transitions:** react-transition-group 4.4.5
- **Language:** JavaScript (with JSX)

## Implementation Details

### Project Structure

```
src/
├── app/
│   ├── page.js          # Main page component
│   └── layout.js        # Root layout
├── components/
│   ├── sections/
│   │   ├── hero.js      # Hero section with intro
│   │   ├── about.js     # About me section
│   │   ├── jobs.js      # Work experience timeline
│   │   ├── featured.js  # Featured projects showcase
│   │   ├── projects.js  # All projects grid
│   │   └── contact.js   # Contact form & social links
│   ├── footer.js
│   ├── menu.js
│   ├── loader.js
│   ├── email.js
│   └── social.js
├── styles/
│   ├── GlobalStyle.js   # Global CSS styles
│   ├── theme.js         # Theme configuration
│   ├── fonts.js         # Custom font definitions
│   ├── variables.js     # CSS variables
│   └── TransitionStyles.js
├── hooks/
│   ├── useOnClickOutside.js
│   └── useScrollDirection.js
└── config.js            # Site configuration
```

### Key Features

- **Animated Hero Section:** Smooth fade-up animations on page load using react-transition-group
- **Scroll Reveal:** Elements animate into view as the user scrolls
- **Dynamic Content:** Projects and job experiences loaded from markdown files
- **Responsive Design:** Mobile-first approach with styled-components
- **Custom Fonts:** SF Mono font family for code/technical aesthetic

### Featured Projects

The portfolio showcases projects including:
- **TexForge:** Web-based LaTeX editor with real-time PDF compilation
- **StoreIt:** Cloud storage solution
- **FoodVision:** Food recognition application

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd gaurav_verma_v1

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Usage

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. Navigate through sections using the navigation menu
3. View featured projects and work experience
4. Contact via email or social links

## Configuration

Edit `src/config.js` to customize:
- Email address
- Social media links (GitHub, Instagram, Twitter, LinkedIn)
- Navigation links
- Color scheme (green, navy, darkNavy)
- Scroll reveal animation settings