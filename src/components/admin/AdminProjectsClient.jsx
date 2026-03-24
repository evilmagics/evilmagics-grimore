"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Edit2, Trash2, Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { deleteProject } from "@/lib/actions";

export function AdminProjectsClient({ projects, techStack }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [featuredFilter, setFeaturedFilter] = useState("all");

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const matchesFeatured =
                featuredFilter === "all"
                    ? true
                    : featuredFilter === "featured"
                        ? !!project.featured
                        : !project.featured;

            const q = searchQuery.trim().toLowerCase();
            const searchableText = [
                project.title,
                project.slug,
                project.summary,
                ...(project.tags || []),
                ...(project.techs || []).map((t) => (typeof t === "string" ? t : t.name)),
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            const matchesSearch = !q || searchableText.includes(q);

            return matchesFeatured && matchesSearch;
        });
    }, [projects, featuredFilter, searchQuery]);

    return (
        <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">All Constructs</CardTitle>
                <ProjectFormButton techStack={techStack} />
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
                        <div className="relative w-full md:max-w-sm">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search title, slug, tech, tags..."
                                className="pl-9"
                            />
                        </div>

                        <select
                            value={featuredFilter}
                            onChange={(e) => setFeaturedFilter(e.target.value)}
                            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                        >
                            <option value="all">All Constructs</option>
                            <option value="featured">Featured only</option>
                            <option value="regular">Non-featured only</option>
                        </select>
                    </div>

                    <div className="text-xs text-muted-foreground">
                        Showing {filteredProjects.length} of {projects.length} constructs
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">IDX</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Tech Stack</TableHead>
                            <TableHead className="w-[120px] text-center">Images</TableHead>
                            <TableHead className="w-[80px] text-center">Mana</TableHead>
                            <TableHead className="w-[90px] text-center">Featured</TableHead>
                            <TableHead className="w-[80px] text-center">Links</TableHead>
                            <TableHead className="w-[100px] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProjects.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell className="font-mono text-xs text-muted-foreground">
                                    {project.idx}
                                </TableCell>
                                <TableCell className="font-medium">{project.title}</TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1 max-w-[250px]">
                                        {project.techs?.slice(0, 5).map((t) => (
                                            <Badge key={typeof t === "string" ? t : t.name} variant="secondary" className="rounded-full text-[10px] px-2 py-0.5 tracking-wide">
                                                {typeof t === "string" ? t : t.name}
                                            </Badge>
                                        ))}
                                        {project.techs?.length > 5 && (
                                            <Badge variant="outline" className="rounded-full text-[10px] px-2 py-0.5 tracking-wide">
                                                +{project.techs.length - 5}
                                            </Badge>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="flex items-center justify-center">
                                        <Badge variant={project.images?.length ? "default" : "outline"} className="rounded-full text-[10px] px-2 py-0.5">
                                            {project.images?.length || 0} images
                                        </Badge>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="flex items-center gap-1.5 justify-center">
                                        <div className="h-1.5 w-12 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full"
                                                style={{ width: `${project.mana_cost}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-muted-foreground">{project.mana_cost}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    {project.featured ? (
                                        <Badge className="text-[10px]">Featured</Badge>
                                    ) : (
                                        <span className="text-xs text-muted-foreground">—</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="flex gap-1 justify-center">
                                        {project.repo_url && (
                                            <a href={project.repo_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex gap-1 justify-end">
                                        <ProjectFormButton project={project} techStack={techStack} />
                                        <DeleteProjectButton projectId={project.id} projectTitle={project.title} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}

                        {filteredProjects.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={8} className="py-10 text-center text-sm text-muted-foreground">
                                    No constructs matched your current search/filter.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

function ProjectFormButton({ project, techStack }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            {project ? (
                <Button variant="ghost" size="icon-sm" className="h-7 w-7" onClick={() => setIsOpen(true)}>
                    <Edit2 className="w-3.5 h-3.5" />
                </Button>
            ) : (
                <Button onClick={() => setIsOpen(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Create Construct
                </Button>
            )}
            <ProjectForm
                project={project}
                techStack={techStack}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSuccess={() => {
                    setIsOpen(false);
                    router.refresh();
                }}
            />
        </>
    );
}

function DeleteProjectButton({ projectId, projectTitle }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDelete = () => {
        const ok = window.confirm(`Delete \"${projectTitle}\"? This action cannot be undone.`);
        if (!ok) return;

        startTransition(async () => {
            const result = await deleteProject(projectId);
            if (result.success) {
                router.refresh();
            } else {
                window.alert(`Failed to delete project: ${result.error}`);
            }
        });
    };

    return (
        <Button
            variant="ghost"
            size="icon-sm"
            className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-500/10"
            onClick={handleDelete}
            disabled={isPending}
        >
            <Trash2 className="w-3.5 h-3.5" />
        </Button>
    );
}
