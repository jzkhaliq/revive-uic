// src/components/Join.jsx
import { motion } from "framer-motion";
import { FaWhatsapp, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Join() {
    // 🔗 Your real links
    const GROUP_CHAT_LINK = "https://chat.whatsapp.com/LnQudjWG00OLFVk8O4wqCJ?mode=ems_copy_c";
    const LINKEDIN_LINK = "https://www.linkedin.com/company/revive-at-uic";
    const INSTAGRAM_LINK = "https://www.instagram.com/reviveatuic";

    const cards = [
        { title: "WhatsApp", desc: "Get the latest community updates", href: GROUP_CHAT_LINK, Icon: FaWhatsapp },
        { title: "LinkedIn", desc: "News, infographics & leadership posts", href: LINKEDIN_LINK, Icon: FaLinkedin },
        { title: "Instagram", desc: "@reviveatuic", href: INSTAGRAM_LINK, Icon: FaInstagram },
    ];

    const IconBadge = ({ Icon }) => (
        <span className="inline-grid place-items-center h-11 w-11 rounded-full bg-revive-brown text-revive-cream shadow">
            <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
    );

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
                    {cards.map(({ title, desc, href, Icon }) => (
                        <motion.a
                            key={title}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group rounded-xl border border-revive-tan p-5 bg-white/70 hover:bg-revive-cream/70 transition"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            aria-label={title}
                        >
                            <div className="flex items-center gap-3">
                                <IconBadge Icon={Icon} />
                                <div>
                                    <p className="font-semibold">{title}</p>
                                    <p className="text-sm text-revive-stone">{desc}</p>
                                </div>
                            </div>
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
