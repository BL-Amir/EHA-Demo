import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import SelectedWork from '../components/SelectedWork'
import News from '../components/News'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Home() {
  const { hash } = useLocation()
  useSmoothScroll()
  useScrollReveal('.work__item, .contact__inner')

  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [hash])

  return (
    <main>
      <Hero />
      <SelectedWork />
      <News />
      <Contact />
      <Footer />
    </main>
  )
}
