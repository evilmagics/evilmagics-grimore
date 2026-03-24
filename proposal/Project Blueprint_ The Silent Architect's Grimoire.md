# **Project Blueprint: The Silent Architect's Grimoire**

**Version:** 1.3 (Final Planning Phase)

**Concept:** Digital Sanctum (Abstract, Dark, High-Performance)

**Target Audience:** Recruiters, Fellow Engineers, and Art Seekers

## **1\. Persona & Filosofi Desain**

Website ini mencerminkan kepribadian seorang *Backend Developer* yang pendiam namun terstruktur, dengan kecintaan pada elemen *fantasy, magic,* dan *nature photography*.

* **The Aesthetic:** "Ancient Tech-Magic".  
* **The UX Strategy:** *Progressive Disclosure*.  
* **The Narrative:** Mengeksplorasi sebuah "Grimoire" digital.

## **2\. Identitas Visual (Atmospheric UI)**

* **Palet Warna:** \#050505 (Base), \#1A2F23 (Surface), \#E0E0E0 (Mist White), \#00E5FF (Mana Glow).  
* **Tipografi:** *Cinzel/Playfair Display* (Headings), *JetBrains Mono* (Technical).

## **3\. Arsitektur Teknologi (Tech Stack)**

* **Runtime:** Bun  
* **Framework:** Next.js 15+ (App Router)  
* **UI/Animations:** Tailwind CSS, Shadcn/UI, Framer Motion, GSAP, Lenis Scroll.  
* **Backend/Storage:** Supabase (Postgres & Auth), Drizzle ORM, Cloudinary.

## **4\. Struktur Halaman & Fitur (Halaman Home)**

### **A. Home (The Summoning Circle)**

* **Hero Section:** Particle system (Spirit Manifest).  
* **Origin (About):** System Manifest (Decryption text).  
* **The Core Essences (Tech Stack):** Hexagonal Rune Grid dengan Dependency Graph.  
* **Constructs Preview:** Architectural Blueprints (3 Proyek Utama).  
* **Echoes Preview:** Cuplikan galeri foto alam dengan Atmospheric Immersion.  
* **Signal (Contact):** Interface CLI/Terminal untuk pengiriman pesan ke Supabase.  
* **System Pulse (Footer):** Bar status minimalis.

### **B. Projects (The Blueprint Vault)**

* List portofolio koding dengan Technical Anatomy (MDX).

### **C. Photography (The Moonlit Gallery)**

*   Galeri foto alam dengan Masonry Layout dan EXIF Metadata otomatis.

## **5\. Konsep Navigasi (The Ley Lines)**

*   \[./evilmagics] (Home), Constructs (Projects), Echoes (Photos), Signal (Contact).

## **6\. Strategi Konten & SEO**

*   **Copywriting:** Menggunakan gaya bahasa "Technical-Mystic". Menjelaskan keahlian backend melalui metafora sihir (misal: *API as Summoning Gate*).  
*   **SEO:** Meta-tags dinamis per halaman proyek menggunakan Next.js generateMetadata.  
*   **Optimization:** Gambar menggunakan format .webp via Cloudinary, *caching* agresif di sisi server.

## **7\. Alur Deployment (CI/CD)**

1. **Repository:** GitHub.  
2. **Deployment:** Vercel (Terintegrasi dengan Bun).  
3. **Database:** Supabase Migration untuk sinkronisasi skema lokal dan production.