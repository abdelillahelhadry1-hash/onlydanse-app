export function fuzzyMatch(a: string, b: string) {
  const A = a.toLowerCase();
  const B = b.toLowerCase();

  return A.startsWith(B) || B.startsWith(A);
}
