# 📔 Evilmagics Grimoire

> **The Silent Architect's Portfolio & Archive**

Welcome to the **Grimoire**, a bespoke digital archive and personal portfolio designed with an immersive "dark-mystic" aesthetic. This project serves as a showcase for architectural projects, photography (Echoes), and a centralized command center for content management.

---

## 🏗️ Core Pillars

- **The Threshold (Home)**: A technical deep-dive into the essence of the work, featuring smooth animations and immersive interactions.
- **The Archives (Projects)**: A curated collection of development and design projects.
- **Echoes (Gallery)**: A minimalist photography space capturing moments in high fidelity.
- **The Inner Sanctum (Admin)**: A private dashboard for managing projects, gallery items, and unified messaging.

---

## 🛠️ Tech Stack

### Framework & Language
- **Next.js 16.2.1** (App Router, SSR/Static Generation)
- **React 19**
- **JavaScript**

### Styling & UI
- **Tailwind CSS v4** (Modern utility-first CSS)
- **Framer Motion** (Fluid micro-animations)
- **Shadcn UI** (High-quality accessible components)
- **Lucide React / React Icons** (Comprehensive iconography)

### Backend & Infrastructure
- **Supabase** (Database, Auth, and Real-time updates)
- **Cloudinary** (Media management and CDN for Project/Gallery assets)
- **TanStack Query (v5)** (Efficient data fetching and state management)

### Tools & Validation
- **React Hook Form** + **Zod** (Type-safe form handling)
- **Clsx** & **Tailwind Merge** (Dynamic class management)

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18.x or later recommended)
- **npm** (v10.x or later)
- **Supabase Account** (for database & auth)
- **Cloudinary Account** (for media assets)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/evilmagics-grimore.git
cd evilmagics-grimore
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory (you can use `.env.example` as a template):
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_FOLDER=grimoire/projects
```

### 4. Running the Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

---

## 📦 Deployment

This project is optimized for **Vercel**. For detailed deployment steps, environment variable configuration, and rollback procedures, refer to the [Deployment Guide](DEPLOYMENT_VERCEL.md).

```bash
# Build for production locally
npm run build

# Start production server
npm run start
```

---

## 📂 Project Structure

- `/src/app`: Next.js App Router pages and layouts.
- `/src/components`: UI components (Shadcn + Custom).
- `/src/lib`: Shared libraries (Supabase client, Cloudinary config).
- `/src/utils`: Helper functions and utilities.
- `/supabase`: Database migrations and configuration.
- `/proposal`: Design specifications and concept blueprints.

---

## 📜 License
This project is private and intended for personal use. All rights reserved.
