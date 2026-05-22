// src/components/Admin.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, login, logout, db } from "../firebase";
import {
    collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { fetchSiteConfig, saveSiteConfig, DEFAULT_SITE_CONFIG } from "../lib/siteConfig";

const ADMIN_EMAIL = "reviveatuic@gmail.com";

const emptyForm = {
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    rsvpLink: "",
    published: true,
    photos: [],     // array of URL strings used by Events modal
    imageUrl: ""    // legacy single image URL (optional)
};

// UI classes
const inputCls =
    "border border-revive-tan rounded-xl p-2 bg-white/80 text-revive-brown " +
    "focus:outline-none focus:ring-2 focus:ring-revive-brown/30 focus:border-revive-brown placeholder:text-revive-stone";
const btnPrimary =
    "px-4 py-2 rounded-xl bg-revive-brown text-revive-cream hover:bg-revive-coffee transition";
const btnOutline =
    "px-3 py-1.5 rounded-xl border border-revive-brown text-revive-brown hover:bg-revive-tan/30 transition";
const btnDanger =
    "px-3 py-1.5 rounded-xl border border-red-300 text-red-700 hover:bg-red-50 transition";
const cardCls = "rounded-2xl border border-revive-tan bg-white/70";

export default function Admin() {
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [siteConfig, setSiteConfig] = useState(DEFAULT_SITE_CONFIG);
    const [siteConfigForm, setSiteConfigForm] = useState(DEFAULT_SITE_CONFIG);
    const [configStatus, setConfigStatus] = useState("");

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
        loadSiteConfig();
        loadEvents();
        return () => unsub();
    }, []);

    async function loadSiteConfig() {
        const config = await fetchSiteConfig();
        setSiteConfig(config);
        setSiteConfigForm(config);
    }

    const parseAdminEmails = (value) => {
        if (Array.isArray(value)) return value.filter(Boolean).map((email) => String(email).trim());
        return String(value || "").split(",").map((email) => email.trim()).filter(Boolean);
    };

    const handleSiteConfigChange = (key, value) => {
        setSiteConfigForm({ ...siteConfigForm, [key]: value });
    };

    const saveSiteConfigHandler = async (e) => {
        e.preventDefault();
        const nextConfig = {
            ...siteConfigForm,
            adminEmails: parseAdminEmails(siteConfigForm.adminEmails),
            joinLinks: {
                ...siteConfig.joinLinks,
                ...(siteConfigForm.joinLinks || {})
            },
            mentorship: {
                ...siteConfig.mentorship,
                ...(siteConfigForm.mentorship || {})
            }
        };
        await saveSiteConfig(nextConfig);
        setSiteConfig(nextConfig);
        setConfigStatus("Saved");
        setTimeout(() => setConfigStatus(""), 2000);
    };

    async function loadEvents() {
        const snap = await getDocs(colRef);
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        list.sort((a, b) => {
            const d = (a.date || "").localeCompare(b.date || "");
            if (d !== 0) return d;
            return (a.startTime || "").localeCompare(b.startTime || "");
        });
        setEvents(list);
    }

    function startCreate() {
        setEditingId(null);
        setForm(emptyForm);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function startEdit(ev) {
        setEditingId(ev.id);
        setForm({
            title: ev.title || "",
            date: ev.date || "",
            startTime: ev.startTime || "",
            endTime: ev.endTime || "",
            location: ev.location || ev.where || "",
            description: ev.description || "",
            rsvpLink: ev.rsvpLink || ev.link || "",
            published: ev.published !== false,
            photos: Array.isArray(ev.photos) ? ev.photos : (ev.imageUrl ? [ev.imageUrl] : []),
            imageUrl: ev.imageUrl || ""
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // photos URL list helpers
    const updatePhoto = (idx, val) => {
        const next = [...(form.photos || [])];
        next[idx] = val;
        setForm({ ...form, photos: next });
    };
    const addPhoto = () => setForm({ ...form, photos: [...(form.photos || []), ""] });
    const removePhoto = (idx) => {
        const next = [...(form.photos || [])];
        next.splice(idx, 1);
        setForm({ ...form, photos: next });
    };

    function normalizePayload(src) {
        const where = src.location?.trim() || "";
        const photos = (src.photos || []).filter(Boolean);
        const payload = {
            title: src.title.trim(),
            date: src.date,                   // "yyyy-MM-dd"
            startTime: src.startTime || "",   // "HH:mm"
            endTime: src.endTime || "",
            location: where,
            where,                            // mirror for Events.jsx compatibility
            description: src.description || "",
            rsvpLink: src.rsvpLink || "",
            link: src.rsvpLink || "",         // mirror
            published: !!src.published,
            photos,
            imageUrl: photos.length ? photos[0] : (src.imageUrl || ""), // keep legacy field
            updatedAt: serverTimestamp(),
        };
        if (payload.date && payload.startTime) {
            payload.datetimeISO = `${payload.date}T${payload.startTime}`;
        }
        return payload;
    }

    async function saveEvent(e) {
        e.preventDefault();
        if (!user) return;
        if (!form.title.trim() || !form.date) {
            alert("Title and Date are required.");
            return;
        }
        const payload = normalizePayload(form);

        if (editingId) {
            await updateDoc(doc(db, "events", editingId), payload);
        } else {
            payload.createdAt = serverTimestamp();
            await addDoc(colRef, payload);
        }

        setForm(emptyForm);
        setEditingId(null);
        await loadEvents();
    }

    async function togglePublish(id, value) {
        await updateDoc(doc(db, "events", id), { published: value, updatedAt: serverTimestamp() });
        await loadEvents();
    }

    async function remove(id) {
        if (!confirm("Delete this event?")) return;
        await deleteDoc(doc(db, "events", id));
        if (editingId === id) {
            setEditingId(null);
            setForm(emptyForm);
        }
        await loadEvents();
    }

    // Back bar
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

    const allowedEmails = Array.isArray(siteConfig.adminEmails)
        ? siteConfig.adminEmails
        : [ADMIN_EMAIL];

    if (user && !allowedEmails.includes(user.email)) {
        return (
            <div className="min-h-screen bg-revive-cream text-revive-brown">
                <BackBar />
                <div className="min-h-[calc(100vh-48px)] grid place-items-center p-6">
                    <div className={`${cardCls} w-full max-w-md p-6 text-center`}>
                        <h1 className="text-xl font-semibold mb-2">Not authorized</h1>
                        <p className="text-sm text-revive-stone mb-4">
                            You’re signed in as {user.email}. Only authorized admin accounts can manage events.
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

                <form onSubmit={saveSiteConfigHandler} className={`${cardCls} grid gap-3 p-4 mb-8`}>
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold">Site links and donate settings</h2>
                        {configStatus && (
                            <span className="text-sm text-revive-stone">{configStatus}</span>
                        )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                        <label className="block">
                            <span className="text-sm text-revive-stone">Contact email</span>
                            <input
                                className={inputCls}
                                type="email"
                                value={siteConfigForm.contactEmail}
                                onChange={(e) => handleSiteConfigChange("contactEmail", e.target.value)}
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm text-revive-stone">Zelle number</span>
                            <input
                                className={inputCls}
                                value={siteConfigForm.zelleNumber}
                                onChange={(e) => handleSiteConfigChange("zelleNumber", e.target.value)}
                            />
                        </label>
                    </div>

                    <label className="block">
                        <span className="text-sm text-revive-stone">Admin emails (comma-separated)</span>
                        <input
                            className={inputCls}
                            value={Array.isArray(siteConfigForm.adminEmails) ? siteConfigForm.adminEmails.join(", ") : siteConfigForm.adminEmails}
                            onChange={(e) => handleSiteConfigChange("adminEmails", e.target.value)}
                        />
                    </label>

                    <div className="grid sm:grid-cols-2 gap-3">
                        <label className="block">
                            <span className="text-sm text-revive-stone">Mentee form URL</span>
                            <input
                                className={inputCls}
                                value={siteConfigForm.mentorship?.menteeForm}
                                onChange={(e) => setSiteConfigForm({
                                    ...siteConfigForm,
                                    mentorship: { ...siteConfigForm.mentorship, menteeForm: e.target.value }
                                })}
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm text-revive-stone">Mentor form URL</span>
                            <input
                                className={inputCls}
                                value={siteConfigForm.mentorship?.mentorForm}
                                onChange={(e) => setSiteConfigForm({
                                    ...siteConfigForm,
                                    mentorship: { ...siteConfigForm.mentorship, mentorForm: e.target.value }
                                })}
                            />
                        </label>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-3">
                        <label className="block">
                            <span className="text-sm text-revive-stone">WhatsApp link</span>
                            <input
                                className={inputCls}
                                value={siteConfigForm.joinLinks?.whatsapp}
                                onChange={(e) => setSiteConfigForm({
                                    ...siteConfigForm,
                                    joinLinks: { ...siteConfigForm.joinLinks, whatsapp: e.target.value }
                                })}
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm text-revive-stone">LinkedIn link</span>
                            <input
                                className={inputCls}
                                value={siteConfigForm.joinLinks?.linkedin}
                                onChange={(e) => setSiteConfigForm({
                                    ...siteConfigForm,
                                    joinLinks: { ...siteConfigForm.joinLinks, linkedin: e.target.value }
                                })}
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm text-revive-stone">Instagram link</span>
                            <input
                                className={inputCls}
                                value={siteConfigForm.joinLinks?.instagram}
                                onChange={(e) => setSiteConfigForm({
                                    ...siteConfigForm,
                                    joinLinks: { ...siteConfigForm.joinLinks, instagram: e.target.value }
                                })}
                            />
                        </label>
                    </div>

                    <div className="flex items-center gap-3">
                        <button type="submit" className={btnPrimary}>Save site settings</button>
                    </div>
                </form>

                {/* CREATE / EDIT FORM */}
                <form onSubmit={saveEvent} className={`${cardCls} grid gap-3 p-4 mb-8`}>
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold">{editingId ? "Edit Event" : "Create Event"}</h2>
                        {editingId && (
                            <button type="button" className={btnOutline} onClick={startCreate}>
                                + New
                            </button>
                        )}
                    </div>

                    <input
                        className={inputCls}
                        placeholder="Title"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                        required
                    />

                    <div className="grid sm:grid-cols-3 gap-3">
                        <input
                            type="date"
                            className={inputCls}
                            value={form.date}
                            onChange={e => setForm({ ...form, date: e.target.value })}
                            required
                        />
                        <input
                            type="time"
                            className={inputCls}
                            value={form.startTime}
                            onChange={e => setForm({ ...form, startTime: e.target.value })}
                        />
                        <input
                            type="time"
                            className={inputCls}
                            value={form.endTime}
                            onChange={e => setForm({ ...form, endTime: e.target.value })}
                        />
                    </div>

                    <input
                        className={inputCls}
                        placeholder="Location"
                        value={form.location}
                        onChange={e => setForm({ ...form, location: e.target.value })}
                    />

                    {/* Photos (URLs) */}
                    <div className="rounded-xl border border-revive-tan bg-revive-cream/60 p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Photos (URLs)</h3>
                            <button type="button" className={btnOutline} onClick={addPhoto}>+ Add Photo</button>
                        </div>
                        <p className="mt-1 text-sm text-revive-stone">
                            Paste public image URLs (Firebase Storage, Imgur, Google Drive with “Anyone with link”, etc).
                            The first photo shows first in the event modal.
                        </p>
                        <div className="mt-3 space-y-2">
                            {(form.photos || []).map((url, i) => (
                                <div key={i} className="flex gap-2">
                                    <input
                                        className={`${inputCls} flex-1`}
                                        placeholder={`https://.../photo-${i + 1}.jpg`}
                                        value={url}
                                        onChange={(e) => updatePhoto(i, e.target.value)}
                                    />
                                    <button type="button" className={btnDanger} onClick={() => removePhoto(i)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Legacy single image (optional) */}
                        <div className="mt-3">
                            <input
                                className={inputCls}
                                placeholder="Legacy single Image URL (optional)"
                                value={form.imageUrl}
                                onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                            />
                            <p className="mt-1 text-xs text-revive-stone">
                                If provided and no photos above, this will be mirrored as the first item in <code>photos</code>.
                            </p>
                        </div>
                    </div>

                    <input
                        className={inputCls}
                        placeholder="RSVP / More Info Link (optional)"
                        value={form.rsvpLink}
                        onChange={e => setForm({ ...form, rsvpLink: e.target.value })}
                    />

                    <textarea
                        className={inputCls}
                        placeholder="Description"
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                        rows={5}
                    />

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
                        <button className={btnPrimary} type="submit">
                            {editingId ? "Update Event" : "Save Event"}
                        </button>
                        {editingId && (
                            <button type="button" className={btnOutline} onClick={startCreate}>
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>

                {/* LIST OF EVENTS */}
                <div className="grid gap-4">
                    {events.map(ev => (
                        <div key={ev.id} className={`${cardCls} p-4`}>
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h2 className="font-medium">{ev.title}</h2>
                                    <p className="text-sm text-revive-stone mt-1">
                                        {ev.date || ev.datetimeISO || ""}
                                        {ev.startTime ? ` • ${ev.startTime}` : ""}
                                        {ev.endTime ? `–${ev.endTime}` : ""}
                                        {ev.location || ev.where ? ` • ${ev.location || ev.where}` : ""}
                                        {ev.published ? "" : " • (unpublished)"}
                                    </p>
                                    {ev.description && <p className="mt-2 text-sm">{ev.description}</p>}
                                    {Array.isArray(ev.photos) && ev.photos.length > 0 && (
                                        <div className="mt-2 flex gap-2 overflow-x-auto">
                                            {ev.photos.map((p, i) => (
                                                <img key={p + i} src={p} alt={`thumb-${i}`} className="h-14 w-20 object-cover rounded-md border border-revive-tan" />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                                    <button className={btnOutline} onClick={() => startEdit(ev)}>Edit</button>
                                    <button className={btnOutline} onClick={() => togglePublish(ev.id, !ev.published)}>
                                        {ev.published ? "Unpublish" : "Publish"}
                                    </button>
                                    <button className={btnDanger} onClick={() => remove(ev.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
