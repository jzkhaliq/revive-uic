import { motion } from 'framer-motion';

export default function Donate() {
    return (
        <motion.section id="donate" className="bg-revive-cream text-revive-brown" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold">Support the Chapter</h2>
                <p className="mt-2 text-revive-stone">
                    Your donations fund student programming, speakers, service projects, and food at events.
                </p>

                <div className="mt-8 flex flex-col md:flex-row gap-6">
                    <motion.a
                        href="#"
                        className="flex-1 rounded-xl bg-revive-brown text-revive-cream px-6 py-4 text-center font-semibold"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Donate Online
                    </motion.a>
                    <motion.div className="flex-1 rounded-xl border border-revive-tan bg-white/70 p-5" whileHover={{ scale: 1.01 }}>
                        <p className="font-semibold">Other ways to give</p>
                        <ul className="list-disc list-inside text-sm text-revive-stone mt-2">
                            <li>Cash at events</li>
                            <li>Zelle/Venmo (ask an officer)</li>
                            <li>Sponsor a specific program</li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
