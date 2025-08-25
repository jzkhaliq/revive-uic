import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 4);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const link = "hover:text-revive-coffee transition";
    const navVariants = {
        hidden: { opacity: 0, y: -8 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
    };

    // Prefix anchors so they work from /admin or /donate too
    const base = import.meta.env.BASE_URL || "/";

    const sectionLinks = [
        ["About", `${base}#about`],
        ["Events", `${base}#events`],
        ["Join", `${base}#join`],
        ["Contact", `${base}#contact`],
    ];

    return (
        <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className={`sticky top-0 z-50 bg-revive-cream/90 backdrop-blur ${scrolled ? "shadow border-b border-revive-tan/70" : ""
                }`}
        >
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Brand → go home */}
                <Link to="/" className="text-lg font-semibold text-revive-brown" onClick={() => setOpen(false)}>
                    Revive @ UIC
                </Link>

                {/* desktop links */}
                <div className="hidden md:flex items-center gap-6 text-sm">
                    {sectionLinks.map(([label, href]) => (
                        <a key={label} href={href} className={link} onClick={() => setOpen(false)}>
                            {label}
                        </a>
                    ))}
                    {/* Revive external link */}
                    <a
                        href="https://www.revive-co.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={link}
                        onClick={() => setOpen(false)}
                    >
                        Revive
                    </a>
                    {/* Donate → route */}
                    <Link to="/donate" className={link} onClick={() => setOpen(false)}>
                        Donate
                    </Link>
                    {/* Admin route */}
                    <Link to="/admin" className={`${link} opacity-80 hover:opacity-100`} onClick={() => setOpen(false)}>
                        Admin
                    </Link>
                </div>

                {/* mobile button */}
                <button
                    aria-label="Toggle menu"
                    className="md:hidden rounded-lg border border-revive-tan px-3 py-2"
                    onClick={() => setOpen((o) => !o)}
                >
                    {open ? "Close" : "Menu"}
                </button>
            </div>

            {/* mobile menu */}
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="md:hidden border-t border-revive-tan bg-revive-cream"
                >
                    <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3">
                        {sectionLinks.map(([label, href]) => (
                            <a key={label} href={href} className="py-2" onClick={() => setOpen(false)}>
                                {label}
                            </a>
                        ))}
                        {/* Revive external link */}
                        <a
                            href="https://www.revive-co.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2"
                            onClick={() => setOpen(false)}
                        >
                            Revive
                        </a>
                        <Link to="/donate" className="py-2" onClick={() => setOpen(false)}>
                            Donate
                        </Link>
                        <Link to="/admin" className="py-2" onClick={() => setOpen(false)}>
                            Admin
                        </Link>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
