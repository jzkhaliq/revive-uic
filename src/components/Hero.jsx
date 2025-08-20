export default function Hero() {
    return (
        <section className="min-h-[70vh] grid place-items-center bg-revive-brown text-revive-cream px-6 text-center">
            <div>
                <h1 className="text-4xl md:text-6xl font-bold">Revive at UIC</h1>
                <p className="mt-4 text-lg md:text-xl text-revive-tan">Faith • Leadership • Service</p>
                <a href="#join" className="inline-block mt-6 rounded-lg bg-revive-cream text-revive-brown px-6 py-3 font-semibold hover:bg-revive-tan">
                    Get Involved
                </a>
            </div>
        </section>
    );
}
