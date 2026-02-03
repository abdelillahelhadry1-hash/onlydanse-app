export default function Header() {
  return (
    <header className="w-full border-b bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
        
        {/* Logo */}
        <a href="/" className="text-2xl font-bold tracking-tight">
          OnlyDanse
        </a>

        {/* Nav Links */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="/shop" className="hover:text-blue-600">Shop</a>
          <a href="/blog" className="hover:text-blue-600">Blog</a>
          <a href="/contact" className="hover:text-blue-600">Contact</a>
          <a href="/about" className="hover:text-blue-600">About</a>
        </nav>

        {/* Auth */}
        <div className="flex gap-3">
          <a
            href="/login"
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Login
          </a>
          <a
            href="/signup"
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign Up
          </a>
        </div>
      </div>
    </header>
  );
}

