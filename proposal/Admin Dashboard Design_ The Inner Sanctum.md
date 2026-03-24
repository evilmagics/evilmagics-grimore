# **Admin Dashboard Design: The Inner Sanctum**

This document details the concepts, features, and technical specifications for the control center of "The Silent Architect's Grimoire" portfolio.

## **1. Visual Concept: "Obsidian Analytics"**

Unlike the abstract public pages, this Dashboard prioritizes **Structure & Utility**, while still wrapped in a *Dark Dungeon* theme.

* **Interface:** *High-contrast Dark Mode*. Uses a #050505 background with thin (1px) #1A2F23 lines to separate modules.  
* **Vibe:** Like a monitor screen inside a secret bunker or a *steampunk* control room.  
* **Interaction:** Minimal decorative animation, focusing on *instant* transitions or technical *micro-animations* for feedback.

## **2. Dashboard Architecture (The Control Modules)**

### **A. Nexus Overview (Dashboard Home)**

This is the landing page after login, displaying vital system statistics.

* **Pulse Metrics:** Total number of *Projects*, *Photos*, and *Unread Messages*.  
* **Database Status:** Healthy Supabase connection indicator (Latency & Uptime).  
* **Recent Activity:** Latest activity log (e.g., "New Project 'Dungeon-API' created at 02:45 UTC").

### **B. The Archivist (Project Manager)**

Module for managing "Constructs".

* **Table View:** List of projects with columns: *Title*, *Mana Cost*, *Stack*, and *Status*.  
* **Editor:** Form for inputting project metadata. Since the main content resides in MDX files, this editor focuses on managing entries in the Supabase database.  
* **Tech Linker:** Specialized UI (like a *tagging system*) to link projects with entities in the `tech_stack` table.

### **C. The Memory Keeper (Photography Manager)**

Module for managing "Echoes".

* **Gallery Grid:** Thumbnail view of uploaded photos.  
* **Magic Upload:** *Drag-and-drop* area directly integrated with the **Cloudinary API**. Once a photo is uploaded, the system automatically runs the `exifr` library to populate the `exif_data` columns in the database.  
* **Category Tagger:** Move photos between categories (Forest, Dungeon, Night, etc).

### **D. Signal Receiver (Message Center)**

Module for reading incoming messages from the "Signal" section on the Home page.

* **Inbox Interface:** Minimalist design resembling a terminal. Unread messages will have a *glow* effect around them.  
* **Quick Action:** Buttons to mark messages as *read*, *archive*, or delete them.

## **3. Technical Specifications & Recommended Libraries**

To build this quickly yet maintain *high-performance*:

* **UI Framework:** **Shadcn/UI**. Highly structured, easily customizable, and perfectly suited for Next.js.  
* **State Management:** **TanStack Query (React Query)**. Essential for handling data *caching* from Supabase so that transitions between dashboard pages feel instant.  
* **Form Handling:** **React Hook Form + Zod**. For strict data validation (Backend-minded validation).  
* **Icons:** **Lucide React**. Sharp and minimalist icons.  
* **Charts:** **Tremor** or **Recharts**. If you wish to visualize data (e.g., incoming message trends or tech stack statistics).

## **4. Security & Access (The Gatekeeper)**

The dashboard will be located at the `/sanctum` or `/admin` routes and protected with multiple layers:

1. **Authentication:** Using **Supabase Auth**. Only your registered email as an admin can gain access.  
2. **Authorization (RLS):** The database automatically rejects all INSERT/UPDATE/DELETE requests from users who do not have `role = 'admin'` in the `profiles` table.  
3. **Middleware Guard:** Next.js Middleware will check the user session before rendering admin pages. If invalid, the user will be redirected back to the [./evilmagics] home page.

## **5. Exclusive Admin Feature: "The Command Palette"**

As an *engineer*, you might prefer fast navigation via keyboard:

* Implementation of **Command Palette (CMD+K)**.  
* You can press CMD+K and type "New Project", "Read Messages", or "Go to Gallery" to switch modules instantly without touching the mouse.