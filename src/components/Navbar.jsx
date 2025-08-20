export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-revive-cream/90 backdrop-blur border-b border-revive-tan">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <a href="#" className="text-lg font-semibold text-revive-brown">Revive @ UIC</a>
                <div className="flex gap-5 text-sm">
                    <a href="#about" className="hover:text-revive-coffee">About</a>
                    <a href="#events" className="hover:text-revive-coffee">Events</a>
                    <a href="#join" className="hover:text-revive-coffee">Join</a>
                    <a href="#donate" className="hover:text-revive-coffee">Donate</a>
                    <a href="#contact" className="hover:text-revive-coffee">Contact</a>
                </div>
            </div>
        </nav>
    );
}
