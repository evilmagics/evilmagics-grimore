# **Spesifikasi Teknis: Sub-Halaman Portofolio**

Dokumen ini merinci implementasi teknis untuk halaman List Project dan List Fotografi dalam portofolio "The Silent Architect's Grimoire".

## **1\. The Blueprint Vault (Halaman List Seluruh Project)**

Halaman ini dirancang sebagai arsip digital yang mendalam bagi semua karya teknis Anda.

### **A. The Archivist's Interface (Header & Filter)**

* **Konsep Visual:** Bar pencarian minimalis yang terlihat seperti *input terminal* dengan filter berbasis kategori (Magic/Languages).  
* **Detail Teknis:**  
  * **State Management:** Menggunakan URL Params (Next.js useSearchParams) untuk menyimpan *state* filter agar halaman tetap bisa di-*bookmark* atau dibagikan dengan filter tertentu.  
  * **Fuzzy Search:** Implementasi library Fuse.js di sisi client untuk pencarian cepat pada metadata proyek tanpa perlu melakukan *request* database berulang kali.

### **B. The Relic Grid (List Card)**

* **Konsep Visual:** Kartu-kartu proyek yang tersusun rapi. Saat *hover*, muncul garis-garis "pembuluh darah" (aliran data) yang menghubungkan antar komponen di dalam kartu.  
* **Detail Teknis:**  
  * **Layout:** CSS Grid dengan sistem *responsive columns* (Tailwind grid-cols-1 md:grid-cols-2 lg:grid-cols-3).  
  * **Dynamic Content:** Setiap kartu mengambil metadata dari file MDX (Markdown) menggunakan gray-matter. Metadata mencakup: title, tech\_stack, performance\_metrics, dan complexity\_level.  
  * **Hover Effect:** Menggunakan Framer Motion untuk *layout-id* transition agar saat kartu diklik, ia bisa beralih ke tampilan detail dengan animasi yang mulus.

### **C. Technical Anatomy (Project Detail/Modal)**

* **Konsep Visual:** Dokumentasi teknis yang kaya. Bukan sekadar deskripsi, tapi penjelasan arsitektur.  
* **Detail Teknis:**  
  * **Content Engine:** MDXRemote untuk merender file Markdown menjadi komponen React. Anda bisa menyisipkan diagram interaktif di tengah-tengah teks dokumentasi.  
  * **Code Highlighting:** Menggunakan Rehype-pretty-code dengan tema *Dark/Obsidian* untuk menampilkan blok kode backend (Go/Python) agar terlihat elegan.

## **2\. The Moonlit Gallery (Halaman List Seluruh Fotografi)**

Halaman ini fokus pada imersi visual dan keindahan alam dalam kegelapan.

### **A. The Fog Veil (Header & Transition)**

* **Konsep Visual:** Efek transisi kabut yang menutupi bagian atas galeri, memberikan kesan foto-foto muncul dari balik kegelapan hutan.  
* **Detail Teknis:**  
  * **CSS Masking:** Menggunakan mask-image dengan *linear-gradient* transparan untuk menciptakan efek "kabut" yang menyatu dengan *background* gelap website.  
  * **Parallax:** Judul "Echoes" bergerak sedikit lebih lambat dari konten galeri saat di-*scroll* untuk efek kedalaman.

### **B. The Infinite Memory (Masonry Gallery)**

* **Konsep Visual:** Layout foto yang asimetris (Masonry), memberikan kesan fragmen memori yang tersebar secara artistik.  
* **Detail Teknis:**  
  * **Library:** react-plock atau implementasi kustom menggunakan CSS columns untuk memastikan performa *rendering* tetap ringan.  
  * **Optimasi Gambar:** Integrasi dengan **Cloudinary SDK**. Foto akan dikirim dalam format .webp atau .avif dengan ukuran yang disesuaikan secara otomatis berdasarkan *device* user (srcSet).  
  * **Infinite Scroll:** Menggunakan React Intersection Observer untuk melakukan *lazy loading* batch foto berikutnya hanya saat user mencapai bagian bawah halaman.

### **C. The Soul of the Frame (Light-Box & Metadata)**

* **Konsep Visual:** Saat foto diklik, ia akan tampil penuh. Di sudut bawah, muncul metadata teknis yang terlihat seperti *script* sistem.  
* **Detail Teknis:**  
  * **Dynamic UI:** Mengekstrak warna dominan dari foto menggunakan node-vibrant secara *real-time* untuk mengubah warna *overlay* atau aksen teks metadata.  
  * **EXIF Reader:** Metadata (ISO, Shutter, Aperture) diambil secara otomatis dari file gambar menggunakan library exifr agar Anda tidak perlu menginputnya secara manual ke database.

## **3\. Integrasi Backend (The Core Connection)**

Kedua halaman ini akan terhubung ke **Supabase** sebagai sumber kebenaran data.

* **Proyek:** Disimpan sebagai file .mdx di dalam folder /projects agar mudah dikelola melalui Git (Contentlayer).  
* **Fotografi:** Metadata foto (URL, Caption, Category) disimpan di tabel public.photos di Supabase, sementara file aslinya berada di **Cloudinary** untuk optimasi CDN.