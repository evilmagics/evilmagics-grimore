# **Panduan Aset 3D: The Spirit Manifest**

Dokumen ini berisi sumber referensi aset dan langkah teknis untuk mempersiapkan model 3D agar siap digunakan dalam sistem partikel "The Silent Architect".

## **1\. Sumber Aset (Recommended Resources)**

Karena kita membutuhkan siluet yang elegan namun ringan, carilah model dengan kategori **Low-Poly** atau **Sculpt**.

* **Poly Pizza (poly.pizza):** Cari "Wolf" atau "Tiger". Biasanya tersedia dalam format .glb yang sangat bersih.  
* **Sketchfab:** Cari "White Wolf" atau "Spirit Animal". Pastikan lisensinya *Creative Commons* (CC BY).  
* **Quaternius (quaternius.com):** Menyediakan paket hewan "Ultimate Nature Pack" yang memiliki model serigala dan harimau dengan topologi yang sangat baik untuk web.

## **2\. Spesifikasi Aset yang Dibutuhkan**

Untuk mendapatkan efek partikel yang tajam namun tetap *performant*:

* **Format:** .glb atau .gltf (Paling efisien untuk web).  
* **Polygon Count:** Idealnya di bawah 10,000 tris. Karena kita hanya mengambil *vertices*\-nya, kita tidak butuh detail tekstur yang rumit.  
* **Position:** Pastikan model berada di titik koordinat (0,0,0) di Blender sebelum di-export.

## **3\. Workflow Optimasi (Expert Tip)**

Gunakan tool CLI gltf-pipeline untuk mengecilkan ukuran file:

npx gltf-pipeline \-i model.glb \-o spirit\_model.glb \-d

Opsi \-d akan menerapkan kompresi Draco, yang bisa mengecilkan ukuran file hingga 70-90%.

## **4\. Konsep Visual: "The Spirit Glow"**

Jangan gunakan warna solid. Gunakan material dengan *additive blending* pada partikelnya.

* **Color:** \#E0E0E0 (Mist White) dengan sedikit emisi \#00E5FF (Mana Glow).  
* **Texture:** Gunakan gambar lingkaran kecil buram (soft circle) sebagai *alpha map* untuk setiap partikel agar tidak terlihat seperti kotak-kotak kasar.