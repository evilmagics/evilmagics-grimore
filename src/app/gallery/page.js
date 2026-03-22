import GalleryClient from "./GalleryClient";
import { fetchPhotos, fetchPhotoCategories } from "@/lib/queries";

export default async function GalleryPage() {
  const [photos, categories] = await Promise.all([
    fetchPhotos(),
    fetchPhotoCategories(),
  ]);
  return <GalleryClient photos={photos} categories={categories} />;
}
