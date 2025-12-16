import AboutHero from '@/components/pages/About/AboutHero'
import Timeline from '@/components/pages/About/Timeline'
import Team from '@/components/pages/About/Team'
import Philosophy from '@/components/pages/About/Philosophy'

export default function AboutPage() {
  return (
    <main className="relative pt-24">
      <AboutHero />
      <Timeline />
      <Team />
      <Philosophy />
    </main>
  )
}



