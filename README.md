# Luxury Interior Design Website

A premium, modern, and highly interactive website for an Interior Design Firm inspired by Studia-54. Built with Next.js, TypeScript, GSAP, and Framer Motion.

## Features

- 🎨 **Luxury Design**: Soft, elegant color palette (beige, cream, pastel gold, soft brown, muted teal)
- 🖱️ **Custom Cursor**: Interactive cursor with hover effects
- ✨ **Smooth Animations**: GSAP ScrollTrigger and Framer Motion animations throughout
- 📱 **Responsive**: Fully responsive design with mobile-friendly interactions
- 🌓 **Theme Toggle**: Dark/Light theme support
- 🎬 **Page Transitions**: Smooth page transitions with luxury loader
- 📄 **Multiple Pages**: Home, About, Portfolio, Services, Process, Blog, Contact

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **GSAP** - Advanced animations and scroll effects
- **Framer Motion** - React animation library
- **Lenis** - Smooth scrolling
- **Lucide React** - Icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   ├── about/              # About page
│   ├── portfolio/          # Portfolio page
│   ├── services/           # Services page
│   ├── process/            # Process page
│   ├── blog/               # Blog page
│   └── contact/            # Contact page
├── components/
│   ├── CustomCursor.tsx    # Custom cursor component
│   ├── Navigation.tsx      # Navigation bar
│   ├── PageLoader.tsx      # Page transition loader
│   ├── SmoothScroll.tsx    # Smooth scroll wrapper
│   └── pages/              # Page-specific components
└── ...
```

## Key Components

### Custom Cursor
Interactive cursor that expands on hover with text labels for buttons and images.

### Smooth Scroll
Lenis-powered smooth scrolling with inertia for a premium feel.

### Animations
- GSAP ScrollTrigger for scroll-based animations
- Framer Motion for component animations
- Parallax effects on images
- Text reveal animations
- Hover effects

## Color Palette

- **Beige**: `#f5f1ea` - Primary background
- **Cream**: `#fdfbf7` - Light backgrounds
- **Gold**: `#e8b04a` - Accent color
- **Brown**: `#a0886f` - Text and borders
- **Teal**: `#3a8d84` - Secondary accent

## Customization

All colors, fonts, and animations can be customized in:
- `tailwind.config.js` - Color palette and theme
- `app/globals.css` - Global styles
- Individual component files - Component-specific styles

## License

MIT






