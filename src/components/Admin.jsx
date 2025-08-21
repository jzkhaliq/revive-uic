// src/components/Admin.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, login, logout, db } from "../firebase";
import {
    collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const ADMIN_EMAIL = "reviveatuic@gmail.com";

export default function Admin() {
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [form, setForm] = useState({
        title: "", date: "", startTime: "", endTime: "",
        location: "", description: "", imageUrl: "", rsvpLink: "", published: true
    });

    const navigate = useNavigate();
    const colRef = collection(db, "events");

    // ESC to go back home
    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") navigate("/"); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [navigate]);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, setUser);
        loadEvents();
        return () => unsub();
    }, []);

    async function loadEvents() {
        const snap = await getDocs(colRef);
        setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }

    async function saveEvent(e) {
        e.preventDefault();
        if (!user) return;
        const payload = {
            ...form,
            datetimeISO: `${form.date}T${form.startTime}`,
            updatedAt: serverTimestamp(),
        };
        await addDoc(colRef, payload);
        setForm({
            title: "", date: "", startTime: "", endTime: "",
            location: "", description: "", imageUrl: "", rsvpLink: "", published: true
        });
        await loadEvents();
    }

    async function togglePublish(id, value) {
        await updateDoc(doc(db, "events", id), { published: value, updatedAt: serverTimestamp() });
        await loadEvents();
    }

    async function remove(id) {
        if (!confirm("Delete this event?")) return;
        await deleteDoc(doc(db, "events", id));
        await loadEvents();
    }

    // Back bar with site styling
    const BackBar = () => (
        <div className="sticky top-0 z-50 bg-revive-cream/90 backdrop-blur border-b border-revive-tan/60">
            <div className="max-w-4xl mx-auto px-4 py-2">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-revive-brown hover:opacity-80">
                    <span aria-hidden>←</span>
                    <span>Back to main site</span>
                </Link>
            </div>
        </div>
    );

    // Shared input styles (site colors)
    const inputCls =
        "border border-revive-tan rounded-xl p-2 bg-white/80 text-revive-brown " +
        "focus:outline-none focus:ring-2 focus:ring-revive-brown/30 focus:border-revive-brown placeholder:text-revive-stone";

    const btnPrimary =
        "px-4 py-2 rounded-xl bg-revive-brown text-revive-cream hover:bg-revive-coffee transition";

    const btnOutline =
        "px-3 py-1.5 rounded-xl border border-revive-brown text-revive-brown hover:bg-revive-tan/30 transition";

    const cardCls = "rounded-2xl border border-revive-tan bg-white/70";

    // ---------- Views ----------
    if (!user) {
        return (
            <div className="min-h-screen bg-revive-cream text-revive-brown">
                <BackBar />
                <div className="min-h-[calc(100vh-48px)] grid place-items-center p-6">
                    <div className={`${cardCls} max-w-md w-full p-6`}>
                        <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
                        <p className="mb-4 text-sm text-revive-stone">
                            Sign in with the admin Google account to manage events.
                        </p>
                        <button className={btnPrimary} onClick={login}>Sign in with Google</button>
                    </div>
                </div>
            </div>
        );
    }

    if (user && user.email !== ADMIN_EMAIL) {
        return (
            <div className="min-h-screen bg-revive-cream text-revive-brown">
                <BackBar />
                <div className="min-h-[calc(100vh-48px)] grid place-items-center p-6">
                    <div className={`${cardCls} w-full max-w-md p-6 text-center`}>
                        <h1 className="text-xl font-semibold mb-2">Not authorized</h1>
                        <p className="text-sm text-revive-stone mb-4">
                            You’re signed in as {user.email}. Only the admin account can manage events.
                        </p>
                        <button className={btnOutline} onClick={logout}>Sign out</button>
                    </div>
                </div>
            </div>
        );
    }

    // Authorized view
    return (
        <div className="min-h-screen bg-revive-cream text-revive-brown">
            <BackBar />
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Events Admin</h1>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-revive-stone">{user.email}</span>
                        <button className={btnOutline} onClick={logout}>Sign out</button>
                    </div>
                </div>

                <form onSubmit={saveEvent} className={`${cardCls} grid gap-3 p-4 mb-8`}>
                    <input className={inputCls} placeholder="Title"
                        value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                    <div className="grid sm:grid-cols-3 gap-3">
                        <input type="date" className={inputCls}
                            value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                        <input type="time" className={inputCls}
                            value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })} />
                        <input type="time" className={inputCls}
                            value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })} />
                    </div>
                    <input className={inputCls} placeholder="Location"
                        value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                    <input className={inputCls} placeholder="Image URL (optional)"
                        value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
                    <input className={inputCls} placeholder="RSVP Link (optional)"
                        value={form.rsvpLink} onChange={e => setForm({ ...form, rsvpLink: e.target.value })} />
                    <textarea className={inputCls} placeholder="Description"
                        value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />

                    <label className="inline-flex items-center gap-2">
                        <input
                            type="checkbox"
                            className="h-4 w-4 accent-revive-brown"
                            checked={form.published}
                            onChange={e => setForm({ ...form, published: e.target.checked })}
                        />
                        <span>Published</span>
                    </label>

                    <div className="flex gap-3">
                        <button className={btnPrimary} type="submit">Save Event</button>
                    </div>
                </form>

                <div className="grid gap-4">
                    {events.map(ev => (
                        <div key={ev.id} className={`${cardCls} p-4`}>
                            <div className="flex items-center justify-between">
                                <h2 className="font-medium">{ev.title}</h2>
                                <div className="flex items-center gap-2">
                                    <button className={btnOutline}
                                        onClick={() => togglePublish(ev.id, !ev.published)}>
                                        {ev.published ? "Unpublish" : "Publish"}
                                    </button>
                                    <button className={btnOutline} onClick={() => remove(ev.id)}>Delete</button>
                                </div>
                            </div>
                            <p className="text-sm text-revive-stone mt-1">
                                {(ev.date || ev.datetimeISO) ?? ""}{ev.location ? ` • ${ev.location}` : ""}
                            </p>
                            {ev.description && <p className="mt-2 text-sm">{ev.description}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
