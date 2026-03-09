"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export default function Step2Settings() {
  const router = useRouter();

  const [language, setLanguage] = useState(
    typeof navigator !== "undefined" ? navigator.language : "en"
  );

  const [timezone, setTimezone] = useState(
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "UTC"
  );

  const [currency, setCurrency] = useState("EUR");

  async function saveSettings() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/auth");
      return;
    }

    await supabase
      .from("profiles")
      .update({
        language,
        timezone,
        currency,
      })
      .eq("user_id", user.id);

    router.push("/onboarding/step3-roles");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Your preferences</h1>

      <label className="block mb-4">
        Language
        <input
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-3 border rounded mt-1"
        />
      </label>

      <label className="block mb-4">
        Timezone
        <input
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="w-full p-3 border rounded mt-1"
        />
      </label>

      <label className="block mb-4">
        Currency
        <input
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-3 border rounded mt-1"
        />
      </label>

      <button
        onClick={saveSettings}
        className="w-full p-3 bg-black text-white rounded mt-4"
      >
        Continue
      </button>
    </div>
  );
}
