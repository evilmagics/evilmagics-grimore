import ProjectsClient from "./ProjectsClient";
import { fetchProjects } from "@/lib/queries";

export default async function ProjectsPage() {
  const projects = await fetchProjects();
  return <ProjectsClient projects={projects} />;
}
