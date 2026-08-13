export interface Award {
  id: string;
  title: string;
  recipient: string;
  reason: string;
  icon: "trophy" | "star" | "medal";
  year: number;
}

export const awards: Award[] = [
  {
    id: "author-of-the-year",
    title: "Author of the Year",
    recipient: "Dr. Naledi Achebe-Sinclair",
    reason:
      "For a body of work that has redefined storytelling and inspired readers across the globe — a true testament to the lasting power of a story told with purpose and heart.",
    icon: "trophy",
    year: 2026,
  },
  {
    id: "emerging-voice",
    title: "Emerging Voice Award",
    recipient: "Julian Castellanos",
    reason:
      "Celebrating bold creativity and a breakout voice making waves in contemporary fiction, marking the arrival of a storyteller to watch.",
    icon: "star",
    year: 2026,
  },
  {
    id: "community-champion",
    title: "Community Champion",
    recipient: "Beatrice Lindqvist",
    reason:
      "For tireless dedication to mentoring writers and championing literary growth within our community.",
    icon: "medal",
    year: 2026,
  },
];
