# Vercel Deployment

This runbook prepares the Next.js deployment to Vercel using a secure approach (secrets via Vercel Environment Variables, no hard-coded credentials).

## 1) Prerequisites

- Node.js and npm installed.
- Active Vercel account.
- Project can be built locally using `npm run build`.

## 2) Environment Variables

Use the template from `.env.example`, then set them in Vercel (Project Settings → Environment Variables):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLOUDINARY_UPLOAD_FOLDER` (optional, default fallback in code: `grimoire/projects`)

> Recommendation: Set these for all relevant environments (`Production`, `Preview`, `Development`) as needed.

## 3) Link Project to Vercel (One-time)

```bash
npx vercel login
npx vercel link
```

When prompts appear:
- Choose the correct scope/account.
- Choose an existing project or create a new one.
- The framework will be detected as Next.js.

## 4) Preview Deployment

```bash
npx vercel
```

This command generates a deployment preview URL for quick validation.

## 5) Production Deployment (Immutable)

```bash
npx vercel --prod
```

Save the deployment URL and deployment ID for the audit trail.

## 6) Post-Deployment Verification

Minimum checklist:
- Public pages: `/`, `/projects`, `/gallery`
- Admin dashboard: `/admin`, `/admin/projects`, `/admin/gallery`, `/admin/messages`
- Cloudinary media upload in the admin flow works normally.
- Supabase read/write integration works normally.
- Security headers are active according to `vercel.json`.

## 7) Rollback

### Option A: Promote Previous Deployment (Recommended)
1. Open Vercel Dashboard → Project → Deployments.
2. Select the last stable deployment.
3. Click **Promote to Production**.

### Option B: Redeploy Stable Commit

```bash
git checkout <stable-commit>
npx vercel --prod
```

## 8) Current Quality Notes

- `npm run build` ✅ Success
- `npm run lint` ❌ Still has lint errors that need to be resolved before enforcing strict lint gates in CI.
- Next.js warning: The `middleware` convention is deprecated; migration to `proxy` is recommended.

## 9) CI/CD (Optional, Recommended)

- Connect the Git repository to Vercel for automatic preview deployments on every Pull Request.
- Enable branch protection + required checks (`lint`, `build`) before merging into the production branch.
- Store all secrets only in Vercel Environment Variables/managed secret store.
