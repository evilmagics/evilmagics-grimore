-- Add project image gallery support for constructs
CREATE TABLE IF NOT EXISTS public.project_images (
    id uuid PRIMARY key DEFAULT gen_random_uuid(),
    project_id uuid NOT NULL REFERENCES public.projects (id) ON delete cascade,
    cloudinary_public_id text NOT NULL UNIQUE,
    image_url text NOT NULL,
    secure_url text NOT NULL,
    width integer,
    height integer,
    format text,
    bytes integer,
    alt_text text,
    sort_order integer NOT NULL DEFAULT 0,
    is_primary boolean NOT NULL DEFAULT FALSE,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON public.project_images (project_id);

CREATE INDEX IF NOT EXISTS idx_project_images_project_sort ON public.project_images (project_id, sort_order, created_at);

CREATE UNIQUE INDEX IF NOT EXISTS uq_project_images_single_primary ON public.project_images (project_id)
WHERE
    is_primary = TRUE;