// src/components/Donate.jsx
import { Link } from "react-router-dom";
import { FaMoneyBillWave } from "react-icons/fa";

export default function Donate() {
    return (
        <section id="donate" className="bg-revive-cream text-revive-brown">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold">Support the Chapter</h2>
                <p className="mt-2 text-revive-stone">
                    Your donations fund student programming, speakers, service projects, and food at events.
                </p>

                {/* Stacked layout */}
                <div className="mt-8 space-y-6">
                    {/* Smaller CTA card */}
                    <div className="w-full max-w-md mx-auto">
                        <Link
                            to="/donate"
                            className="group relative block rounded-2xl bg-revive-brown text-revive-cream px-5 py-5 shadow hover:bg-revive-coffee transition overflow-hidden"
                        >
                            {/* shine sweep on hover */}
                            <span
                                className="pointer-events-none absolute -left-10 top-0 h-full w-8
                           bg-gradient-to-r from-transparent via-white/40 to-transparent
                           -skew-x-12 transform -translate-x-full
                           group-hover:translate-x-[220%] transition-transform duration-700"
                            />
                            <div className="flex items-center gap-3 justify-center">
                                <FaMoneyBillWave aria-hidden className="h-5 w-5" />
                                <span className="font-semibold">Donate with Zelle</span>
                            </div>
                            <p className="mt-1 text-center text-sm text-revive-cream/90">
                                Zelle • (779) 772-6485
                            </p>
                        </Link>
                    </div>

                    {/* Other ways box */}
                    <div className="max-w-2xl mx-auto rounded-2xl border border-revive-tan bg-white/70 p-6">
                        <h3 className="text-xl font-semibold">Other ways to give</h3>
                        <ul className="mt-3 space-y-2 text-revive-stone">
                            <li>Cash at events</li>
                            <li>Sponsor a specific program</li>
                            <li>
                                Questions? <a className="underline" href="mailto:reviveatuic@gmail.com">reviveatuic@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
