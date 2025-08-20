import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";

export default function App() {
  return (
    <div className="font-sans bg-revive-cream text-revive-brown">
      <Navbar />
      <Hero />
      <About />
    </div>
  );
}
