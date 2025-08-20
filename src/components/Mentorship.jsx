export default function Mentorship() {
    return (
        <section id="mentorship" className="bg-white text-revive-brown scroll-mt-20">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold">Mentorship Program</h2>
                <p className="mt-2 text-revive-stone">
                    Pair up with an upperclassman for academic, spiritual, and campus-life support.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="rounded-xl border border-revive-tan bg-revive-cream/60 p-6">
                        <h3 className="font-semibold">What we offer</h3>
                        <ul className="mt-3 list-disc list-inside text-sm text-revive-stone space-y-1">
                            <li>1:1 mentor check-ins</li>
                            <li>Study + skills workshops</li>
                            <li>Faith circles & reflections</li>
                            <li>Career + internship guidance</li>
                        </ul>
                    </div>

                    <div className="rounded-xl border border-revive-tan bg-white/70 p-6">
                        <h3 className="font-semibold">Mentee</h3>
                        <p className="mt-2 text-sm text-revive-stone">
                            Great for freshmen & transfers. Tell us your goals and interests.
                        </p>
                        <a href="#" className="inline-block mt-4 rounded-lg bg-revive-brown text-revive-cream px-4 py-2 font-semibold hover:bg-revive-coffee">
                            Apply as Mentee
                        </a>
                    </div>

                    <div className="rounded-xl border border-revive-tan bg-white/70 p-6">
                        <h3 className="font-semibold">Mentor</h3>
                        <p className="mt-2 text-sm text-revive-stone">
                            Upperclassmen lead with compassion and consistency.
                        </p>
                        <a href="#" className="inline-block mt-4 rounded-lg border border-revive-brown px-4 py-2 font-semibold hover:bg-revive-tan/50">
                            Apply as Mentor
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
