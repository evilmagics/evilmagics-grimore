# **Login Page Concept: The Void Threshold**

Dokumen ini merinci konsep kreatif dan teknis untuk halaman autentikasi portofolio "The Silent Architect's Grimoire".

## **1\. Konsep Visual: "The Gate of Aether"**

Halaman ini harus terasa seperti momen sebelum sebuah "Magic Circle" aktif sepenuhnya. Minimalis, namun penuh dengan energi yang tertahan.

* **Background:** Gelap total (\#050505) dengan efek *vignette* yang kuat. Di tengah layar, terdapat kabut tipis (fog) yang bergerak sangat pelan menggunakan *Three.js* atau *Canvas*.  
* **The Portal (Login Card):** Sebuah kotak transparan (Glassmorphism) dengan *border* tipis yang hanya menyala (glow) berwarna perak saat kursor mendekat.  
* **Spirit Guardian:** Siluet transparan harimau atau serigala putih muncul sekilas di latar belakang setiap kali user salah memasukkan *password*, seolah-olah sedang menghalangi penyusup.

## **2\. UX Flow: "The Decryption Ritual"**

Proses login dirancang untuk memberikan sensasi "mengaktifkan sistem kuno".

1. **Initial State:** Layar hanya menampilkan satu baris teks: \[ SYSTEM LOCKED. IDENTIFY YOURSELF \].  
2. **Input Reveal:** Saat user menekan tombol apa saja atau mengklik layar, form login muncul dengan animasi *fade-in* yang halus.  
3. **The Input:** \* **Email:** Muncul dengan label \[ UID \].  
   * **Password:** Saat diketik, karakter yang muncul bukan titik hitam, melainkan simbol rune kecil yang berubah-ubah secara acak sebelum akhirnya tersembunyi.  
4. **Submission:** Tombol login bertuliskan \[ AUTHORIZE \]. Saat diklik, tombol akan "berdenyut" dengan cahaya biru mana selama proses verifikasi.

## **3\. Fitur Keamanan & Detail Teknis**

Sebagai *Backend Developer*, Anda tentu mengutamakan keamanan di balik estetika visual ini.

* **Supabase Auth Integration:** Menggunakan signInWithPassword dari Supabase. Sesi akan dikelola secara aman menggunakan *HttpOnly Cookies* melalui Next.js Middleware.  
* **Brute Force Protection:**  
  * **Rate Limiting:** Menggunakan middleware untuk membatasi percobaan login dari IP yang sama (maksimal 5 kali dalam 15 menit).  
  * **Honeypot Field:** Menambahkan input tersembunyi untuk menjebak bot otomatis yang mencoba melakukan *form-filling*.  
* **Decryption Animation:** Menggunakan library framer-motion untuk efek teks yang "bergetar" jika autentikasi gagal, menyerupai sistem yang sedang mengalami *error* atau penolakan magis.

## **4\. UI Elements (Shadcn/UI Customization)**

* **Inputs:** Tanpa *background*, hanya garis bawah (border-bottom) yang menyala saat aktif.  
* **Loading State:** Alih-alih *spinner*, gunakan garis *progress* horizontal tipis di bagian paling atas layar yang bergerak dari kiri ke kanan dengan warna *Mana Glow*.  
* **Error Message:** Muncul dalam kode status sistem, misalnya: \[ ERROR 403: UNAUTHORIZED ESSENCE DETECTED \].

## **5\. Metadata & SEO**

* **No-Index:** Halaman login ini akan dipasang tag \<meta name="robots" content="noindex, nofollow"\> agar tidak muncul di mesin pencari seperti Google, menjaga kerahasiaan "The Inner Sanctum".