# **Project Blueprint: The Silent Architect's Grimoire**

**Version:** 1.3 (Final Planning Phase)

**Concept:** Digital Sanctum (Abstract, Dark, High-Performance)

**Target Audience:** Recruiters, Fellow Engineers, and Art Seekers

## **1. Persona & Design Philosophy**

This website reflects the personality of a quiet yet structured Backend Developer, with a love for fantasy, magic, and nature photography.

* **The Aesthetic:** "Ancient Tech-Magic".  
* **The UX Strategy:** *Progressive Disclosure*.  
* **The Narrative:** Exploring a digital "Grimoire".

## **2. Visual Identity (Atmospheric UI)**

* **Color Palette:** #050505 (Base), #1A2F23 (Surface), #E0E0E0 (Mist White), #00E5FF (Mana Glow).  
* **Typography:** *Cinzel/Playfair Display* (Headings), *JetBrains Mono* (Technical).

## **3. Tech Stack**

* **Runtime:** Bun  
* **Framework:** Next.js 15+ (App Router)  
* **UI/Animations:** Tailwind CSS, Shadcn/UI, Framer Motion, GSAP, Lenis Scroll.  
* **Backend/Storage:** Supabase (Postgres & Auth), Drizzle ORM, Cloudinary.

## **4. Page Structure & Features**

### **A. Home (The Summoning Circle)**

* **Hero Section:** Particle system (Spirit Manifest).  
* **Origin (About):** System Manifest (Decryption text).  
* **The Core Essences (Tech Stack):** Hexagonal Rune Grid with Dependency Graph.  
* **Constructs Preview:** Architectural Blueprints (3 Main Projects).  
* **Echoes Preview:** Snippets from the nature gallery with Atmospheric Immersion.  
* **Signal (Contact):** CLI/Terminal interface for sending messages to Supabase.  
* **System Pulse (Footer):** Minimalist status bar.

### **B. Projects (The Blueprint Vault)**

* Coding portfolio list with Technical Anatomy (MDX).

### **C. Photography (The Moonlit Gallery)**

* Nature gallery with a Masonry Layout and automatic EXIF Metadata.

## **5. Navigation Concept (The Ley Lines)**

* [./evilmagics] (Home), Constructs (Projects), Echoes (Photos), Signal (Contact).

## **6. Content & SEO Strategy**

* **Copywriting:** Uses a "Technical-Mystic" style. Explains backend expertise through magic metaphors (e.g., *API as Summoning Gate*).  
* **SEO:** Dynamic meta-tags per project page using Next.js `generateMetadata`.  
* **Optimization:** Images using .webp format via Cloudinary, aggressive server-side caching.

## **7. Deployment Flow (CI/CD)**

1. **Repository:** GitHub.  
2. **Deployment:** Vercel (Integrated with Bun).  
3. **Database:** Supabase Migration for synchronizing local and production schemas.