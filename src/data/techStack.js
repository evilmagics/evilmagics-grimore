import { 
  SiGo, SiPython, SiDotnet, SiCplusplus, SiJavascript, SiTypescript, SiCss, SiHtml5, SiPhp, SiGnubash, SiDart,
  SiBootstrap, SiTailwindcss, SiReact, SiVuedotjs, SiNextdotjs, SiLaravel, SiFlutter,
  SiFastapi, SiDjango, SiPandas, SiNumpy, SiSqlalchemy,
  SiFramer, SiPrisma, SiDrizzle,
  SiMysql, SiPostgresql, SiSqlite, SiMongodb, SiRedis, SiRabbitmq, SiSupabase, SiFirebase,
  SiDocker, SiPodman, SiKubernetes, SiGit, SiGrafana,
  SiSublimetext, SiAndroidstudio, SiJquery, SiFigma, SiNotion, SiPostman, SiDiscord
} from "react-icons/si";

import { FaServer, FaDatabase, FaCogs, FaCube, FaCode } from "react-icons/fa";

export const getShapePath = (category) => {
  let shapePath = "";
  if (category === "Languages") {
    shapePath = `<polygon points="12 2 20.66 7 20.66 17 12 22 3.34 17 3.34 7" fill="rgba(5,5,5,0.8)" stroke="currentColor" stroke-width="1.2"/>`;
  } else if (category === "Frameworks & UI") {
    shapePath = `<polygon points="12 2 22 12 12 22 2 12" fill="rgba(5,5,5,0.8)" stroke="currentColor" stroke-width="1.2"/>`;
  } else if (category === "Databases") {
    shapePath = `<polygon points="7 3 17 3 21 8 21 16 17 21 7 21 3 16 3 8" fill="rgba(5,5,5,0.8)" stroke="currentColor" stroke-width="1.2"/>`;
  } else if (category === "DevOps & Infra") {
    shapePath = `<polygon points="12 2 22 9.5 18.18 21 5.82 21 2 9.5" fill="rgba(5,5,5,0.8)" stroke="currentColor" stroke-width="1.2"/>`;
  } else if (category === "Tools & Workspace") {
    shapePath = `<polygon points="6 3 18 3 21 6 21 18 18 21 6 21 3 18 3 6" fill="rgba(5,5,5,0.8)" stroke="currentColor" stroke-width="1.2"/>`;
  } else {
    shapePath = `<circle cx="12" cy="12" r="10" fill="rgba(5,5,5,0.8)" stroke="currentColor" stroke-width="1.2"/>`;
  }

  const magicAccents = `<circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" stroke-dasharray="1 3" stroke-width="0.5" opacity="0.4"/>`;

  return `${shapePath}${magicAccents}`;
};

export const techStack = [
  // --- Languages (Hexagon) ---
  { name: "Go", category: "Languages", subCategory: "Compiled", Icon: SiGo },
  { name: "C++", category: "Languages", subCategory: "Compiled", Icon: SiCplusplus },
  { name: "C#", category: "Languages", subCategory: "Compiled", Icon: SiDotnet },
  { name: "Python", category: "Languages", subCategory: "Scripting", Icon: SiPython },
  { name: "Bash", category: "Languages", subCategory: "Scripting", Icon: SiGnubash },
  { name: "PHP", category: "Languages", subCategory: "Scripting", Icon: SiPhp },
  { name: "JavaScript", category: "Languages", subCategory: "Web Core", Icon: SiJavascript },
  { name: "TypeScript", category: "Languages", subCategory: "Web Core", Icon: SiTypescript },
  { name: "HTML", category: "Languages", subCategory: "Web Core", Icon: SiHtml5 },
  { name: "CSS", category: "Languages", subCategory: "Web Core", Icon: SiCss },
  { name: "Dart", category: "Languages", subCategory: "Mobile", Icon: SiDart },
  
  // --- UI Frameworks (Diamond) ---
  { name: "Bootstrap", category: "Frameworks & UI", subCategory: "UI Styling", Icon: SiBootstrap },
  { name: "Tailwind", category: "Frameworks & UI", subCategory: "UI Styling", Icon: SiTailwindcss },
  { name: "React", category: "Frameworks & UI", subCategory: "UI Library", Icon: SiReact },
  { name: "Vue", category: "Frameworks & UI", subCategory: "UI Library", Icon: SiVuedotjs },
  { name: "Next.js", category: "Frameworks & UI", subCategory: "Fullstack", Icon: SiNextdotjs },
  { name: "Laravel", category: "Frameworks & UI", subCategory: "Fullstack", Icon: SiLaravel },
  { name: "Flutter", category: "Frameworks & UI", subCategory: "App Framework", Icon: SiFlutter },

  // --- Go & JS Libraries (Circle) ---
  { name: "Gin", category: "Libraries & Packages", subCategory: "Backend API", Icon: FaServer },
  { name: "Fiber", category: "Libraries & Packages", subCategory: "Backend API", Icon: FaServer },
  { name: "FastAPI", category: "Libraries & Packages", subCategory: "Backend API", Icon: SiFastapi },
  { name: "Django", category: "Libraries & Packages", subCategory: "Backend API", Icon: SiDjango },
  { name: "tRPC", category: "Libraries & Packages", subCategory: "Backend API", Icon: FaCode },
  { name: "GORM", category: "Libraries & Packages", subCategory: "ORM / Query", Icon: FaDatabase },
  { name: "SQLAlchemy", category: "Libraries & Packages", subCategory: "ORM / Query", Icon: SiSqlalchemy },
  { name: "Prisma", category: "Libraries & Packages", subCategory: "ORM / Query", Icon: SiPrisma },
  { name: "Drizzle", category: "Libraries & Packages", subCategory: "ORM / Query", Icon: SiDrizzle },
  { name: "Viper", category: "Libraries & Packages", subCategory: "Config", Icon: FaCogs },
  { name: "Pandas", category: "Libraries & Packages", subCategory: "Data Science", Icon: SiPandas },
  { name: "NumPy", category: "Libraries & Packages", subCategory: "Data Science", Icon: SiNumpy },
  { name: "Framer Motion", category: "Libraries & Packages", subCategory: "Frontend State", Icon: SiFramer },
  { name: "Zustand", category: "Libraries & Packages", subCategory: "Frontend State", Icon: FaCube },

  // --- Databases & Brokers (Octagon) ---
  { name: "MySQL", category: "Databases", subCategory: "SQL", Icon: SiMysql },
  { name: "PostgreSQL", category: "Databases", subCategory: "SQL", Icon: SiPostgresql },
  { name: "DuckDB", category: "Databases", subCategory: "SQL", Icon: FaDatabase },
  { name: "SQLite", category: "Databases", subCategory: "SQL", Icon: SiSqlite },
  { name: "MongoDB", category: "Databases", subCategory: "NoSQL", Icon: SiMongodb },
  { name: "Redis", category: "Databases", subCategory: "In-Memory", Icon: SiRedis },
  { name: "RabbitMQ", category: "Databases", subCategory: "Queues", Icon: SiRabbitmq },
  { name: "Supabase", category: "Databases", subCategory: "Cloud BaaS", Icon: SiSupabase },
  { name: "Firebase", category: "Databases", subCategory: "Cloud BaaS", Icon: SiFirebase },

  // --- DevOps & Infra (Pentagon) ---
  { name: "Docker", category: "DevOps & Infra", subCategory: "Containers", Icon: SiDocker },
  { name: "Podman", category: "DevOps & Infra", subCategory: "Containers", Icon: SiPodman },
  { name: "Kubernetes", category: "DevOps & Infra", subCategory: "Orchestration", Icon: SiKubernetes },
  { name: "Git", category: "DevOps & Infra", subCategory: "VCS", Icon: SiGit },
  { name: "Grafana", category: "DevOps & Infra", subCategory: "Observability", Icon: SiGrafana },

  // --- Tools & Workspaces (Square) ---
  { name: "VS Code", category: "Tools & Workspace", subCategory: "Code Editor", Icon: FaCode },
  { name: "Sublime", category: "Tools & Workspace", subCategory: "Code Editor", Icon: SiSublimetext },
  { name: "Atom IDE", category: "Tools & Workspace", subCategory: "Code Editor", Icon: FaCode },
  { name: "Android Studio", category: "Tools & Workspace", subCategory: "Code Editor", Icon: SiAndroidstudio },
  { name: "Figma", category: "Tools & Workspace", subCategory: "Design / Docs", Icon: SiFigma },
  { name: "Notion", category: "Tools & Workspace", subCategory: "Design / Docs", Icon: SiNotion },
  { name: "Postman", category: "Tools & Workspace", subCategory: "API Testing", Icon: SiPostman },
  { name: "Discord", category: "Tools & Workspace", subCategory: "Communication", Icon: SiDiscord },
  { name: "JQuery", category: "Tools & Workspace", subCategory: "Legacy Utils", Icon: SiJquery }
];
