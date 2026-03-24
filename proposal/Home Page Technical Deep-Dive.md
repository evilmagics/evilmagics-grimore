# **Technical Deep-Dive: Main Page (The Summoning Circle)**

This document details the technical implementation for each section of "The Silent Architect's Grimoire" portfolio main page.

## **1. Hero Section: The Spirit Manifest**

* **Engine:** Three.js + React Three Fiber.  
* **Logic:** GPU-based particle system (Compute Shaders).

## **2. Origin Section: The System Manifest**

* **Animation:** Staggered decryption effect using Framer Motion.

## **3. The Core Essences: The Rune Grid**

* **Interaction:** "Mana Resonance" (Glow on hover) and Dependency Graph.

## **4. Constructs Preview: Architectural Blueprints**

* **Graphics:** Static SVG/React Flow for architectural diagrams.

## **5. Echoes Preview: The Fading Memories**

* **Optimization:** Next/Image + Cloudinary. Dynamic UI accent based on `node-vibrant`.

## **6. Signal Section: The Resonance Link (Contact)**

Section to bridge communication between visitors and "The Architect".

* **Visual Concept:** Instead of a standard form, use a minimalist *Command Line Interface (CLI)*. A single line of text input that asks for Subject, then Message, and finally Email.  
* **Technical Implementation:**  
  * **Form Handling:** Using React Hook Form with Zod validation to ensure the data reaching the backend is clean and structured.  
  * **Integration:** Using **Next.js Server Actions** to send data directly to the Supabase Client (`supabase.from('messages').insert([...])`).  
  * **Security:** Simple *Rate Limiting* implementation (e.g., 1 message per minute per IP) to prevent spamming the database.  
  * **Feedback Magic:** Once the message is sent, display a "Sending Signal..." animation that then turns into a glowing "Success" rune.  
* **Dashboard Management:**  
  * Messages will be stored in the `messages` table in Supabase with columns: `id`, `created_at`, `sender_email`, `subject`, `content`, and `status` (unread/read).  
  * You can monitor messages via the **Supabase Dashboard** or create a protected `/admin/signal` page using **Supabase Auth** with exclusive access for your UID.