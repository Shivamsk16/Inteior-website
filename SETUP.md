# Setup Instructions

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm start
```

## Features Implemented

✅ **All Pages Created:**
- Home page with hero, featured projects, about preview, services preview, testimonials, and CTA
- About page with timeline, team, and philosophy
- Portfolio page with filterable project grid
- Services page with interactive service cards
- Process page with step-by-step timeline
- Blog page with magazine-style layout
- Contact page with form

✅ **Animations & Interactions:**
- Custom cursor with hover effects
- Smooth scrolling with Lenis
- GSAP ScrollTrigger animations
- Framer Motion component animations
- Parallax effects
- Page transition loader
- Magnetic hover effects (component created)

✅ **Design Features:**
- Luxury color palette (beige, cream, gold, brown, teal)
- Elegant typography (Playfair Display, Cormorant Garamond, Inter)
- Responsive design
- Dark/Light theme toggle
- Sticky navigation with fade on scroll

✅ **Additional Features:**
- Project detail pages
- Blog post pages
- Lazy loading ready
- Mobile-friendly interactions

## Customization

### Colors
Edit `tailwind.config.js` to customize the color palette.

### Fonts
Fonts are loaded in `app/layout.tsx`. You can replace them with your preferred fonts.

### Animations
- GSAP animations: Check individual component files
- Framer Motion: Used throughout for component animations
- Custom cursor: `components/CustomCursor.tsx`

## Notes

- Images are using Unsplash placeholders. Replace with your own images.
- Video in hero section uses Pexels. Replace with your own video or remove for image-only.
- Form submission in contact page is simulated. Connect to your backend API.

