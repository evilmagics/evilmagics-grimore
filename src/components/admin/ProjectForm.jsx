"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getIconComponent } from "@/lib/iconMap"
import { createProject, updateProject } from "@/lib/actions"
import { ImageIcon, Plus, Search, Star, X } from "lucide-react"

const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
    summary: z.string().min(1, "Summary is required"),
    description: z.string().min(1, "Description is required"),
    mana_cost: z.number().min(1).max(100),
    tags: z.string().optional(),
    live_url: z.string().url().optional().or(z.literal("")),
    repo_url: z.string().url().optional().or(z.literal("")),
    cover_gradient: z.string().optional(),
    tech_ids: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
})

const normalizeHex = (color, fallback) => {
    if (!color || typeof color !== "string") return fallback
    if (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color)) return color
    return fallback
}

const extractGradientConfig = (gradient) => {
    const angleMatch = gradient?.match(/(-?\d+(?:\.\d+)?)deg/i)
    const extractedAngle = angleMatch ? Number.parseFloat(angleMatch[1]) : 135
    const colors = gradient?.match(/#(?:[0-9a-fA-F]{3}){1,2}/g) || []

    return {
        angle: Number.isFinite(extractedAngle) ? extractedAngle : 135,
        from: normalizeHex(colors[0], "#0a0a0a"),
        via: normalizeHex(colors[1], "#1a1a1a"),
        to: normalizeHex(colors[2], normalizeHex(colors[1], "#2a2a2a")),
    }
}

const buildGradient = (angle = 135, from = "#0a0a0a", via = "#1a1a1a", to = "#2a2a2a") => {
    return `linear-gradient(${Math.round(angle)}deg, ${from}, ${via}, ${to})`
}

export function ProjectForm({ project, techStack = [], isOpen, onClose, onSuccess }) {
    const [techQuery, setTechQuery] = useState("")
    const [tagInput, setTagInput] = useState("")
    const [selectedImageFiles, setSelectedImageFiles] = useState([])
    const [removedImageIds, setRemovedImageIds] = useState([])
    const [primaryImageId, setPrimaryImageId] = useState("")

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: "",
            slug: "",
            summary: "",
            description: "",
            mana_cost: 10,
            tags: "",
            live_url: "",
            repo_url: "",
            cover_gradient: "linear-gradient(135deg, #0a0a0a, #1a1a1a, #2a2a2a)",
            tech_ids: [],
            featured: false,
        },
    })

    const watchedTitle = useWatch({ control, name: "title" })
    const watchedFeatured = useWatch({ control, name: "featured" })
    const watchedCoverGradient = useWatch({ control, name: "cover_gradient" })
    const watchedTags = useWatch({ control, name: "tags" })
    const watchedTechIds = useWatch({ control, name: "tech_ids" })

    useEffect(() => {
        if (project) {
            const parsedGradient = extractGradientConfig(project.cover_gradient)

            reset({
                title: project.title,
                slug: project.slug,
                summary: project.summary,
                description: project.description,
                mana_cost: project.mana_cost,
                tags: project.tags?.join(", ") || "",
                live_url: project.live_url || "",
                repo_url: project.repo_url || "",
                cover_gradient: project.cover_gradient || buildGradient(parsedGradient.angle, parsedGradient.from, parsedGradient.via, parsedGradient.to),
                tech_ids: project.techs?.map(t => t.id) || [],
                featured: !!project.featured,
            })
        } else {
            reset({
                title: "",
                slug: "",
                summary: "",
                description: "",
                mana_cost: 10,
                tags: "",
                live_url: "",
                repo_url: "",
                cover_gradient: buildGradient(135, "#0a0a0a", "#1a1a1a", "#2a2a2a"),
                tech_ids: [],
                featured: false,
            })
        }
    }, [project, reset])

    const tags = useMemo(() => {
        if (!watchedTags) return []

        const parsed = watchedTags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)

        return parsed.filter((tag, index) => parsed.findIndex((t) => t.toLowerCase() === tag.toLowerCase()) === index)
    }, [watchedTags])

    const selectedTechs = watchedTechIds || []

    const gradientConfig = useMemo(
        () => extractGradientConfig(watchedCoverGradient || buildGradient()),
        [watchedCoverGradient]
    )

    const onSubmit = async (data) => {
        const formData = new FormData()
        Object.keys(data).forEach(key => {
            if (key === "tech_ids") {
                data[key].forEach(id => formData.append("tech_ids", id))
            } else if (key === "featured") {
                formData.append("featured", data[key] ? "true" : "false")
            } else if (key === "tags") {
                formData.append("tags", data[key] || "")
            } else {
                formData.append(key, data[key])
            }
        })

        selectedImageFiles.forEach((file) => {
            formData.append("images", file)
        })

        removedImageIds.forEach((imageId) => {
            formData.append("removed_image_ids", imageId)
        })

        if (primaryImageId) {
            formData.append("primary_image_id", primaryImageId)
        } else if (effectivePrimaryImageId) {
            formData.append("primary_image_id", effectivePrimaryImageId)
        }

        const action = project ? updateProject(project.id, formData) : createProject(formData)
        const result = await action

        if (result.success) {
            onSuccess()
            onClose()
        } else {
            alert(result.error)
        }
    }

    const toggleTech = (techId) => {
        const newTechs = selectedTechs.includes(techId)
            ? selectedTechs.filter(id => id !== techId)
            : [...selectedTechs, techId]
        setValue("tech_ids", newTechs, { shouldDirty: true, shouldValidate: true })
    }

    const updateGradient = (changes) => {
        const nextAngle = changes.angle ?? gradientConfig.angle
        const nextFrom = changes.from ?? gradientConfig.from
        const nextVia = changes.via ?? gradientConfig.via
        const nextTo = changes.to ?? gradientConfig.to

        setValue("cover_gradient", buildGradient(nextAngle, nextFrom, nextVia, nextTo), {
            shouldDirty: true,
            shouldValidate: true,
        })
    }

    const addTag = (rawValue = tagInput) => {
        const candidates = rawValue
            .split(",")
            .map(tag => tag.trim())
            .filter(Boolean)

        if (candidates.length === 0) return

        const currentLower = new Set(tags.map(tag => tag.toLowerCase()))
        const uniqueNew = candidates.filter(tag => !currentLower.has(tag.toLowerCase()))

        if (uniqueNew.length === 0) {
            setTagInput("")
            return
        }

        const newTags = [...tags, ...uniqueNew]
        setValue("tags", newTags.join(", "), { shouldDirty: true, shouldValidate: true })
        setTagInput("")
    }

    const removeTag = (tagToRemove) => {
        const newTags = tags.filter(t => t.toLowerCase() !== tagToRemove.toLowerCase())
        setValue("tags", newTags.join(", "))
    }

    const generateSlug = () => {
        const title = watchedTitle
        if (title) {
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")
                .trim()
            setValue("slug", slug)
        }
    }

    // Group tech stack by category
    const groupedTech = useMemo(() => techStack.reduce((acc, tech) => {
        if (!acc[tech.category]) acc[tech.category] = []
        acc[tech.category].push(tech)
        return acc
    }, {}), [techStack])

    const filteredGroupedTech = useMemo(() => {
        const query = techQuery.trim().toLowerCase()
        if (!query) return groupedTech

        return Object.entries(groupedTech).reduce((acc, [category, techs]) => {
            const filtered = techs.filter((tech) => {
                return (
                    tech.name.toLowerCase().includes(query)
                    || category.toLowerCase().includes(query)
                )
            })

            if (filtered.length > 0) acc[category] = filtered
            return acc
        }, {})
    }, [groupedTech, techQuery])

    const previewGradient = buildGradient(
        gradientConfig.angle,
        gradientConfig.from,
        gradientConfig.via,
        gradientConfig.to
    )

    const labelClass = "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
    const panelClass = "space-y-3 rounded-xl border border-border/70 bg-muted/20 p-4"

    const handleOpenChange = (open) => {
        if (!open) {
            setTagInput("")
            setTechQuery("")
            setSelectedImageFiles([])
            setRemovedImageIds([])
            setPrimaryImageId("")
            onClose()
        }
    }

    const existingImages = useMemo(() => {
        if (!project?.images) return []

        return project.images
            .filter((img) => !removedImageIds.includes(img.id))
            .slice()
            .sort((a, b) => {
                if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order
                return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            })
    }, [project, removedImageIds])

    const effectivePrimaryImageId =
        primaryImageId
        || existingImages.find((img) => img.is_primary)?.id
        || existingImages[0]?.id
        || ""

    const handleImageSelection = (event) => {
        const files = Array.from(event.target.files || [])
        if (!files.length) return

        setSelectedImageFiles((prev) => [...prev, ...files])
        event.target.value = ""
    }

    const removeSelectedUpload = (index) => {
        setSelectedImageFiles((prev) => prev.filter((_, i) => i !== index))
    }

    const markExistingImageForRemoval = (imageId) => {
        setRemovedImageIds((prev) => {
            if (prev.includes(imageId)) return prev
            return [...prev, imageId]
        })

        if (primaryImageId === imageId) {
            setPrimaryImageId("")
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="max-h-[92vh] overflow-y-auto p-0 sm:max-w-5xl lg:max-w-6xl">
                <DialogHeader className="border-b border-border/60 px-8 py-5">
                    <DialogTitle className="text-lg">{project ? "Edit Construct" : "Create New Construct"}</DialogTitle>
                    <DialogDescription>
                        Configure all details for the construct. Fields are grouped by content, visuals, and indexing.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-8 py-6">
                    <section className={panelClass}>
                        <div className="mb-1 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-foreground">Core Details</h3>
                            <span className="text-xs text-muted-foreground">Required metadata</span>
                        </div>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div className="space-y-2">
                                <label className={labelClass}>Title</label>
                                <Input {...register("title")} placeholder="Project title" />
                                {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className={labelClass}>Summary</label>
                                <Input {...register("summary")} placeholder="Brief one-line summary" />
                                {errors.summary && <p className="text-xs text-red-500">{errors.summary.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className={labelClass}>Description</label>
                            <Textarea {...register("description")} placeholder="Detailed description" rows={5} className="min-h-[140px]" />
                            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div className="space-y-2">
                                <label className={labelClass}>Mana Cost (1-100)</label>
                                <Input
                                    type="number"
                                    {...register("mana_cost", { valueAsNumber: true })}
                                    min={1}
                                    max={100}
                                />
                                {errors.mana_cost && <p className="text-xs text-red-500">{errors.mana_cost.message}</p>}
                            </div>

                            <div className="rounded-md border border-border/70 bg-background/60 px-3 py-2.5">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={!!watchedFeatured}
                                        onChange={(e) => setValue("featured", e.target.checked)}
                                        className="rounded"
                                    />
                                    <label htmlFor="featured" className="text-sm font-medium text-foreground/90">Featured Project</label>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={panelClass}>
                        <div className="mb-1 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-foreground">Visual & Taxonomy</h3>
                            <span className="text-xs text-muted-foreground">Gradient, stack, and tags</span>
                        </div>

                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                            <div className="space-y-3">
                                <label className={labelClass}>Cover Gradient Builder</label>
                                <div className="h-20 rounded-lg border border-border/60" style={{ backgroundImage: previewGradient }} />

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                    <div className="space-y-1.5">
                                        <span className="text-xs text-muted-foreground">From</span>
                                        <Input
                                            type="color"
                                            value={gradientConfig.from}
                                            onChange={(e) => updateGradient({ from: e.target.value })}
                                            className="h-10 cursor-pointer p-1"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <span className="text-xs text-muted-foreground">Via</span>
                                        <Input
                                            type="color"
                                            value={gradientConfig.via}
                                            onChange={(e) => updateGradient({ via: e.target.value })}
                                            className="h-10 cursor-pointer p-1"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <span className="text-xs text-muted-foreground">To</span>
                                        <Input
                                            type="color"
                                            value={gradientConfig.to}
                                            onChange={(e) => updateGradient({ to: e.target.value })}
                                            className="h-10 cursor-pointer p-1"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <span className="text-xs text-muted-foreground">Angle ({Math.round(gradientConfig.angle)}°)</span>
                                    <Input
                                        type="range"
                                        min={0}
                                        max={360}
                                        step={1}
                                        value={gradientConfig.angle}
                                        onChange={(e) => updateGradient({ angle: Number(e.target.value) })}
                                        className="h-9 cursor-pointer"
                                    />
                                </div>

                                <Input value={previewGradient} readOnly className="font-mono text-[11px] text-muted-foreground" />
                                <input type="hidden" {...register("cover_gradient")} />
                            </div>

                            <div className="space-y-3">
                                <label className={labelClass}>Tech Stack (Smart Select)</label>
                                <div className="relative">
                                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        value={techQuery}
                                        onChange={(e) => setTechQuery(e.target.value)}
                                        placeholder="Search technologies..."
                                        className="pl-9"
                                    />
                                </div>

                                {selectedTechs.length > 0 && (
                                    <div className="flex flex-wrap gap-2 rounded-md border border-border/60 bg-background/50 p-2">
                                        {selectedTechs.map((techId) => {
                                            const selected = techStack.find((t) => t.id === techId)
                                            if (!selected) return null
                                            const Icon = getIconComponent(selected.icon_key)
                                            return (
                                                <Badge key={selected.id} variant="secondary" className="gap-1 py-1">
                                                    {Icon && <Icon className="h-3 w-3" />}
                                                    {selected.name}
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleTech(selected.id)}
                                                        className="ml-1 rounded-sm hover:text-red-500"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </Badge>
                                            )
                                        })}
                                    </div>
                                )}

                                <div className="max-h-56 space-y-3 overflow-y-auto rounded-md border border-border/60 bg-background/40 p-3">
                                    {Object.entries(filteredGroupedTech).map(([category, techs]) => (
                                        <div key={category} className="space-y-2">
                                            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{category}</span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {techs.map(tech => {
                                                    const Icon = getIconComponent(tech.icon_key)
                                                    const isSelected = selectedTechs.includes(tech.id)
                                                    return (
                                                        <Badge
                                                            key={tech.id}
                                                            variant={isSelected ? "default" : "outline"}
                                                            className="cursor-pointer flex items-center gap-1 text-[10px] py-1"
                                                            onClick={() => toggleTech(tech.id)}
                                                        >
                                                            {Icon && <Icon className="w-3 h-3" />}
                                                            {tech.name}
                                                        </Badge>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ))}

                                    {Object.keys(filteredGroupedTech).length === 0 && (
                                        <p className="text-xs text-muted-foreground">No technologies matched your keyword.</p>
                                    )}
                                </div>

                            </div>
                        </div>

                        <div className="space-y-2.5">
                            <label className={labelClass}>Tags (press comma or Enter)</label>
                            <div className="flex gap-2">
                                <Input
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    placeholder="Add tag..."
                                    onBlur={() => addTag(tagInput)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === ",") {
                                            e.preventDefault()
                                            addTag(tagInput)
                                        }
                                    }}
                                />
                                <Button type="button" variant="outline" size="sm" onClick={() => addTag(tagInput)}>
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                            {tags.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                    {tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="text-[10px]">
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="ml-1 hover:text-red-500"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}
                            <input type="hidden" {...register("tags")} />
                        </div>
                    </section>

                    <section className={panelClass}>
                        <div className="mb-1 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-foreground">Identity & Links</h3>
                            <span className="text-xs text-muted-foreground">URL and indexing data</span>
                        </div>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div className="space-y-2 lg:col-span-2">
                                <label className={labelClass}>Slug</label>
                                <div className="flex gap-2">
                                    <Input {...register("slug")} placeholder="project-slug" />
                                    <Button type="button" variant="outline" size="sm" onClick={generateSlug} className="px-4">
                                        Generate
                                    </Button>
                                </div>
                                {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className={labelClass}>Live URL</label>
                                <Input {...register("live_url")} placeholder="https://..." />
                            </div>

                            <div className="space-y-2">
                                <label className={labelClass}>Repo URL</label>
                                <Input {...register("repo_url")} placeholder="https://github.com/..." />
                            </div>
                        </div>
                    </section>

                    <section className={panelClass}>
                        <div className="mb-1 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-foreground">Project Images</h3>
                            <span className="text-xs text-muted-foreground">Cloudinary gallery assets</span>
                        </div>

                        <div className="space-y-3">
                            <label className={labelClass}>Upload New Images</label>
                            <Input
                                type="file"
                                accept="image/png,image/jpeg,image/webp,image/avif"
                                multiple
                                onChange={handleImageSelection}
                            />
                            <p className="text-[11px] text-muted-foreground">
                                Allowed types: JPG, PNG, WEBP, AVIF. Maximum 10MB per image.
                            </p>
                        </div>

                        {selectedImageFiles.length > 0 && (
                            <div className="space-y-2 rounded-md border border-border/60 bg-background/40 p-3">
                                <div className="text-xs font-medium">Queued uploads</div>
                                <div className="space-y-1.5">
                                    {selectedImageFiles.map((file, index) => (
                                        <div key={`${file.name}-${index}`} className="flex items-center justify-between rounded-md border border-border/50 px-2.5 py-1.5 text-xs">
                                            <div className="min-w-0">
                                                <p className="truncate font-medium">{file.name}</p>
                                                <p className="text-[10px] text-muted-foreground">{Math.ceil(file.size / 1024)} KB</p>
                                            </div>
                                            <Button type="button" variant="ghost" size="icon-sm" className="h-6 w-6" onClick={() => removeSelectedUpload(index)}>
                                                <X className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {project && (
                            <div className="space-y-2 rounded-md border border-border/60 bg-background/40 p-3">
                                <div className="text-xs font-medium">Existing gallery</div>

                                {existingImages.length > 0 ? (
                                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                        {existingImages.map((image) => (
                                            <div key={image.id} className="rounded-md border border-border/60 overflow-hidden bg-muted/20">
                                                <div className="aspect-video bg-black/30">
                                                    <Image
                                                        src={image.secure_url || image.image_url}
                                                        alt={image.alt_text || project.title}
                                                        width={640}
                                                        height={360}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between gap-1 p-2">
                                                    <Button
                                                        type="button"
                                                        variant={primaryImageId === image.id ? "default" : "outline"}
                                                        size="sm"
                                                        className="h-7 text-[10px]"
                                                        onClick={() => setPrimaryImageId(image.id)}
                                                    >
                                                        <Star className="mr-1 h-3 w-3" />
                                                        Primary
                                                    </Button>

                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-7 text-[10px] text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                                        onClick={() => markExistingImageForRemoval(image.id)}
                                                    >
                                                        <X className="mr-1 h-3 w-3" />
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 rounded-md border border-dashed border-border/60 px-3 py-5 text-xs text-muted-foreground">
                                        <ImageIcon className="h-4 w-4" />
                                        No existing images on this construct.
                                    </div>
                                )}
                            </div>
                        )}
                    </section>

                    <Separator />

                    <DialogFooter className="gap-2 border-t border-border/60 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : project ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
