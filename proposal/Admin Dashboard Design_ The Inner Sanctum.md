# **Admin Dashboard Design: The Inner Sanctum**

Dokumen ini merinci konsep, fitur, dan spesifikasi teknis untuk pusat kendali portofolio "The Silent Architect's Grimoire".

## **1\. Konsep Visual: "Obsidian Analytics"**

Berbeda dengan halaman publik yang abstrak, Dashboard ini lebih mengutamakan **Struktur & Utilitas**, namun tetap dalam balutan tema *Dark Dungeon*.

* **Interface:** *High-contrast Dark Mode*. Menggunakan latar belakang \#050505 dengan aksen garis tipis (1px) berwarna \#1A2F23 untuk memisahkan antar modul.  
* **Vibe:** Seperti layar monitor di dalam bunker rahasia atau ruang kendali *steampunk*.  
* **Interaksi:** Minim animasi dekoratif, lebih banyak transisi *instant* atau *micro-animations* yang memberikan *feedback* teknis.

## **2\. Arsitektur Dashboard (The Control Modules)**

### **A. Nexus Overview (Dashboard Home)**

Ini adalah halaman pertama setelah login. Menampilkan statistik vital sistem.

* **Pulse Metrics:** Jumlah total *Projects*, *Photos*, dan *Unread Messages*.  
* **Database Status:** Indikator kesehatan koneksi Supabase (Latency & Uptime).  
* **Recent Activity:** Log aktivitas terbaru (misal: "New Project 'Dungeon-API' created at 02:45 UTC").

### **B. The Archivist (Project Manager)**

Modul untuk mengelola "Constructs".

* **Table View:** Daftar proyek dengan kolom: *Title*, *Mana Cost*, *Stack*, dan *Status*.  
* **Editor:** Form untuk input metadata proyek. Karena konten utama berada di file MDX, editor ini fokus pada pengelolaan *entry* di database Supabase.  
* **Tech Linker:** UI khusus (seperti *tagging system*) untuk menghubungkan proyek dengan entitas di tabel tech\_stack.

### **C. The Memory Keeper (Photography Manager)**

Modul untuk mengelola "Echoes".

* **Gallery Grid:** Tampilan thumbnail foto-foto yang sudah diunggah.  
* **Magic Upload:** Area *Drag-and-drop* yang terintegrasi langsung dengan **Cloudinary API**. Begitu foto diunggah, sistem otomatis menjalankan library exifr untuk mengisi kolom exif\_data di database.  
* **Category Tagger:** Memindahkan foto antar kategori (Forest, Dungeon, Night, etc).

### **D. Signal Receiver (Message Center)**

Modul untuk membaca pesan yang masuk dari section "Signal" di Home.

* **Inbox Interface:** Desain minimalis mirip terminal. Pesan yang belum dibaca akan memiliki efek *glow* di sekitarnya.  
* **Quick Action:** Tombol untuk menandai pesan sebagai *read*, *archive*, atau menghapusnya.

## **3\. Spesifikasi Teknis & Library Rekomendasi**

Untuk membangun ini dengan cepat namun tetap *high-performance*:

* **UI Framework:** **Shadcn/UI**. Sangat terstruktur, mudah dikustomisasi, dan sangat cocok dengan Next.js.  
* **State Management:** **TanStack Query (React Query)**. Penting untuk menangani *caching* data dari Supabase agar transisi antar halaman dashboard terasa instan.  
* **Form Handling:** **React Hook Form \+ Zod**. Untuk validasi data yang ketat (Backend-minded validation).  
* **Icons:** **Lucide React**. Ikon yang tajam dan minimalis.  
* **Charts:** **Tremor** atau **Recharts**. Jika Anda ingin memvisualisasikan data (misal: tren pesan masuk atau statistik tech stack).

## **4\. Keamanan & Akses (The Gatekeeper)**

Dashboard ini akan berada di rute /sanctum atau /admin dan diproteksi secara berlapis:

1. **Authentication:** Menggunakan **Supabase Auth**. Hanya email Anda yang terdaftar sebagai admin yang bisa masuk.  
2. **Authorization (RLS):** Database secara otomatis menolak semua permintaan INSERT/UPDATE/DELETE dari user yang tidak memiliki role \= 'admin' di tabel profiles.  
3. **Middleware Guard:** Next.js Middleware akan memeriksa sesi user sebelum merender halaman admin. Jika tidak valid, user akan dilempar kembali ke halaman \[./root\].

## **5\. Fitur Eksklusif Admin: "The Command Palette"**

Sebagai seorang *engineer*, Anda mungkin lebih menyukai navigasi cepat via keyboard:

* Implementasi **Command Palette (CMD+K)**.  
* Anda bisa menekan CMD+K lalu mengetik "New Project", "Read Messages", atau "Go to Gallery" untuk berpindah modul secara instan tanpa menyentuh mouse.