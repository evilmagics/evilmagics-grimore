# **Technical Specifications: Portfolio Sub-Pages**

This document details the technical implementation for the Project List and Photography List pages in "The Silent Architect's Grimoire" portfolio.

## **1. The Blueprint Vault (Project List Page)**

This page is designed as a deep digital archive for all your technical work.

### **A. The Archivist's Interface (Header & Filter)**

* **Visual Concept:** A minimalist search bar that looks like a *terminal input* with category-based filters (Magic/Languages).  
* **Technical Details:**  
  * **State Management:** Using URL Params (Next.js `useSearchParams`) to store filter states so the page remains bookmarkable or shareable with specific filters.  
  * **Fuzzy Search:** Implementation of the `Fuse.js` library on the client side for fast searching across project metadata without repeated database requests.

### **B. The Relic Grid (List Card)**

* **Visual Concept:** Organized project cards. On *hover*, "vein-like" lines (data flows) appear, connecting various components within the card.  
* **Technical Details:**  
  * **Layout:** CSS Grid with a responsive column system (Tailwind `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).  
  * **Dynamic Content:** Each card fetches metadata from MDX files using `gray-matter`. Metadata includes: `title`, `tech_stack`, `performance_metrics`, and `complexity_level`.  
  * **Hover Effect:** Using Framer Motion for `layout-id` transitions so that when a card is clicked, it can seamlessly transition to the detail view.

### **C. Technical Anatomy (Project Detail/Modal)**

* **Visual Concept:** Rich technical documentation. Not just a description, but an architectural explanation.  
* **Technical Details:**  
  * **Content Engine:** `MDXRemote` to render Markdown files into React components. You can embed interactive diagrams within the documentation text.  
  * **Code Highlighting:** Using `rehype-pretty-code` with a *Dark/Obsidian* theme for displaying backend code blocks (Go/Python) elegantly.

## **2. The Moonlit Gallery (Photography List Page)**

This page focuses on visual immersion and the beauty of nature in darkness.

### **A. The Fog Veil (Header & Transition)**

* **Visual Concept:** A fog transition effect covering the top of the gallery, giving the impression that photos emerge from behind the forest's darkness.  
* **Technical Details:**  
  * **CSS Masking:** Using `mask-image` with a transparent `linear-gradient` to create a "fog" effect that blends with the website's dark background.  
  * **Parallax:** The title "Echoes" moves slightly slower than the gallery content during scrolling for a sense of depth.

### **B. The Infinite Memory (Masonry Gallery)**

* **Visual Concept:** Asymmetrical photo layout (Masonry), giving the impression of scattered artistic memory fragments.  
* **Technical Details:**  
  * **Library:** `react-plock` or a custom implementation using CSS columns to ensure rendering performance remains lightweight.  
  * **Image Optimization:** Integration with the **Cloudinary SDK**. Photos are delivered in `.webp` or `.avif` formats with sizes automatically adjusted based on the user's device (`srcSet`).  
  * **Infinite Scroll:** Using `react-intersection-observer` to lazy load the next batch of photos only when the user reaches the bottom of the page.

### **C. The Soul of the Frame (Light-Box & Metadata)**

* **Visual Concept:** When a photo is clicked, it expands to full view. In the bottom corner, technical metadata appears, looking like a system script.  
* **Technical Details:**  
  * **Dynamic UI:** Extracting dominant colors from the photo using `node-vibrant` in real-time to change the overlay or metadata text accent colors.  
  * **EXIF Reader:** Metadata (ISO, Shutter, Aperture) is automatically extracted from image files using the `exifr` library, so you don't need to input it manually into the database.

## **3. Backend Integration (The Core Connection)**

Both pages connect to **Supabase** as the source of truth for data.

* **Projects:** Stored as `.mdx` files within the `/projects` folder for easy management via Git (Contentlayer).  
* **Photography:** Photo metadata (URL, Caption, Category) is stored in the `public.photos` table in Supabase, while the original files are hosted on **Cloudinary** for CDN optimization.