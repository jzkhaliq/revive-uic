// src/components/Hero.jsx
import { motion } from "framer-motion";
import heroImg from "../assets/hero.jpg";

export default function Hero() {
  const goToJoin = (e) => {
    e.preventDefault();
    document.getElementById("join")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="relative min-h-[70svh]">
      {/* Image (better LCP) */}
      <img
        src={heroImg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_45%] md:object-center"
        fetchpriority="high"
        decoding="async"
      />

      {/* Readability overlay (linear + radial) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/5" />
        <div className="absolute inset-0 [background:radial-gradient(70%_55%_at_50%_45%,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      {/* Content */}
      <section className="relative z-10 min-h-[70svh] grid place-items-center px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Revive at UIC
          </motion.h1>

          <motion.p
            className="mt-4 text-lg md:text-xl text-white/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Faith • Leadership • Service
          </motion.p>

          <motion.a
            href="#join"
            onClick={goToJoin}
            className="inline-block mt-6 rounded-lg bg-white text-revive-brown px-6 py-3 font-semibold hover:opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            Get Involved
          </motion.a>
        </motion.div>
      </section>
    </header>
  );
}
