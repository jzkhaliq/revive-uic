import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <motion.footer className="bg-revive-brown text-revive-cream" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm">© {new Date().getFullYear()} Revive at UIC</p>
                <nav className="flex gap-4 text-sm">
                    <a href="#about" className="hover:text-revive-tan">About</a>
                    <a href="#events" className="hover:text-revive-tan">Events</a>
                    <a href="#join" className="hover:text-revive-tan">Join</a>
                    <a href="#donate" className="hover:text-revive-tan">Donate</a>
                    <a href="#contact" className="hover:text-revive-tan">Contact</a>
                </nav>
            </div>
        </motion.footer>
    );
}
