# **Database Schema: The Core Architecture (Supabase/PostgreSQL)**

Dokumen ini merinci struktur database untuk portofolio "The Silent Architect's Grimoire", mencakup relasi antar entitas dan konfigurasi keamanan yang disesuaikan dengan UI Home yang sudah ada.

## **1\. Entity Relationship Diagram (ERD) \- Logika Relasional**

Secara struktural, database ini berpusat pada entitas projects dan photos. Skema dirancang agar bersifat *extensible* dan mendukung performa query yang tinggi dengan metadata yang kaya.

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
        string mdx_path "Path ke file MDX di Git"
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

## **2\. Skema Tabel Detail**

### **A. Modul: Identity & Auth (Profiles)**

Meskipun Supabase mengelola tabel `auth.users`, kita memerlukan tabel `profiles` di schema `public` untuk menyimpan info tambahan yang ditampilkan di frontend.

```sql
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  role TEXT DEFAULT 'observer', -- 'admin' untuk akses penuh
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
```

### **B. Modul: Knowledge (Projects & Tech Stack)**

Proyek didefinisikan sebagai "Constructs" dalam Grimoire. Menggunakan tabel *junction* untuk relasi Many-to-Many antara Proyek dan Teknologi.

```sql
CREATE TABLE public.tech_stack (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Languages', 'Frameworks & UI', 'Databases', etc
  sub_category TEXT, -- 'Compiled', 'Fullstack', 'SQL', etc
  icon_key TEXT, -- Nama component dari react-icons/si atau react-icons/fa
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  idx TEXT UNIQUE NOT NULL, -- Contoh: 'CONSTRUCT_001'
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT,
  description TEXT, -- Penjelasan mendalam untuk UI detail
  mdx_path TEXT, -- Link ke file MDX di repository untuk konten statis
  cover_url TEXT,
  cover_gradient TEXT, -- String gradient seperti 'linear-gradient(...)'
  mana_cost INTEGER DEFAULT 10, -- 1-100 (Abstraksi tingkat kesulitan)
  tags TEXT[], -- Array of strings untuk system tags
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

### **C. Modul: Memories (Photography)**

Modul "Echoes" menyimpan metadata foto yang dirender sebagai hologram semi-transparan.

```sql
CREATE TABLE public.photo_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL -- 'Forest', 'Night', 'Nature', etc
);

CREATE TABLE public.photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  cloudinary_id TEXT, -- ID Cloudinary (jika menggunakan Cloudinary)
  image_url TEXT, -- Cadangan jika tidak menggunakan Cloudinary secara langsung
  gradient TEXT, -- Background gradient untuk default hologram state
  aspect TEXT DEFAULT '4/3', -- Rasio aspek (16/9, 4/3, 1/1)
  exif_data JSONB, -- Menyimpan data aperture, shutter, iso, focal
  category_id UUID REFERENCES public.photo_categories(id),
  featured BOOLEAN DEFAULT false,
  captured_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### **D. Modul: Communication (Signals)**

Terminal "Signal" di Home mentransmisikan pesan langsung ke database.

```sql
CREATE TABLE public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_email TEXT NOT NULL,
  subject TEXT,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  ip_address TEXT, -- Untuk rate limiting / security audit
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## **3\. Keamanan & Row Level Security (RLS)**

Sebagai Admin (Sang Architect), Anda memiliki hak eksklusif untuk memanipulasi data, sementara pengunjung hanya bisa membaca (Read-Only).

*   **Profiles:**
    *   SELECT: Public (untuk info profil architect).
    *   UPDATE: Hanya pemilik profile (authenticated).
*   **Projects & Tech Stack (Constructs):**
    *   SELECT: Diizinkan untuk semua (public).
    *   INSERT/UPDATE/DELETE: Hanya diizinkan untuk user dengan role = 'admin'.
*   **Photos (Echoes):**
    *   SELECT: Diizinkan untuk semua (public).
    *   INSERT/UPDATE/DELETE: Hanya admin.
*   **Messages (Signals):**
    *   INSERT: Diizinkan untuk semua (Anon/Public).
    *   SELECT/UPDATE/DELETE: Hanya diizinkan untuk admin.

## **4\. Technical Strategy: Why This Way?**

1.  **JSONB for EXIF:** Metadata foto (ISO, Shutter, Lensa) disimpan dalam JSONB karena strukturnya bisa bervariasi tergantung metadata yang tersedia dari file asli, memberikan fleksibilitas tanpa skema kolom yang kaku.
2.  **MDX Pathing:** Konten naratif proyek yang panjang disimpan di Git sebagai file MDX. Database hanya menyimpan *pointer* (path), menjaga sinkronisasi antara kode sumber dan konten.
3.  **Mana Cost & IDX:** Penggunaan `mana_cost` (int) dan `idx` (string format) memperkuat tema visual "The Silent Architect", di mana setiap proyek adalah sebuah *construct* dengan biaya energi tertentu.
4.  **Cover Gradient:** Menyimpan string gradient langsung di DB memungkinkan frontend mernder background hologram yang unik untuk setiap proyek tanpa membebani aset gambar.