// src/components/Join.jsx
import { motion } from "framer-motion";

export default function Join() {
    // 🔗 Update these to your real links when ready
    const GROUP_CHAT_LINK = "https://chat.whatsapp.com/LnQudjWG00OLFVk8O4wqCJ?mode=ems_copy_c";
    const LINKEDIN_LINK = "https://www.linkedin.com/company/revive-at-uic"; // update if different
    const INSTAGRAM_LINK = "https://www.instagram.com/reviveatuic";

    const cards = [
        { title: "WhatsApp", desc: "Get the latest community updates", href: GROUP_CHAT_LINK },
        { title: "LinkedIn", desc: "News, infographics & leadership posts", href: LINKEDIN_LINK },
        { title: "Instagram", desc: "@reviveatuic", href: INSTAGRAM_LINK },
    ];

    return (
        <motion.section
            id="join"
            className="bg-white text-revive-brown scroll-mt-24"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold">Join Revive @ UIC</h2>
                <p className="mt-2 text-revive-stone">
                    Plug in through our announcement chat and social channels. Freshmen welcome!
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                    {cards.map((card) => (
                        <motion.a
                            key={card.title}
                            href={card.href}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-xl border border-revive-tan p-5"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <p className="font-semibold">{card.title}</p>
                            <p className="text-sm text-revive-stone">{card.desc}</p>
                        </motion.a>
                    ))}
                </div>

                <motion.div
                    className="mt-10 rounded-xl border border-revive-tan bg-revive-cream/70 p-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <h3 className="text-xl font-semibold">Mentorship Program</h3>
                    <p className="mt-2 text-revive-stone">
                        Get paired with an upperclassman mentor for academic, spiritual, and campus life support.
                    </p>
                    <div className="mt-4 flex gap-3">
                        <a
                            href="#"
                            className="rounded-lg bg-revive-brown text-revive-cream px-4 py-2 hover:bg-revive-coffee"
                        >
                            Apply (Mentee)
                        </a>
                        <a
                            href="#"
                            className="rounded-lg border border-revive-brown px-4 py-2 hover:bg-revive-tan/50"
                        >
                            Apply (Mentor)
                        </a>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
