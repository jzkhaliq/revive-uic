export default function Contact() {
    return (
        <section id="contact" className="bg-white text-revive-brown">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold">Contact</h2>
                <p className="mt-2 text-revive-stone">
                    Questions, collaboration, or speaking requests? Reach out.
                </p>

                <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <form
                        className="rounded-xl border border-revive-tan bg-revive-cream/70 p-6"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="grid gap-4">
                            <input
                                className="rounded-lg border border-revive-tan bg-white/80 px-3 py-2 outline-none"
                                placeholder="Your name"
                            />
                            <input
                                className="rounded-lg border border-revive-tan bg-white/80 px-3 py-2 outline-none"
                                placeholder="Email"
                                type="email"
                            />
                            <textarea
                                className="rounded-lg border border-revive-tan bg-white/80 px-3 py-2 outline-none min-h-32"
                                placeholder="Message"
                            />
                            <button className="rounded-lg bg-revive-brown text-revive-cream px-4 py-2 font-semibold hover:bg-revive-coffee">
                                Send
                            </button>
                        </div>
                        {/* Swap to Formspree or a serverless function later */}
                    </form>

                    <div className="rounded-xl border border-revive-tan bg-white/70 p-6">
                        <p className="font-semibold">Direct</p>
                        <ul className="mt-2 text-sm text-revive-stone space-y-1">
                            <li>Email: <a className="underline" href="mailto:reviveatuic@gmail.com">reviveatuic@gmail.com</a></li>
                            <li>Instagram: <a className="underline" href="#">@reviveatuic</a></li>
                            <li>UIC Campus, Chicago, IL</li>
                        </ul>
                        <p className="mt-4 font-semibold">Office Hours</p>
                        <p className="text-sm text-revive-stone">TBD each semester</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
