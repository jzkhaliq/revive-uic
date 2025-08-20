import { useEffect, useState } from "react";

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

    return (
        <nav className={`sticky top-0 z-50 bg-revive-cream/90 backdrop-blur ${scrolled ? "shadow border-b border-revive-tan/70" : ""}`}>
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <a href="#" className="text-lg font-semibold text-revive-brown">Revive @ UIC</a>

                {/* desktop links */}
                <div className="hidden md:flex gap-6 text-sm">
                    <a href="#about" className={link}>About</a>
                    <a href="#events" className={link}>Events</a>
                    <a href="#join" className={link}>Join</a>
                    <a href="#donate" className={link}>Donate</a>
                    <a href="#contact" className={link}>Contact</a>
                </div>

                {/* mobile button */}
                <button
                    aria-label="Toggle menu"
                    className="md:hidden rounded-lg border border-revive-tan px-3 py-2"
                    onClick={() => setOpen(o => !o)}
                >
                    {open ? "Close" : "Menu"}
                </button>
            </div>

            {/* mobile menu */}
            {open && (
                <div className="md:hidden border-t border-revive-tan bg-revive-cream">
                    <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3">
                        {[
                            ["About", "#about"],
                            ["Events", "#events"],
                            ["Join", "#join"],
                            ["Donate", "#donate"],
                            ["Contact", "#contact"],
                        ].map(([label, href]) => (
                            <a key={href} href={href} className="py-2" onClick={() => setOpen(false)}>
                                {label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
