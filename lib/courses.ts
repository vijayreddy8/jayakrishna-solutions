export type Lesson = {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoId?: string;
  status: "available" | "coming-soon";
};

export type Course = {
  id: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  learners: string;
  description: string;
  accent: "market" | "software" | "python";
  symbol: string;
  lessons: Lesson[];
};

export const courses: Course[] = [
  {
    id: "market-foundations",
    title: "Stock Market Foundations",
    category: "Markets & Trading",
    level: "Beginner",
    duration: "3 lessons",
    learners: "Learning track",
    description: "Understand how Indian markets work, how orders are placed, and how risk management fits into a learning plan.",
    accent: "market",
    symbol: "₹ / NSE",
    lessons: [
      { id: "market-1", title: "Stock Market Basics for Beginners", description: "An introduction to exchanges, shares and market terminology.", duration: "Public video", videoId: "p7HKvqRI_Bo", status: "available" },
      { id: "market-2", title: "How the Stock Market Works", description: "Learn the roles of investors, brokers and exchanges.", duration: "Public video", videoId: "Xn7KWR9EOGQ", status: "available" },
      { id: "market-3", title: "Risk Management & Trading Psychology", description: "Introductory educational material about risk and discipline.", duration: "Public video", videoId: "j7K6f4nJb2A", status: "available" },
      { id: "market-4", title: "Live Market Analysis — Mentor Session", description: "A scheduled instructor-led session. Demo status only.", duration: "Coming soon", status: "coming-soon" },
      { id: "market-5", title: "Technical Analysis Workshop", description: "Charts, trends and practice examples.", duration: "Coming soon", status: "coming-soon" }
    ]
  },
  {
    id: "devops-essentials",
    title: "DevOps Essentials",
    category: "Software & Cloud",
    level: "Beginner",
    duration: "3 lessons",
    learners: "Learning track",
    description: "Build a foundation in Git, containers, CI/CD pipelines and cloud delivery.",
    accent: "software",
    symbol: "DEV / OPS",
    lessons: [
      { id: "devops-1", title: "DevOps Explained", description: "Core ideas, collaboration and automation.", duration: "Public video", videoId: "0yWAtQ6wYNM", status: "available" },
      { id: "devops-2", title: "Docker for Beginners", description: "Images, containers and repeatable development environments.", duration: "Public video", videoId: "fqMOX6JJhGo", status: "available" },
      { id: "devops-3", title: "CI/CD Pipeline Fundamentals", description: "Understand build, test and deployment stages.", duration: "Public video", videoId: "scEDHsr3APg", status: "available" },
      { id: "devops-4", title: "Hands-on AWS Deployments", description: "Instructor-guided cloud labs.", duration: "Coming soon", status: "coming-soon" }
    ]
  },
  {
    id: "python-starter",
    title: "Python Programming Starter",
    category: "Software & Coding",
    level: "Beginner",
    duration: "2 lessons",
    learners: "Learning track",
    description: "Get started with Python syntax, variables, functions and small programs.",
    accent: "python",
    symbol: "PY",
    lessons: [
      { id: "python-1", title: "Python in One Video", description: "A beginner-friendly overview of Python.", duration: "Public video", videoId: "kqtD5dpn9C8", status: "available" },
      { id: "python-2", title: "Python Functions & Practice", description: "Practice writing reusable functions.", duration: "Public video", videoId: "9Os0o3wzS_I", status: "available" },
      { id: "python-3", title: "Projects and Assessments", description: "Guided exercises and project work.", duration: "Coming soon", status: "coming-soon" }
    ]
  }
];

export const upcomingClasses = [
  { id: "live-market", title: "Live Market Learning Room", subtitle: "Stock Market Foundations", time: "Demo room · Instructor starts session", icon: "◈" },
  { id: "live-devops", title: "Cloud & DevOps Q&A", subtitle: "DevOps Essentials", time: "Upcoming · Schedule to be announced", icon: "⌘" }
];
