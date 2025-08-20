export default function Events() {
    const upcoming = [
        { date: "Sep 10", title: "Kickoff Social", where: "Student Center East", link: "#" },
        { date: "Sep 17", title: "Mentorship Info Night", where: "Burnham Hall", link: "#" },
    ];
    const recaps = [
        { title: "Freshmen Meet & Greet", summary: "50+ students, games, chai.", link: "#" },
        { title: "Service Day", summary: "Neighborhood cleanup + lunch.", link: "#" },
    ];

    return (
        <section id="events" className="bg-revive-cream text-revive-brown">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold">Events</h2>
                <p className="mt-2 text-revive-stone">Upcoming and recent highlights.</p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="rounded-xl border border-revive-tan bg-white/70 p-5">
                        <h3 className="text-xl font-semibold">Upcoming</h3>
                        <ul className="mt-4 space-y-3">
                            {upcoming.map((e, i) => (
                                <li key={i} className="flex items-start justify-between">
                                    <div>
                                        <p className="font-medium">{e.title}</p>
                                        <p className="text-sm text-revive-stone">{e.where}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-block text-sm px-2 py-1 rounded bg-revive-tan/40">
                                            {e.date}
                                        </span>
                                        <div>
                                            <a href={e.link} className="text-sm underline hover:text-revive-coffee">
                                                Details / RSVP
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-xl border border-revive-tan bg-white/70 p-5">
                        <h3 className="text-xl font-semibold">Recaps</h3>
                        <ul className="mt-4 space-y-3">
                            {recaps.map((r, i) => (
                                <li key={i}>
                                    <p className="font-medium">{r.title}</p>
                                    <p className="text-sm text-revive-stone">{r.summary}</p>
                                    <a href={r.link} className="text-sm underline hover:text-revive-coffee">
                                        Photos & notes
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-10 rounded-xl overflow-hidden border border-revive-tan">
                    <iframe
                        src="https://calendar.google.com/calendar/embed?src=96deb86c4f855d7ba47cee285642bfb53d1"
                        className="w-full h-[600px]"
                        title="Revive at UIC Calendar"
                    />
                </div>
            </div>
        </section>
    );
}
