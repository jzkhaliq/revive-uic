// src/components/Donate.jsx
import { Link } from "react-router-dom";

export default function Donate() {
    return (
        <section id="donate" className="bg-revive-cream text-revive-brown">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold">Support the Chapter</h2>
                <p className="mt-2 text-revive-stone">
                    Your donations fund student programming, speakers, service projects, and food at events.
                </p>

                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                    {/* Left card — clamped on large screens */}
                    <div className="w-full lg:max-w-[560px] justify-self-start">
                        <Link
                            to="/donate"
                            className="block rounded-2xl bg-revive-brown text-revive-cream text-center font-semibold py-8 md:py-10 lg:py-12 shadow hover:bg-revive-coffee transition"
                        >
                            Donate Online (Zelle)
                        </Link>
                    </div>

                    {/* Right card */}
                    <div className="rounded-2xl border border-revive-tan bg-white/70 p-6">
                        <h3 className="text-xl font-semibold">Other ways to give</h3>
                        <ul className="mt-3 space-y-2 text-revive-stone">
                            <li>Cash at events</li>
                            <li>Sponsor a specific program</li>
                            <li>Email reviveatuic@gmail.com for inquiries</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
