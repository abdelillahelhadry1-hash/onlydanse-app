export const ROLES = {
  DANCER: "dancer",
  INSTRUCTOR: "instructor",
  ORGANIZER: "organizer",
  STUDIO: "studio",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
