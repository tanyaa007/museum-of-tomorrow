import { MotionConfig } from 'framer-motion';
import { AboutMuseum } from './components/AboutMuseum';
import { ExhibitGallery } from './components/ExhibitGallery';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FutureLab } from './components/FutureLab';
import { FutureTimeline } from './components/FutureTimeline';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <Manifesto />
        <ExhibitGallery />
        <FutureTimeline />
        <FutureLab />
        <AboutMuseum />
        <FinalCTA />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  );
}
