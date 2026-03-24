import { Image as ImageIcon } from "lucide-react";
import { fetchPhotos, fetchPhotoCategories } from "@/lib/queries";
import { Separator } from "@/components/ui/separator";
import { AdminGalleryClient } from "@/components/admin/AdminGalleryClient";

export default async function MemoryKeeperPage() {
  const [photos, categories] = await Promise.all([
    fetchPhotos(),
    fetchPhotoCategories(),
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-3">
          <ImageIcon className="w-5 h-5 text-primary" />
          Memory Keeper
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Echoes &amp; Photography Management — {photos.length} photos across {categories.length} categories
        </p>
      </header>

      <Separator />

      <AdminGalleryClient photos={photos} categories={categories} />
    </div>
  );
}
