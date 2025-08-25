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
                    Revive is a national initiative built on the belief that Muslims shouldn’t just survive—we should thrive,
                    excelling in every aspect of life while staying rooted in our deen. Our core principle is
                    <span className="italic"> إحياء اتباع الدين </span> [revival of following the religion], striving for
                    <span className="italic"> الفوز في الدارين </span> [success in both abodes].
                </motion.p>

                <motion.p
                    className="mt-4 text-revive-stone"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    Through workshops, mentorship, and innovative programs, Revive connects students and professionals
                    to opportunities that grow spiritual, academic, and professional excellence. Learn more about the
                    national movement at{" "}
                    <a
                        href="https://www.revive-co.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-revive-coffee"
                    >
                        revive-co.org
                    </a>.
                </motion.p>

                <motion.p
                    className="mt-4 text-revive-stone"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    The UIC chapter brings this mission to campus by fostering spiritual growth, leadership, and service
                    within our student community. We host events, mentorship programs, and collaborative projects
                    that allow students to unlock their potential and be part of a nationwide movement of purpose-driven success.
                </motion.p>
            </motion.div>
        </section>
    );
}
