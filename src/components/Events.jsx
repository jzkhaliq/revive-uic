import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState, useCallback } from "react";
import {
    format,
    startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay,
    addMonths, subMonths, startOfWeek, endOfWeek,
    parseISO, compareAsc,
    parse as parseDT,
    endOfDay
} from "date-fns";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const cn = (...s) => s.filter(Boolean).join(" ");

// Convert "HH:mm" -> "h:mm a"
const formatTime12h = (t) => {
    if (!t) return "";
    try {
        const d = parseDT(t, "HH:mm", new Date());
        return format(d, "h:mm a");
    } catch {
        return t;
    }
};

export default function Events() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [active, setActive] = useState(null);   // selected event for modal
    const [photoIdx, setPhotoIdx] = useState(0);  // carousel index

    // Fetch published events (once)
    useEffect(() => {
        (async () => {
            const q = query(collection(db, "events"), where("published", "==", true));
            const snap = await getDocs(q);
            const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));

            // Normalize date/times
            items.forEach(ev => {
                ev._dateObj = parseISO(ev.date);

                if (ev.startTime) {
                    ev._startDT = parseDT(`${ev.date} ${ev.startTime}`, "yyyy-MM-dd HH:mm", new Date());
                } else {
                    ev._startDT = parseDT(`${ev.date} 00:00`, "yyyy-MM-dd HH:mm", new Date());
                }

                if (ev.endTime) {
                    ev._endDT = parseDT(`${ev.date} ${ev.endTime}`, "yyyy-MM-dd HH:mm", new Date());
                } else {
                    ev._endDT = endOfDay(ev._dateObj);
                }
            });

            items.sort((a, b) => compareAsc(a._startDT, b._startDT));
            setEvents(items);
        })();
    }, []);

    // Group by YYYY-MM-DD for calendar cells
    const byDay = useMemo(() => {
        const m = new Map();
        for (const ev of events) {
            if (!m.has(ev.date)) m.set(ev.date, []);
            m.get(ev.date).push(ev);
        }
        return m;
    }, [events]);

    // Month grid helpers
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const days = useMemo(
        () => eachDayOfInterval({ start: gridStart, end: gridEnd }),
        [gridStart, gridEnd]
    );
    const today = new Date();

    const MonthNav = () => (
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Calendar</h3>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setCurrentDate(d => subMonths(d, 1))}
                    className="p-2 rounded-lg hover:bg-revive-tan/20"
                    aria-label="Previous month"
                >
                    ←
                </button>
                <span className="py-2 px-4 font-medium rounded-lg bg-revive-tan/20">
                    {format(currentDate, "MMMM yyyy")}
                </span>
                <button
                    onClick={() => setCurrentDate(d => addMonths(d, 1))}
                    className="p-2 rounded-lg hover:bg-revive-tan/20"
                    aria-label="Next month"
                >
                    →
                </button>
            </div>
        </div>
    );

    // Classify by end time
    const now = new Date();

    const upcoming = useMemo(() => {
        return events
            .filter(e => e._endDT >= now)
            .sort((a, b) => a._startDT - b._startDT);
    }, [events, now]);

    const recent = useMemo(() => {
        return events
            .filter(e => e._endDT < now)
            .sort((a, b) => b._endDT - a._endDT)
            .slice(0, 5);
    }, [events, now]);

    const open = useCallback((ev) => { setActive(ev); setPhotoIdx(0); }, []);
    const close = useCallback(() => setActive(null), []);

    // ESC closes modal
    useEffect(() => {
        if (!active) return;
        const onKey = (e) => { if (e.key === "Escape") close(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [active, close]);

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
                        {/* CALENDAR */}
                        <motion.div
                            className="lg:col-span-2 rounded-xl border border-revive-tan bg-white/70 p-5"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <MonthNav />
                            <div className="grid grid-cols-7 gap-1">
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                                    <div
                                        key={d}
                                        className="text-center p-2 text-xs font-medium text-revive-stone uppercase tracking-wide"
                                    >
                                        {d}
                                    </div>
                                ))}

                                <AnimatePresence initial={false} mode="popLayout">
                                    {days.map((day) => {
                                        const inMonth = isSameMonth(day, currentDate);
                                        const isToday = isSameDay(day, today);
                                        const key = format(day, "yyyy-MM-dd");
                                        const dayEvents = byDay.get(key) || [];

                                        return (
                                            <motion.div
                                                key={day.toISOString()}
                                                layout
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                className={cn(
                                                    "relative p-2 min-h-[88px] text-center border border-revive-tan/10 rounded-lg transition-colors",
                                                    inMonth ? "bg-white" : "text-revive-stone/40 bg-white/50",
                                                    dayEvents.length ? "bg-revive-tan/20" : "",
                                                    isToday ? "ring-2 ring-revive-brown/50" : ""
                                                )}
                                            >
                                                <span className="text-sm">{format(day, "d")}</span>
                                                <div className="mt-1 space-y-1">
                                                    {dayEvents.map((ev) => (
                                                        <button
                                                            key={ev.id}
                                                            onClick={() => open(ev)}
                                                            className="w-full text-[11px] leading-tight font-medium bg-revive-brown text-revive-cream px-2 py-1 rounded hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-revive-brown/40"
                                                            title={`${ev.title}${ev.where ? ` — ${ev.where}` : ""}${ev.startTime ? ` @ ${formatTime12h(ev.startTime)}` : ""}`}
                                                        >
                                                            {ev.title}
                                                        </button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* LISTS */}
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
                                    {upcoming.length === 0 && (
                                        <li className="text-sm text-revive-stone">No upcoming events yet.</li>
                                    )}
                                    {upcoming.map((e) => (
                                        <li key={e.id} className="flex items-start justify-between gap-3">
                                            <div>
                                                <button onClick={() => open(e)} className="text-left">
                                                    <p className="font-medium underline decoration-dotted underline-offset-4">
                                                        {e.title}
                                                    </p>
                                                    <p className="text-sm text-revive-stone">
                                                        {e.where}
                                                        {e.startTime && ` • ${formatTime12h(e.startTime)}${e.endTime ? `–${formatTime12h(e.endTime)}` : ""}`}
                                                    </p>
                                                </button>
                                            </div>
                                            <span className="shrink-0 inline-block text-sm px-2 py-1 rounded bg-revive-tan/40">
                                                {format(parseISO(e.date), "MMM d")}
                                            </span>
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
                                    {recent.length === 0 && (
                                        <li className="text-sm text-revive-stone">No recent events yet.</li>
                                    )}
                                    {recent.map((r) => (
                                        <li key={r.id} className="flex items-start justify-between gap-3">
                                            <div>
                                                <button
                                                    onClick={() => open(r)}
                                                    className="font-medium underline decoration-dotted underline-offset-4"
                                                >
                                                    {r.title}
                                                </button>
                                                <p className="text-sm text-revive-stone">
                                                    {r.where}
                                                    {r.startTime && ` • ${formatTime12h(r.startTime)}${r.endTime ? `–${formatTime12h(r.endTime)}` : ""}`}
                                                </p>
                                                {r.link && (
                                                    <a href={r.link} className="text-sm underline hover:text-revive-brown">
                                                        Photos &amp; notes
                                                    </a>
                                                )}
                                            </div>
                                            <span className="shrink-0 inline-block text-sm px-2 py-1 rounded bg-revive-tan/40">
                                                {format(parseISO(r.date), "MMM d")}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* MODAL (details + photos) */}
            <AnimatePresence>
                {active && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={close} role="dialog" aria-modal="true"
                    >
                        <motion.div
                            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
                            className="w-full max-w-2xl rounded-2xl bg-white p-6 text-revive-brown shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h4 className="text-2xl font-bold">{active.title}</h4>
                                    <p className="text-sm text-revive-stone">
                                        {format(parseISO(active.date), "EEEE, MMM d, yyyy")}
                                        {active.startTime && ` • ${formatTime12h(active.startTime)}${active.endTime ? `–${formatTime12h(active.endTime)}` : ""}`}
                                    </p>
                                    {active.where && <p className="text-sm text-revive-stone mt-1">{active.where}</p>}
                                </div>
                                <button className="p-2 rounded-lg hover:bg-revive-tan/20" onClick={close} aria-label="Close">✕</button>
                            </div>

                            {active.description && (
                                <p className="mt-4 whitespace-pre-wrap leading-relaxed">{active.description}</p>
                            )}

                            {/* Photos carousel */}
                            {Array.isArray(active.photos) && active.photos.length > 0 && (
                                <div className="mt-5">
                                    <div className="relative rounded-xl overflow-hidden border border-revive-tan">
                                        <img
                                            src={active.photos[photoIdx]}
                                            alt={`Photo ${photoIdx + 1}`}
                                            className="w-full max-h-[420px] object-cover"
                                            loading="lazy"
                                        />
                                        {active.photos.length > 1 && (
                                            <>
                                                <button
                                                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 hover:bg-white"
                                                    onClick={() => setPhotoIdx(i => (i - 1 + active.photos.length) % active.photos.length)}
                                                    aria-label="Previous photo"
                                                >
                                                    ‹
                                                </button>
                                                <button
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 hover:bg-white"
                                                    onClick={() => setPhotoIdx(i => (i + 1) % active.photos.length)}
                                                    aria-label="Next photo"
                                                >
                                                    ›
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    {active.photos.length > 1 && (
                                        <div className="mt-2 flex gap-2 overflow-x-auto">
                                            {active.photos.map((src, i) => (
                                                <button
                                                    key={src}
                                                    onClick={() => setPhotoIdx(i)}
                                                    className={cn(
                                                        "h-14 w-20 rounded-md overflow-hidden border",
                                                        i === photoIdx ? "border-revive-brown" : "border-revive-tan"
                                                    )}
                                                >
                                                    <img
                                                        src={src}
                                                        alt={`Thumb ${i + 1}`}
                                                        className="h-full w-full object-cover"
                                                        loading="lazy"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
