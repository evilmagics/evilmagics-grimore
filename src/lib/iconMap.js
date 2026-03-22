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

/**
 * Maps icon_key strings (stored in database) to React icon components.
 */
const ICON_MAP = {
  SiGo, SiPython, SiDotnet, SiCplusplus, SiJavascript, SiTypescript, SiCss, SiHtml5, SiPhp, SiGnubash, SiDart,
  SiBootstrap, SiTailwindcss, SiReact, SiVuedotjs, SiNextdotjs, SiLaravel, SiFlutter,
  SiFastapi, SiDjango, SiPandas, SiNumpy, SiSqlalchemy,
  SiFramer, SiPrisma, SiDrizzle,
  SiMysql, SiPostgresql, SiSqlite, SiMongodb, SiRedis, SiRabbitmq, SiSupabase, SiFirebase,
  SiDocker, SiPodman, SiKubernetes, SiGit, SiGrafana,
  SiSublimetext, SiAndroidstudio, SiJquery, SiFigma, SiNotion, SiPostman, SiDiscord,
  FaServer, FaDatabase, FaCogs, FaCube, FaCode,
};

/**
 * Get the React icon component for a given icon_key string.
 * @param {string} iconKey - The icon key string from the database (e.g., "SiGo", "FaServer")
 * @returns {React.ComponentType|null}
 */
export function getIconComponent(iconKey) {
  return ICON_MAP[iconKey] || null;
}

/**
 * Get the SVG shape path for a tech category (used in the globe).
 */
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
