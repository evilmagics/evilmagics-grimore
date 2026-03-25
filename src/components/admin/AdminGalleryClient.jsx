"use client";

import { useState, useTransition } from "react";
import { Edit2, Trash2, Plus, Image as ImageIcon, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { deletePhoto } from "@/lib/actions";
import { PhotoForm } from "@/components/admin/PhotoForm";
import { useEffect, Suspense, useMemo } from "react";

function AdminGalleryInner({ photos, categories }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [formOpen, setFormOpen] = useState(false);
    const [editingPhoto, setEditingPhoto] = useState(null);

    // Search and Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateSort, setDateSort] = useState("newest");

    // Issue #10: auto-open on ?action=new
    useEffect(() => {
        if (searchParams.get("action") === "new") {
            setEditingPhoto(null);
            setFormOpen(true);
            // Remove query param without full navigation
            const url = new URL(window.location.href);
            url.searchParams.delete("action");
            window.history.replaceState({}, "", url.toString());
        }
    }, [searchParams]);

    const handleAdd = () => {
        setEditingPhoto(null);
        setFormOpen(true);
    };

    const handleEdit = (photo) => {
        setEditingPhoto(photo);
        setFormOpen(true);
    };

    const handleClose = () => {
        setFormOpen(false);
        setEditingPhoto(null);
    };

    const handleSuccess = () => {
        handleClose();
        router.refresh();
    };

    const filteredPhotos = useMemo(() => {
        return photos.filter(photo => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = (photo.title || "Untitled").toLowerCase().includes(searchLower) ||
                                  (photo.category || "").toLowerCase().includes(searchLower);
            const matchesCategory = categoryFilter === "all" || photo.category === categoryFilter;
            const matchesStatus = statusFilter === "all" || 
                (statusFilter === "featured" && photo.featured) || 
                (statusFilter === "unfeatured" && !photo.featured);
            return matchesSearch && matchesCategory && matchesStatus;
        }).sort((a, b) => {
            const timeA = new Date(a.captured_at || a.created_at || 0).getTime();
            const timeB = new Date(b.captured_at || b.created_at || 0).getTime();
            return dateSort === "newest" ? timeB - timeA : timeA - timeB;
        });
    }, [photos, searchQuery, categoryFilter, statusFilter, dateSort]);

    return (
        <>
            {/* Header with Add button */}
            <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-muted-foreground font-mono">
                    {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? "s" : ""} in archive
                </div>
                <Button onClick={handleAdd} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Echo
                </Button>
            </div>

            {/* Filtering and Search Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                    <Input 
                        placeholder="Search echoes by title or category..." 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        className="w-full max-w-sm"
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    <select 
                        value={categoryFilter} 
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="h-10 px-3 py-2 text-sm bg-background border border-input rounded-md ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="all">All Categories</option>
                        {categories?.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                    <select 
                        value={statusFilter} 
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-10 px-3 py-2 text-sm bg-background border border-input rounded-md ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="all">All Status</option>
                        <option value="featured">Featured</option>
                        <option value="unfeatured">Unfeatured</option>
                    </select>
                    <select 
                        value={dateSort} 
                        onChange={(e) => setDateSort(e.target.value)}
                        className="h-10 px-3 py-2 text-sm bg-background border border-input rounded-md ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPhotos.map((photo) => (
                    <PhotoAdminCard
                        key={photo.id}
                        photo={photo}
                        onEdit={() => handleEdit(photo)}
                        onDeleted={() => router.refresh()}
                    />
                ))}
            </div>

            {photos.length > 0 && filteredPhotos.length === 0 && (
                <Card className="mt-6">
                    <CardContent className="py-12 text-center text-muted-foreground text-sm">
                        <ImageIcon className="w-8 h-8 mx-auto mb-3 opacity-30" />
                        No echoes match your current filters.
                        <br />
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setCategoryFilter("all");
                                setStatusFilter("all");
                                setDateSort("newest");
                            }}
                            className="mt-3 text-primary underline underline-offset-2 text-xs hover:opacity-80"
                        >
                            Reset filters
                        </button>
                    </CardContent>
                </Card>
            )}

            {photos.length === 0 && (
                <Card>
                    <CardContent className="py-12 text-center text-muted-foreground text-sm">
                        <ImageIcon className="w-8 h-8 mx-auto mb-3 opacity-30" />
                        No photos found in the archive.
                        <br />
                        <button
                            onClick={handleAdd}
                            className="mt-3 text-primary underline underline-offset-2 text-xs hover:opacity-80"
                        >
                            Add your first echo
                        </button>
                    </CardContent>
                </Card>
            )}

            <PhotoForm
                photo={editingPhoto}
                categories={categories}
                isOpen={formOpen}
                onClose={handleClose}
                onSuccess={handleSuccess}
            />
        </>
    );
}

function PhotoAdminCard({ photo, onEdit, onDeleted }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        const ok = window.confirm(`Delete "${photo.title || "Untitled"}"? This cannot be undone.`);
        if (!ok) return;
        startTransition(async () => {
            const result = await deletePhoto(photo.id);
            if (result.success) {
                onDeleted();
            } else {
                window.alert(`Failed to delete: ${result.error}`);
            }
        });
    };

    return (
        <Card className="overflow-hidden group relative">
            {/* Image preview */}
            <div className="relative h-40 w-full overflow-hidden bg-muted">
                {photo.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={photo.image_url}
                        alt={photo.title || "Echo"}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div
                        className="w-full h-full"
                        style={{ background: photo.gradient || "linear-gradient(135deg,#0a0a0a,#1a1a1a)" }}
                    />
                )}
                {/* Action overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8"
                        onClick={onEdit}
                    >
                        <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                </div>
            </div>

            <CardContent className="pt-3 pb-4 px-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <h3 className="font-medium text-sm truncate">{photo.title || "Untitled"}</h3>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                            <Badge variant="secondary" className="text-[10px]">
                                {photo.category || "Uncategorized"}
                            </Badge>
                            {photo.featured && (
                                <Badge className="text-[10px] gap-1">
                                    <Star className="w-2.5 h-2.5" />
                                    Featured
                                </Badge>
                            )}
                        </div>
                    </div>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0 mt-0.5 font-mono">
                        {photo.aspect}
                    </span>
                </div>

                {photo.exif_data && (
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-muted-foreground font-mono">
                        {photo.exif_data.aperture && <span>{photo.exif_data.aperture}</span>}
                        {photo.exif_data.shutter && <span>{photo.exif_data.shutter}</span>}
                        {photo.exif_data.iso && <span>{photo.exif_data.iso}</span>}
                        {photo.exif_data.focal && <span>{photo.exif_data.focal}</span>}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export function AdminGalleryClient({ photos, categories }) {
    return (
        <Suspense fallback={null}>
            <AdminGalleryInner photos={photos} categories={categories} />
        </Suspense>
    );
}
