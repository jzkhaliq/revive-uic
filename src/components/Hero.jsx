import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="min-h-[70vh] grid place-items-center bg-revive-brown text-revive-cream px-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.h1 
                    className="text-4xl md:text-6xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    Revive at UIC
                </motion.h1>
                <motion.p 
                    className="mt-4 text-lg md:text-xl text-revive-tan"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    Faith • Leadership • Service
                </motion.p>
                <motion.a 
                    href="#join" 
                    className="inline-block mt-6 rounded-lg bg-revive-cream text-revive-brown px-6 py-3 font-semibold hover:bg-revive-tan"
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
    );
}
