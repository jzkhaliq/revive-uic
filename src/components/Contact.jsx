import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <motion.section id="contact" className="bg-white text-revive-brown" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold">Contact</h2>
                <p className="mt-2 text-revive-stone">
                    Questions, collaboration, or speaking requests? Reach out.
                </p>

                <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <motion.form
                        className="rounded-xl border border-revive-tan bg-revive-cream/70 p-6"
                        action="https://formspree.io/f/meozbvrr"
                        method="POST"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 }}
                    >
                        <div className="grid gap-4">
                            <input
                                className="rounded-lg border border-revive-tan bg-white/80 px-3 py-2 outline-none"
                                placeholder="Your name"
                                name="name"
                                required
                            />
                            <input
                                className="rounded-lg border border-revive-tan bg-white/80 px-3 py-2 outline-none"
                                placeholder="Email"
                                type="email"
                                name="email"
                                required
                            />
                            <textarea
                                className="rounded-lg border border-revive-tan bg-white/80 px-3 py-2 outline-none min-h-32"
                                placeholder="Message"
                                name="message"
                                required
                            />
                            <button className="rounded-lg bg-revive-brown text-revive-cream px-4 py-2 font-semibold hover:bg-revive-coffee">
                                Send
                            </button>
                        </div>
                    </motion.form>


                    <motion.div className="rounded-xl border border-revive-tan bg-white/70 p-6" initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                        <p className="font-semibold">Direct</p>
                        <ul className="mt-2 text-sm text-revive-stone space-y-1">
                            <li>Email: <a className="underline" href="mailto:reviveatuic@gmail.com">reviveatuic@gmail.com</a></li>
                            <li>Instagram: <a className="underline" href="#">@reviveatuic</a></li>
                            <li>📍 University of Illinois Chicago</li>
                        </ul>
                        
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
