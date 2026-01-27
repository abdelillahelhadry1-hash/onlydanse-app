export function formatCity(city: string, state: string | null, country: string) {
  const countryLower = country.toLowerCase();

  // United States formatting
  if (countryLower === "united states" || countryLower === "usa") {
    return `${city}, ${state}, USA`;
  }

  // Global formatting
  return `${city}, ${country}`;
}
