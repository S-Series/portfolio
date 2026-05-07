export type PortfolioProject = {
  code: string;
  title: string;
  meta: string;
  summary: string;
  status: string;
  tags: string[];
  image: string;
  url?: string;
  repo?: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    code: "01",
    title: "WuWa DEV",
    meta: "wuwa.dev / Wuthering Waves Speccard Generator",
    summary: "A fan utility workspace for Wuthering Waves players.",
    status: "Live",
    tags: ["Vue", "Game Data", "Utility"],
    image: "/wuwadev/preview.jpg",
    url: "https://wuwa.dev",
    repo: "https://github.com/S-Series/wuthering",
  },
  {
    code: "02",
    title: "Signal Archive",
    meta: "Landing / Content Hub",
    summary: "A content-first archive concept for structured brand stories.",
    status: "Draft",
    tags: ["Responsive", "Content", "UI"],
    image: "/sseries.png",
  },
  {
    code: "03",
    title: "Orbit Studio",
    meta: "Tool / Prototype",
    summary: "A prototype shell for compact creative tooling and experiments.",
    status: "Concept",
    tags: ["Prototype", "Interaction", "UX"],
    image: "/sseries.png",
  },
];
