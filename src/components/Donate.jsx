export default function Donate() {
    return (
        <section id="donate" className="bg-revive-cream text-revive-brown">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold">Support the Chapter</h2>
                <p className="mt-2 text-revive-stone">
                    Your donations fund student programming, speakers, service projects, and food at events.
                </p>

                <div className="mt-8 flex flex-col md:flex-row gap-6">
                    <a
                        href="#"
                        className="flex-1 rounded-xl bg-revive-brown text-revive-cream px-6 py-4 text-center font-semibold hover:bg-revive-coffee"
                    >
                        Donate Online
                    </a>
                    <div className="flex-1 rounded-xl border border-revive-tan bg-white/70 p-5">
                        <p className="font-semibold">Other ways to give</p>
                        <ul className="list-disc list-inside text-sm text-revive-stone mt-2">
                            <li>Cash at events</li>
                            <li>Zelle/Venmo (ask an officer)</li>
                            <li>Sponsor a specific program</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
