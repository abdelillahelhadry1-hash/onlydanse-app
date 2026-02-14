"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

type City = {
  id: string;
  formatted_name: string;
  country_name: string;
};

export default function Step1City() {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const router = useRouter();

  async function searchCities(value: string) {
    setQuery(value);

    if (!value) {
      setCities([]);
      return;
    }

    const { data } = await supabase
      .from("cities")
      .select("id, formatted_name, country_name")
      .ilike("formatted_name", `%${value}%`)
      .limit(20);

    setCities(data || []);
  }

  async function selectCity(city: City) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("profiles")
      .update({
        city_id: city.id,
        country: city.country_name,
      })
      .eq("user_id", user.id);

    router.push("/onboarding/step2-settings");
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Select your city</h1>

      <input
        value={query}
        onChange={(e) => searchCities(e.target.value)}
        placeholder="Search city..."
        className="w-full p-3 border rounded mb-4"
      />

      <ul className="space-y-2">
        {cities.map((city) => (
          <li
            key={city.id}
            onClick={() => selectCity(city)}
            className="p-3 border rounded cursor-pointer hover:bg-gray-100"
          >
            {city.formatted_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
