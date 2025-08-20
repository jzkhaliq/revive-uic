import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    startOfWeek,
    endOfWeek,
} from "date-fns";

export default function Events() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const upcoming = [
        { date: "2025-09-18", title: "Picnic Social", where: "UH Lawn", link: "#" },
    ];
    const recaps = [
        { title: "Freshmen Meet & Greet", summary: "50+ students, games, chai.", link: "#" },
        { title: "Service Day", summary: "Neighborhood cleanup + lunch.", link: "#" },
    ];

    // Build a full-week grid so weekdays align nicely
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const days = useMemo(
        () => eachDayOfInterval({ start: gridStart, end: gridEnd }),
        [gridStart, gridEnd]
    );

    const today = new Date();

    const getEventFor = (date) =>
        upcoming.find((e) => isSameDay(new Date(e.date), date));

    const MonthNav = () => (
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Calendar</h3>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setCurrentDate((d) => subMonths(d, 1))}
                    className="p-2 rounded-lg hover:bg-revive-tan/20 transition-colors"
                    aria-label="Previous month"
                >
                    ←
                </button>
                <span className="py-2 px-4 font-medium rounded-lg bg-revive-tan/20">
                    {format(currentDate, "MMMM yyyy")}
                </span>
                <button
                    onClick={() => setCurrentDate((d) => addMonths(d, 1))}
                    className="p-2 rounded-lg hover:bg-revive-tan/20 transition-colors"
                    aria-label="Next month"
                >
                    →
                </button>
            </div>
        </div>
    );

    return (
        <section id="events" className="bg-revive-cream text-revive-brown">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold">Events</h2>
                    <p className="mt-2 text-revive-stone">Upcoming and recent highlights.</p>

                    <div className="grid lg:grid-cols-3 gap-6 mt-8">
                        {/* Calendar */}
                        <motion.div
                            className="lg:col-span-2 rounded-xl border border-revive-tan bg-white/70 p-5"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <MonthNav />

                            <div className="grid grid-cols-7 gap-1">
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                                    <div
                                        key={d}
                                        className="text-center p-2 text-xs font-medium text-revive-stone uppercase tracking-wide"
                                    >
                                        {d}
                                    </div>
                                ))}

                                <AnimatePresence initial={false} mode="popLayout">
                                    {days.map((day) => {
                                        const ev = getEventFor(day);
                                        const inMonth = isSameMonth(day, currentDate);
                                        const isToday = isSameDay(day, today);

                                        return (
                                            <motion.div
                                                key={day.toISOString()}
                                                layout
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                className={[
                                                    "relative p-2 min-h-[74px] text-center border border-revive-tan/10 rounded-lg",
                                                    inMonth ? "" : "text-revive-stone/40 bg-white/40",
                                                    ev ? "bg-revive-tan/20" : "",
                                                    isToday ? "ring-2 ring-revive-brown/50" : "",
                                                    "transition-colors",
                                                ].join(" ")}
                                            >
                                                <span className="text-sm">{format(day, "d")}</span>

                                                {ev && (
                                                    <a
                                                        href={ev.link}
                                                        className="mt-2 block text-[11px] leading-tight font-medium bg-revive-brown text-revive-cream px-2 py-1 rounded hover:opacity-90"
                                                        title={`${ev.title} — ${format(new Date(ev.date), "PP")} @ ${ev.where}`}
                                                    >
                                                        {ev.title}
                                                    </a>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* Event Lists */}
                        <div className="space-y-6">
                            {/* Upcoming */}
                            <motion.div
                                className="rounded-xl border border-revive-tan bg-white/70 p-5"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <h3 className="text-xl font-semibold mb-4">Upcoming</h3>
                                <ul className="space-y-3">
                                    {upcoming.map((e, i) => (
                                        <li key={i} className="flex items-start justify-between">
                                            <div>
                                                <p className="font-medium">{e.title}</p>
                                                <p className="text-sm text-revive-stone">{e.where}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="inline-block text-sm px-2 py-1 rounded bg-revive-tan/40">
                                                    {format(new Date(e.date), "MMM d")}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Recent */}
                            <motion.div
                                className="rounded-xl border border-revive-tan bg-white/70 p-5"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <h3 className="text-xl font-semibold mb-4">Recent</h3>
                                <ul className="space-y-3">
                                    {recaps.map((r, i) => (
                                        <li key={i}>
                                            <p className="font-medium">{r.title}</p>
                                            <p className="text-sm text-revive-stone">{r.summary}</p>
                                            <a
                                                href={r.link}
                                                className="text-sm underline hover:text-revive-brown transition-colors"
                                            >
                                                Photos &amp; notes
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
