import { Image as ImageIcon } from "lucide-react";
import { fetchPhotos, fetchPhotoCategories } from "@/lib/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
          Echoes & Photography Management — {photos.length} photos across {categories.length} categories
        </p>
      </header>

      <Separator />

      {/* Category summary */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => {
          const count = photos.filter(p => p.category === cat.name).length;
          return (
            <Badge key={cat.id} variant="outline" className="text-xs">
              {cat.name}: {count}
            </Badge>
          );
        })}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden">
            {/* Gradient preview */}
            <div
              className="h-32 w-full"
              style={{ background: photo.gradient }}
            />
            <CardContent className="pt-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-medium text-sm">{photo.title}</h3>
                  <Badge variant="secondary" className="text-[10px] mt-1">{photo.category}</Badge>
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap mt-0.5">
                  {photo.aspect}
                </span>
              </div>

              {photo.exif_data && (
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground font-mono pt-1">
                  {photo.exif_data.aperture && <span>{photo.exif_data.aperture}</span>}
                  {photo.exif_data.shutter && <span>{photo.exif_data.shutter}</span>}
                  {photo.exif_data.iso && <span>{photo.exif_data.iso}</span>}
                  {photo.exif_data.focal && <span>{photo.exif_data.focal}</span>}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {photos.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground text-sm">
            No photos found in the archive.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
