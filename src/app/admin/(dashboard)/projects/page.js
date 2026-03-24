import { FolderKanban } from "lucide-react";
import { fetchProjects, fetchTechStack } from "@/lib/queries";
import { Separator } from "@/components/ui/separator";
import { AdminProjectsClient } from "@/components/admin/AdminProjectsClient";

export default async function ArchivistPage() {
  const [projects, techStack] = await Promise.all([
    fetchProjects(),
    fetchTechStack(),
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-3">
          <FolderKanban className="w-5 h-5 text-primary" />
          The Archivist
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Construct Database Management — {projects.length} projects</p>
      </header>

      <Separator />

      <AdminProjectsClient projects={projects} techStack={techStack} />
    </div>
  );
}
