import { Nav } from './sections/Nav';
import { Hero } from './sections/Hero';
import { Brief } from './sections/Brief';
import { Strategy } from './sections/Strategy';
import { LogoSystem } from './sections/LogoSystem';
import { Colour } from './sections/Colour';
import { Typography } from './sections/Typography';
import { VisualLanguage } from './sections/VisualLanguage';
import { Applications } from './sections/Applications';
import { WebsiteConcept } from './sections/WebsiteConcept';
import { Guidelines } from './sections/Guidelines';
import { Downloads } from './sections/Downloads';
import { Footer } from './sections/Footer';

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-birch focus:p-3">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Brief />
        <Strategy />
        <LogoSystem />
        <Colour />
        <Typography />
        <VisualLanguage />
        <Applications />
        <WebsiteConcept />
        <Guidelines />
        <Downloads />
      </main>
      <Footer />
    </>
  );
}
