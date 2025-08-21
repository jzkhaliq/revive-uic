// src/pages/DonatePage.jsx
import { Link } from "react-router-dom";

const ZELLE_NUMBER = "7797726485";

export default function DonatePage() {
    return (
        <main className="min-h-screen bg-revive-cream text-revive-brown">
            <div className="max-w-3xl mx-auto px-6 py-14">
                <Link to="/" className="text-sm underline hover:opacity-80">← Back to home</Link>
                <h1 className="text-3xl font-bold mt-4">Donate</h1>
                <p className="mt-2 text-revive-stone">Thank you for supporting Revive at UIC.</p>

                <div className="mt-8 rounded-2xl border border-revive-tan bg-white/70 p-6">
                    <h2 className="text-xl font-semibold">Zelle</h2>
                    <p className="mt-2">
                        Send to: <span className="font-medium">{ZELLE_NUMBER}</span>
                    </p>
                    <p className="text-sm text-revive-stone mt-1">
                        Add a memo “Revive at UIC donation”. Contact us if you need a receipt.
                    </p>
                </div>

                <p className="mt-6 text-sm text-revive-stone">
                    Questions? <a href="mailto:reviveatuic@gmail.com" className="underline">reviveatuic@gmail.com</a>
                </p>
            </div>
        </main>
    );
}
