"use client";

import { useState, useTransition, useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createPhoto, updatePhoto } from "@/lib/actions";
import { ImageIcon, Loader2 } from "lucide-react";

const ASPECT_OPTIONS = ["1/1", "4/3", "3/2", "16/9", "3/4", "2/3", "9/16"];

export function PhotoForm({ photo, categories, isOpen, onClose, onSuccess }) {
    const isEdit = !!photo;
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.target);

        startTransition(async () => {
            const result = isEdit
                ? await updatePhoto(photo.id, formData)
                : await createPhoto(formData);

            if (result.success) {
                // Cleanup preview URL
                if (preview) URL.revokeObjectURL(preview);
                setPreview(null);
                e.target.reset();
                onSuccess();
            } else {
                setError(result.error || "Something went wrong.");
            }
        });
    };

    const handleClose = () => {
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        setError(null);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="font-mono tracking-wide">
                        {isEdit ? "Edit Echo" : "Add New Echo"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                    {/* Error */}
                    {error && (
                        <div className="rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 font-mono">
                            {error}
                        </div>
                    )}

                    {/* Title */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                            Title
                        </label>
                        <Input
                            name="title"
                            defaultValue={photo?.title || ""}
                            placeholder="e.g. Golden Hour at Mount Bromo"
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                            Category
                        </label>
                        <select
                            name="category_id"
                            defaultValue={photo?.category_id || ""}
                            className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                        >
                            <option value="">— No category —</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Aspect Ratio */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                            Aspect Ratio
                        </label>
                        <select
                            name="aspect"
                            defaultValue={photo?.aspect || "4/3"}
                            className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                        >
                            {ASPECT_OPTIONS.map((a) => (
                                <option key={a} value={a}>{a}</option>
                            ))}
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                            Image {isEdit && <span className="text-gray-600">(leave empty to keep existing)</span>}
                        </label>
                        <div className="space-y-2">
                            {/* Preview */}
                            {(preview || photo?.image_url) && (
                                <div className="relative h-36 rounded-md overflow-hidden border border-border">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={preview || photo?.image_url}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div
                                className="border-2 border-dashed border-border rounded-md px-4 py-5 text-center text-sm text-muted-foreground cursor-pointer hover:border-primary/50 transition-colors"
                                onClick={() => fileRef.current?.click()}
                            >
                                <ImageIcon className="w-5 h-5 mx-auto mb-1.5 opacity-50" />
                                {preview ? "Change image" : "Click to upload image"}
                                <p className="text-[11px] mt-1 text-gray-600">JPG, PNG, WebP · max 10MB</p>
                            </div>
                            <input
                                ref={fileRef}
                                name="image"
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/avif"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    {/* EXIF Data */}
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                            EXIF Data <span className="text-gray-600">(optional)</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Input
                                    name="exif_aperture"
                                    defaultValue={photo?.exif_data?.aperture || ""}
                                    placeholder="f/2.8"
                                    className="text-xs font-mono"
                                />
                                <p className="text-[10px] text-muted-foreground mt-1 pl-1">Aperture</p>
                            </div>
                            <div>
                                <Input
                                    name="exif_shutter"
                                    defaultValue={photo?.exif_data?.shutter || ""}
                                    placeholder="1/250s"
                                    className="text-xs font-mono"
                                />
                                <p className="text-[10px] text-muted-foreground mt-1 pl-1">Shutter</p>
                            </div>
                            <div>
                                <Input
                                    name="exif_iso"
                                    defaultValue={photo?.exif_data?.iso || ""}
                                    placeholder="ISO 400"
                                    className="text-xs font-mono"
                                />
                                <p className="text-[10px] text-muted-foreground mt-1 pl-1">ISO</p>
                            </div>
                            <div>
                                <Input
                                    name="exif_focal"
                                    defaultValue={photo?.exif_data?.focal || ""}
                                    placeholder="50mm"
                                    className="text-xs font-mono"
                                />
                                <p className="text-[10px] text-muted-foreground mt-1 pl-1">Focal Length</p>
                            </div>
                        </div>
                    </div>

                    {/* Captured At */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                            Captured At <span className="text-gray-600">(optional)</span>
                        </label>
                        <Input
                            name="captured_at"
                            type="datetime-local"
                            defaultValue={photo?.captured_at ? photo.captured_at.slice(0, 16) : ""}
                        />
                    </div>

                    {/* Featured toggle */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="featured"
                            id="photo-featured"
                            value="true"
                            defaultChecked={!!photo?.featured}
                            className="h-4 w-4 rounded border-border accent-primary"
                        />
                        <label htmlFor="photo-featured" className="text-sm text-muted-foreground select-none">
                            Featured on gallery
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-2 border-t border-border">
                        <Button type="button" variant="ghost" onClick={handleClose} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending} className="gap-2 min-w-[100px]">
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Saving…
                                </>
                            ) : isEdit ? "Save Changes" : "Add Echo"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
