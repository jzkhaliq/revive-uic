export default function Join() {
    return (
        <section id="join" className="bg-white text-revive-brown">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold">Join Revive @ UIC</h2>
                <p className="mt-2 text-revive-stone">
                    Plug in through our announcement chat and mailing list. Freshmen welcome!
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <a
                        href="#"
                        className="rounded-xl border border-revive-tan p-5 hover:bg-revive-cream/60 transition"
                    >
                        <p className="font-semibold">Group Chat</p>
                        <p className="text-sm text-revive-stone">WhatsApp/GroupMe link</p>
                    </a>

                    <a
                        href="#"
                        className="rounded-xl border border-revive-tan p-5 hover:bg-revive-cream/60 transition"
                    >
                        <p className="font-semibold">Mailing List</p>
                        <p className="text-sm text-revive-stone">Event reminders + highlights</p>
                    </a>

                    <a
                        href="#"
                        className="rounded-xl border border-revive-tan p-5 hover:bg-revive-cream/60 transition"
                    >
                        <p className="font-semibold">Instagram</p>
                        <p className="text-sm text-revive-stone">@reviveatuic</p>
                    </a>
                </div>

                <div className="mt-10 rounded-xl border border-revive-tan bg-revive-cream/70 p-6">
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
                </div>
            </div>
        </section>
    );
}
