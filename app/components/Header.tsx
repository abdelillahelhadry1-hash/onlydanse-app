"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold tracking-tight">
          OnlyDanse
        </Link>

        {/* Main navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="/shop" className="hover:text-black transition-colors">
            Shop
          </Link>
          <Link href="/blog" className="hover:text-black transition-colors">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-black transition-colors">
            Contact
          </Link>
          <Link href="/about" className="hover:text-black transition-colors">
            About
          </Link>
        </nav>

        {/* Auth actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
