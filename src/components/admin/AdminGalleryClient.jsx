"use client";

import { useState, useTransition } from "react";
import { Edit2, Trash2, Plus, Image as ImageIcon, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { deletePhoto } from "@/lib/actions";
import { PhotoForm } from "@/components/admin/PhotoForm";
import { useEffect, Suspense } from "react";

function AdminGalleryInner({ photos, categories }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [formOpen, setFormOpen] = useState(false);
    const [editingPhoto, setEditingPhoto] = useState(null);

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

    return (
        <>
            {/* Header with Add button */}
            <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-muted-foreground font-mono">
                    {photos.length} photo{photos.length !== 1 ? "s" : ""} in archive
                </div>
                <Button onClick={handleAdd} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Echo
                </Button>
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos.map((photo) => (
                    <PhotoAdminCard
                        key={photo.id}
                        photo={photo}
                        onEdit={() => handleEdit(photo)}
                        onDeleted={() => router.refresh()}
                    />
                ))}
            </div>

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
