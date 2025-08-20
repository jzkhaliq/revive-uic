// src/components/Admin.jsx

const ADMIN_EMAIL = "reviveatuic@gmail.com";

import { useEffect, useState } from "react";
import { auth, login, logout, db } from "../firebase";
import {
    collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Admin() {
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [form, setForm] = useState({
        title: "", date: "", startTime: "", endTime: "",
        location: "", description: "", imageUrl: "", rsvpLink: "", published: true
    });
    const colRef = collection(db, "events");

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
            // Store ISO date/time; you can also store a Firestore Timestamp if you prefer
            datetimeISO: `${form.date}T${form.startTime}`,
            updatedAt: serverTimestamp(),
        };
        await addDoc(colRef, payload);
        setForm({ title: "", date: "", startTime: "", endTime: "", location: "", description: "", imageUrl: "", rsvpLink: "", published: true });
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

    if (!user) {
        return (
            <div className="min-h-screen grid place-items-center p-6">
                <div className="max-w-md w-full p-6 rounded-2xl shadow">
                    <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
                    <p className="mb-4 text-sm">Sign in with your UIC email to manage events.</p>
                    <button className="px-4 py-2 rounded-xl border" onClick={login}>Sign in with Google</button>
                </div>
            </div>
        );
    }

    if (user && user.email !== ADMIN_EMAIL) {
        return (
            <div className="min-h-screen grid place-items-center p-6">
                <div className="w-full max-w-md border rounded-2xl p-6 text-center">
                    <h1 className="text-xl font-semibold mb-2">Not authorized</h1>
                    <p className="text-sm opacity-80 mb-4">
                        You’re signed in as {user.email}. Only the admin account can manage events.
                    </p>
                    <button className="border rounded-xl px-3 py-1.5" onClick={logout}>Sign out</button>
                </div>
            </div>
        );
    }


    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Events Admin</h1>
                <div className="flex items-center gap-3">
                    <span className="text-sm">{user.email}</span>
                    <button className="px-3 py-1.5 rounded-xl border" onClick={logout}>Sign out</button>
                </div>
            </div>

            <form onSubmit={saveEvent} className="grid gap-3 p-4 rounded-2xl border mb-8">
                <input className="border rounded-xl p-2" placeholder="Title"
                    value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                <div className="grid sm:grid-cols-3 gap-3">
                    <input type="date" className="border rounded-xl p-2"
                        value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                    <input type="time" className="border rounded-xl p-2"
                        value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })} />
                    <input type="time" className="border rounded-xl p-2"
                        value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })} />
                </div>
                <input className="border rounded-xl p-2" placeholder="Location"
                    value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                <input className="border rounded-xl p-2" placeholder="Image URL (optional)"
                    value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
                <input className="border rounded-xl p-2" placeholder="RSVP Link (optional)"
                    value={form.rsvpLink} onChange={e => setForm({ ...form, rsvpLink: e.target.value })} />
                <textarea className="border rounded-xl p-2" placeholder="Description"
                    value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                <label className="inline-flex items-center gap-2">
                    <input type="checkbox" checked={form.published}
                        onChange={e => setForm({ ...form, published: e.target.checked })} />
                    <span>Published</span>
                </label>
                <button className="px-4 py-2 rounded-xl border w-fit">Save Event</button>
            </form>

            <div className="grid gap-4">
                {events.map(ev => (
                    <div key={ev.id} className="p-4 rounded-2xl border">
                        <div className="flex items-center justify-between">
                            <h2 className="font-medium">{ev.title}</h2>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1 rounded-xl border"
                                    onClick={() => togglePublish(ev.id, !ev.published)}>
                                    {ev.published ? "Unpublish" : "Publish"}
                                </button>
                                <button className="px-3 py-1 rounded-xl border" onClick={() => remove(ev.id)}>Delete</button>
                            </div>
                        </div>
                        <p className="text-sm opacity-80">
                            {ev.date || ev.datetimeISO} • {ev.location}
                        </p>
                        <p className="mt-2 text-sm">{ev.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
