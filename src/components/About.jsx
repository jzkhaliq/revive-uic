import { motion } from 'framer-motion';

export default function About() {
    return (
        <section id="about" className="bg-revive-cream text-revive-brown">
            <motion.div 
                className="max-w-5xl mx-auto px-6 py-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <motion.h2 
                    className="text-3xl font-bold"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    About Us
                </motion.h2>
                <motion.p 
                    className="mt-4 text-revive-stone"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    Revive is a national student org fostering spiritual growth, leadership, and service.
                    The UIC chapter offers mentorship, events, and community—open to all students.
                </motion.p>
            </motion.div>
        </section>
    );
}
