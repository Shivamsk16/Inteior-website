import Hero from '@/components/pages/Home/Hero'
import FeaturedProjects from '@/components/pages/Home/FeaturedProjects'
import AboutPreview from '@/components/pages/Home/AboutPreview'
import ServicesPreview from '@/components/pages/Home/ServicesPreview'
import Testimonials from '@/components/pages/Home/Testimonials'
import CTA from '@/components/pages/Home/CTA'

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <FeaturedProjects />
      <AboutPreview />
      <ServicesPreview />
      <Testimonials />
      <CTA />
    </main>
  )
}

