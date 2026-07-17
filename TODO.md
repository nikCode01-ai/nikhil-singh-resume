# Portfolio TODO - Continue Tomorrow

## Current Status (15 July 2026)

### DONE

- Strapi v5 backend deployed on Render: https://nik-be.onrender.com
- 10 blogs, 4 projects, 6 services seeded in Strapi
- 10 blog images uploaded to Strapi and linked to blog entries
- Frontend Strapi integration: populate=featured_image, full URLs, remotePatterns
- Frontend pushed to Vercel: https://nikhilsingh-eight.vercel.app
- Supabase PostgreSQL connected and working

### BROKEN - Content Manager not opening (CodeMirror crash)

- Strapi admin Content Manager pages crash when opening blog entries
- Known bug: @codemirror/state@6.7.1 has broken instanceof check
- npm overrides in package.json NOT working on Render
- Vite dedupe config in src/admin/vite.config.ts NOT fixing it either

## Files to Modify Tomorrow

### 1. nik_be/package.json - Add postinstall script

Add a postinstall script that force-installs correct codemirror versions after npm install:

```json
"scripts": {
    "postinstall": "npm install @codemirror/state@6.7.0 @codemirror/view@6.43.5 --save-exact || true",
    ...
}
```

### 2. nik_be/render.yaml - Update build command

Current: `rm -rf node_modules package-lock.json .cache dist .strapi && npm install && npm run build`
Need to add codemirror fix step after npm install.

### 3. nik_be/src/admin/vite.config.ts

Already has CodeMirror dedupe config - keep it.

### 4. Check if overrides work

After deploy, open https://nik-be.onrender.com/admin
Login -> Content Manager -> click any Blog entry
If it opens without crash -> fix worked

## Credentials

- Render API Key: rnd_Ar7YNi95RdHUGCyYeMY7Gf2LqYG2
- Render Service ID: srv-d9b50cl8nd3s73a6a5g0
- GitHub Backend Repo: https://github.com/nikCode01-ai/nik_be.git
- Strapi API Token: 85d6c2fb756ba2668210db90c15d1352b42b67f4e4cf48b0f3a1539397d20efb0196194d6c979e2211c9d8ac8164bbb096bd0aa71a79dc084082fbe842fcfa013f608cc066aa0516b805a360c1d4a5385addebc69975e811f593bc1a11b7304d2eef930fc884c3c324ecb96f09a1b3b1635ec337d1b5c3c0d5d134a55e0db6e4
- Supabase DB: postgresql://postgres.T%40_p%2Fp6hSiS2bg7@db.ujqsoynvhcxilgnyvrzb.supabase.co:5432/postgres
- Deploy trigger: POST https://api.render.com/v1/services/srv-d9b50cl8nd3s73a6a5g0/deploys with Authorization Bearer rnd_Ar7YNi95RdHUGCyYeMY7Gf2LqYG2

## Blog Image Mapping (all working)

| Slug                                             | Image File                    | File ID |
| ------------------------------------------------ | ----------------------------- | ------- |
| building-ai-powered-fullstack-apps-nextjs-nodejs | ai-fullstack-roadmap-2026.png | 1       |
| real-time-airline-booking-ndc                    | flightbooking.png             | 2       |
| nextjs-event-platform-flight-booking             | panamakosherfest.png          | 3       |
| optimizing-content-platform-performance          | businessmatters.png           | 4       |
| react-performance-optimization-techniques        | ultimatesportstrainer.png     | 5       |
| nodejs-microservices-architecture                | muffleit.png                  | 6       |
| nextjs-14-app-router-guide                       | invitationstreet.png          | 7       |
| database-optimization-techniques                 | agrosafpharmaceuticals.png    | 8       |
| websockets-real-time-applications                | dreamyinvites.png             | 9       |
| tailwindcss-advanced-techniques                  | laladecorators.png            | 10      |

## Git History (nik_be)

- 9ddfb3d fix: force clean install on Render + rename image to featured_image
- 922868b fix: pin CodeMirror to 6.7.0/6.43.5 and add Vite dedupe
- 09daff0 fix: remove seed.ts causing build failure
- fae636c feat: add public API permissions + seed script
- 0e2ed2b fix: force sslmode=no-verify + NODE_TLS_REJECT_UNAUTHORIZED=0
