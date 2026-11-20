import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Projects } from '../components/Projects';
import { Skills } from '../components/Skills';
import { Journey } from '../components/Journey';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07080a] text-[#f4f2eb] selection:bg-[#00ff9d] selection:text-[#07080a]">
      <Header />
      <main className="flex-1">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
