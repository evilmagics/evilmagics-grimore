# **Database Schema: The Core Architecture (Supabase/PostgreSQL)**

This document details the database structure for "The Silent Architect's Grimoire" portfolio, covering entity relationships and security configurations tailored to the existing Home UI.

## **1. Entity Relationship Diagram (ERD) - Relational Logic**

Structurally, this database centers around the `projects` and `photos` entities. The schema is designed to be *extensible* and support high-performance queries with rich metadata.

```mermaid
erDiagram
    profiles ||--o{ projects : authors
    projects }|--|{ tech_stack : utilizes
    photos }|--|| photo_categories : belongs_to
    messages ||--|| users : assigned_to (optional)

    profiles {
        uuid id PK
        string username
        string avatar_url
        string bio
        string role "Admin | Observer"
    }

    projects {
        uuid id PK
        string idx "CONSTRUCT_XXX"
        string title
        string slug
        string summary
        text description
        string mdx_path "Path to MDX file in Git"
        string cover_url
        string cover_gradient "CSS Gradient string"
        integer mana_cost "Complexity Level 1-100"
        string[] tags "System Tags"
        string live_url
        string repo_url
        timestamp created_at
    }

    tech_stack {
        uuid id PK
        string name
        string icon_key "React Icon Name"
        string category "Languages | Frameworks | ..."
        string sub_category "Compiled | Scripting | ..."
    }

    photo_categories {
        uuid id PK
        string name "Forest | Night | etc"
    }

    photos {
        uuid id PK
        string title
        string cloudinary_id
        string image_url
        string gradient "Hologram overlay gradient"
        string aspect "16/9 | 4/3"
        jsonb exif_data "ISO, Shutter, etc"
        uuid category_id FK
        timestamp captured_at
    }

    messages {
        uuid id PK
        string sender_email
        string subject
        text content
        boolean is_read
        string ip_address
        timestamp created_at
    }
```

## **2. Detailed Table Schema**

### **A. Module: Identity & Auth (Profiles)**

While Supabase manages the `auth.users` table, we need a `profiles` table in the `public` schema to store additional information displayed on the frontend.

```sql
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  role TEXT DEFAULT 'observer', -- 'admin' for full access
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
```

### **B. Module: Knowledge (Projects & Tech Stack)**

Projects are defined as "Constructs" within the Grimoire. Uses a junction table for a Many-to-Many relationship between Projects and Technologies.

```sql
CREATE TABLE public.tech_stack (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Languages', 'Frameworks & UI', 'Databases', etc
  sub_category TEXT, -- 'Compiled', 'Fullstack', 'SQL', etc
  icon_key TEXT, -- Component name from react-icons/si or react-icons/fa
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  idx TEXT UNIQUE NOT NULL, -- Example: 'CONSTRUCT_001'
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT,
  description TEXT, -- Deep explanation for detail UI
  mdx_path TEXT, -- Link to MDX file in repository for static content
  cover_url TEXT,
  cover_gradient TEXT, -- Gradient string like 'linear-gradient(...)'
  mana_cost INTEGER DEFAULT 10, -- 1-100 (Difficulty level abstraction)
  tags TEXT[], -- Array of strings for system tags
  live_url TEXT,
  repo_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Junction Table for M2M Relationship
CREATE TABLE public.project_tech (
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  tech_id UUID REFERENCES public.tech_stack(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, tech_id)
);
```

### **C. Module: Memories (Photography)**

The "Echoes" module stores photo metadata rendered as semi-transparent holograms.

```sql
CREATE TABLE public.photo_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL -- 'Forest', 'Night', 'Nature', etc
);

CREATE TABLE public.photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  cloudinary_id TEXT, -- Cloudinary ID
  image_url TEXT, -- Fallback URL
  gradient TEXT, -- Background gradient for default hologram state
  aspect TEXT DEFAULT '4/3', -- Aspect ratio (16/9, 4/3, 1/1)
  exif_data JSONB, -- Stores aperture, shutter, iso, focal data
  category_id UUID REFERENCES public.photo_categories(id),
  featured BOOLEAN DEFAULT false,
  captured_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### **D. Module: Communication (Signals)**

The "Signal" terminal on the Home page transmits messages directly to the database.

```sql
CREATE TABLE public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_email TEXT NOT NULL,
  subject TEXT,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  ip_address TEXT, -- For rate limiting / security audit
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## **3. Security & Row Level Security (RLS)**

As the Admin (The Architect), you have exclusive rights to manipulate data, while visitors are restricted to Read-Only access.

*   **Profiles:**
    *   SELECT: Public (for architect profile info).
    *   UPDATE: Only the profile owner (authenticated).
*   **Projects & Tech Stack (Constructs):**
    *   SELECT: Permitted for everyone (public).
    *   INSERT/UPDATE/DELETE: Only permitted for users with `role = 'admin'`.
*   **Photos (Echoes):**
    *   SELECT: Permitted for everyone (public).
    *   INSERT/UPDATE/DELETE: Only admin.
*   **Messages (Signals):**
    *   INSERT: Permitted for everyone (Anon/Public).
    *   SELECT/UPDATE/DELETE: Only permitted for admin.

## **4. Technical Strategy: Why This Way?**

1.  **JSONB for EXIF:** Photo metadata (ISO, Shutter, Lens) is stored in JSONB because the structure can vary depending on available metadata from the original file, providing flexibility without a rigid column schema.
2.  **MDX Pathing:** Long narrative project content is stored in Git as MDX files. The database only stores pointers (paths), maintaining synchronization between source code and content.
3.  **Mana Cost & IDX:** The use of `mana_cost` (int) and `idx` (string format) reinforces the visual theme of "The Silent Architect", where each project is a construct with a certain energy cost.
4.  **Cover Gradient:** Storing gradient strings directly in the DB allows the frontend to render a unique hologram background for each project without burdening image assets.