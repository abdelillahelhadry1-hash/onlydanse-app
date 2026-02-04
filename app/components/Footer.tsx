import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white mt-20">
      <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm text-gray-700">

        {/* Column 1 */}
        <div>
          <h3 className="font-semibold mb-3">OnlyDanse</h3>
          <p className="text-gray-500">
            Discover dance events, classes, and festivals worldwide.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold mb-3">Explore</h3>
          <ul className="space-y-2">
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/classes">Classes</Link></li>
            <li><Link href="/workshops">Workshops</Link></li>
            <li><Link href="/festivals">Festivals</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/careers">Careers</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-semibold mb-3">Legal</h3>
          <ul className="space-y-2">
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/cookies">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} OnlyDanse. All rights reserved.
      </div>
    </footer>
  );
}
