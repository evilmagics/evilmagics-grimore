# **Deep-Dive Teknis: Halaman Utama (The Summoning Circle)**

Dokumen ini merinci implementasi teknis untuk setiap section di halaman utama portofolio "The Silent Architect's Grimoire".

## **1\. Hero Section: The Spirit Manifest**

* **Engine:** Three.js \+ React Three Fiber.  
* **Logic:** GPU-based particle system (Compute Shaders).

## **2\. Origin Section: The System Manifest**

* **Animation:** Staggered decryption effect menggunakan Framer Motion.

## **3\. The Core Essences: The Rune Grid**

* **Interaction:** "Mana Resonance" (Glow on hover) dan Dependency Graph.

## **4\. Constructs Preview: Architectural Blueprints**

* **Graphics:** Static SVG/React Flow untuk diagram arsitektur.

## **5\. Echoes Preview: The Fading Memories**

* **Optimization:** Next/Image \+ Cloudinary. Dynamic UI accent berdasarkan node-vibrant.

## **6\. Signal Section: The Resonance Link (Contact)**

Section untuk menjembatani komunikasi antara pengunjung dan "The Architect".

* **Visual Concept:** Alih-alih formulir standar, gunakan *Command Line Interface (CLI)* minimalis. Satu baris input teks yang menanyakan Subject, lalu Message, dan terakhir Email.  
* **Technical Implementation:**  
  * **Form Handling:** Menggunakan React Hook Form dengan validasi Zod untuk memastikan data yang masuk ke backend bersih dan terstruktur.  
  * **Integration:** Menggunakan **Next.js Server Actions** untuk mengirim data langsung ke Supabase Client (supabase.from('messages').insert(\[...\])).  
  * **Security:** Implementasi *Rate Limiting* sederhana (misal: 1 pesan per menit per IP) untuk mencegah *spamming* pada database.  
  * **Feedback Magic:** Setelah pesan terkirim, tampilkan animasi "Sending Signal..." yang kemudian berubah menjadi rune "Success" yang menyala.  
* **Dashboard Management:**  
  * Pesan akan masuk ke tabel messages di Supabase dengan kolom: id, created\_at, sender\_email, subject, content, dan status (unread/read).  
  * Anda bisa memantau pesan melalui **Supabase Dashboard** atau membuat halaman /admin/signal terproteksi menggunakan **Supabase Auth** dengan akses khusus untuk UID Anda.