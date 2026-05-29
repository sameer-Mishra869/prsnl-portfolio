import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollBot from "./components/ScrollBot";
import LiveBackground from "./components/LiveBackground";

export default function App() {
  return (
    <>
      {/* Fixed canvas live background — renders behind everything */}
      <LiveBackground />

      {/* All content sits above the canvas via z-index */}
      <div className="app-content">
        <Navbar />
        <ScrollBot />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
