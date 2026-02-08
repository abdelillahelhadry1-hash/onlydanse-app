"use client";

import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

export default function SearchModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    document.addEventListener("openSearchModal", handler);
    return () => document.removeEventListener("openSearchModal", handler);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
        <SearchBar compact={false} />

        <button
          onClick={() => setOpen(false)}
          className="mt-4 w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
