import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Events from "./components/Events";
import Join from "./components/Join";
import Mentorship from "./components/Mentorship";
import Donate from "./components/Donate";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="font-sans bg-revive-cream text-revive-brown scroll-smooth">
      <Navbar />
      <Hero />
      <About />
      <Events />
      <Join />
      <Mentorship />
      <Donate />
      <Contact />
      <Footer />
    </div>
  );
}
