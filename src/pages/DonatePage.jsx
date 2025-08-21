// src/pages/DonatePage.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const ZELLE_NUMBER_RAW = "7797726485";
const ZELLE_NUMBER_FMT = "(779) 772-6485";

export default function DonatePage() {
    const [copied, setCopied] = useState("");

    const copy = async (text, label) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(label);
            setTimeout(() => setCopied(""), 1200);
        } catch { }
    };

    return (
        <main className="min-h-screen bg-revive-cream text-revive-brown">
            <div className="max-w-3xl mx-auto px-6 py-14">
                <Link to="/" className="text-sm underline hover:opacity-80">← Back to home</Link>

                <h1 className="text-3xl font-bold mt-4">Donate</h1>
                <p className="mt-2 text-revive-stone">
                    Thank you for supporting Revive at UIC. Your gift funds programs, speakers, service projects, and more.
                </p>

                {/* Zelle Card */}
                <div className="mt-8 rounded-2xl border border-revive-tan bg-white/70 p-6">
                    <h2 className="text-xl font-semibold">Zelle</h2>
                    <p className="mt-2">
                        Send to: <span className="font-medium">{ZELLE_NUMBER_FMT}</span>
                        <span className="ml-2 text-revive-stone">(raw: {ZELLE_NUMBER_RAW})</span>
                    </p>

                    <div className="mt-3 flex gap-3">
                        <button
                            className="px-3 py-1.5 rounded-xl border border-revive-brown text-revive-brown hover:bg-revive-tan/30 transition"
                            onClick={() => copy(ZELLE_NUMBER_RAW, "number")}
                            aria-label="Copy Zelle number"
                        >
                            Copy number
                        </button>
                    </div>

                    <div className="mt-6 rounded-xl border border-revive-tan bg-revive-cream/70 p-4">
                        <h3 className="font-semibold">Memo</h3>
                        <ul className="mt-2 space-y-2 text-sm">
                            <li>
                                • If donating to <span className="font-medium">Revive</span>:{" "}
                                <code className="px-1.5 py-0.5 rounded bg-white/80 border border-revive-tan">Revive donation</code>
                                <button
                                    className="ml-2 px-2 py-0.5 rounded-lg border border-revive-brown text-revive-brown hover:bg-revive-tan/30 transition"
                                    onClick={() => copy("Revive donation", "memo-general")}
                                >
                                    Copy
                                </button>
                            </li>
                            <li>
                                • If it’s for a <span className="font-medium">specific event</span>:{" "}
                                <code className="px-1.5 py-0.5 rounded bg-white/80 border border-revive-tan">
                                    Event donation: [Event Name]
                                </code>
                                <button
                                    className="ml-2 px-2 py-0.5 rounded-lg border border-revive-brown text-revive-brown hover:bg-revive-tan/30 transition"
                                    onClick={() => copy("Event donation: ", "memo-event")}
                                >
                                    Copy
                                </button>
                            </li>
                        </ul>
                    </div>

                    {copied && (
                        <div className="mt-3 text-sm text-revive-stone">Copied {copied} ✓</div>
                    )}
                </div>

                <p className="mt-6 text-sm text-revive-stone">
                    Questions or need a receipt?{" "}
                    <a className="underline" href="mailto:reviveatuic@gmail.com">reviveatuic@gmail.com</a>
                </p>
            </div>
        </main>
    );
}
