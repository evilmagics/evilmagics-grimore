# Deployment ke Vercel

Runbook ini menyiapkan deploy Next.js ke Vercel dengan pendekatan aman (secret via Vercel Environment Variables, tanpa hard-code credential).

## 1) Prasyarat

- Node.js dan npm sudah terpasang.
- Akun Vercel aktif.
- Proyek ini sudah bisa build lokal dengan `npm run build`.

## 2) Environment Variables

Gunakan template dari `.env.example`, lalu set di Vercel (Project Settings → Environment Variables):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLOUDINARY_UPLOAD_FOLDER` (opsional, default fallback di kode: `grimoire/projects`)

> Rekomendasi: set untuk semua environment yang relevan (`Production`, `Preview`, `Development`) sesuai kebutuhan.

## 3) Link project ke Vercel (sekali saja)

```bash
npx vercel login
npx vercel link
```

Saat prompt muncul:
- Pilih scope/account yang benar
- Pilih project existing atau buat baru
- Framework akan terdeteksi sebagai Next.js

## 4) Deploy preview

```bash
npx vercel
```

Perintah ini menghasilkan deployment preview URL untuk validasi cepat.

## 5) Deploy production (immutable)

```bash
npx vercel --prod
```

Simpan URL deployment dan deployment ID untuk audit trail.

## 6) Verifikasi pasca deploy

Checklist minimal:
- Halaman publik: `/`, `/projects`, `/gallery`
- Dashboard admin: `/admin`, `/admin/projects`, `/admin/gallery`, `/admin/messages`
- Upload media Cloudinary pada alur admin berjalan normal
- Integrasi Supabase read/write berjalan normal
- Header keamanan aktif sesuai `vercel.json`

## 7) Rollback

### Opsi A: Promote deployment sebelumnya (disarankan)
1. Buka Vercel Dashboard → Project → Deployments
2. Pilih deployment stabil terakhir
3. Klik **Promote to Production**

### Opsi B: Redeploy commit stabil

```bash
git checkout <stable-commit>
npx vercel --prod
```

## 8) Catatan kualitas saat ini

- `npm run build` ✅ berhasil
- `npm run lint` ❌ masih ada error lint yang perlu dibereskan sebelum gate lint diberlakukan ketat di CI
- Next.js memberi warning bahwa konvensi `middleware` sudah deprecated dan dianjurkan migrasi ke `proxy`

## 9) CI/CD (opsional, direkomendasikan)

- Hubungkan repository Git ke Vercel agar deploy preview otomatis tiap Pull Request.
- Aktifkan protection branch + required checks (`lint`, `build`) sebelum merge ke production branch.
- Simpan seluruh secret hanya di Vercel Environment Variables/managed secret store.
