"use client";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

async function activateRole(role: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("user_roles").insert({
    user_id: user.id,
    role,
  });

  if (role === "instructor") {
    await supabase.from("instructors").insert({ user_id: user.id });
  }

  if (role === "studio") {
    await supabase.from("studios").insert({ user_id: user.id });
  }

  if (role === "organizer") {
    await supabase.from("organizers").insert({ user_id: user.id });
  }
}

export default function Step3Roles() {
  const router = useRouter();

  async function handleSelect(role: string) {
    await activateRole(role);
    router.push("/"); // later you can change to /dashboard
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Choose your role</h1>
      <p className="mb-6 text-gray-600">You can add more roles later.</p>

      <div className="space-y-3">
        <button
          onClick={() => handleSelect("dancer")}
          className="w-full p-3 border rounded"
        >
          Dancer
        </button>

        <button
          onClick={() => handleSelect("instructor")}
          className="w-full p-3 border rounded"
        >
          Instructor
        </button>

        <button
          onClick={() => handleSelect("organizer")}
          className="w-full p-3 border rounded"
        >
          Organizer
        </button>

        <button
          onClick={() => handleSelect("studio")}
          className="w-full p-3 border rounded"
        >
          Studio
        </button>
      </div>
    </div>
  );
}
