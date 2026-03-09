"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export default function AuthPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");

  async function signInWithProvider(provider: "google" | "facebook" | "apple") {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault(); // ⭐ CRITICAL FIX
    setError("");

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return setError(error.message);

      // Redirect to callback so Supabase can set the session cookie
      router.push("/auth/callback");
      return;
    }

    // SIGNUP FLOW
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return setError(error.message);

    await fetch("/api/auth/send-confirmation", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    router.push("/auth/check-email");
  }

  return (
    <div className="max-w-md mx-auto py-16 px-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        {mode === "login" ? "Log in" : "Create your account"}
      </h1>

      <div className="space-y-3 mb-8">
        <button
          onClick={() => signInWithProvider("google")}
          className="w-full p-3 border rounded bg-white"
        >
          Continue with Google
        </button>

        <button
          onClick={() => signInWithProvider("facebook")}
          className="w-full p-3 border rounded bg-white"
        >
          Continue with Facebook
        </button>

        <button
          onClick={() => signInWithProvider("apple")}
          className="w-full p-3 border rounded bg-white"
        >
          Continue with Apple
        </button>
      </div>

      <div className="text-center text-gray-500 my-4">or</div>

      {/* ⭐ Wrap inputs + button in a form so preventDefault works */}
      <form onSubmit={handleEmailAuth} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full p-3 bg-black text-white rounded"
        >
          {mode === "login" ? "Log in" : "Sign up"}
        </button>
      </form>

      <div className="text-center mt-6">
        {mode === "login" ? (
          <p>
            Don’t have an account?{" "}
            <button
              onClick={() => setMode("signup")}
              className="text-blue-600 underline"
            >
              Sign up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button
              onClick={() => setMode("login")}
              className="text-blue-600 underline"
            >
              Log in
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
