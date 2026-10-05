# Collective Futures — Codex adjustments

Static client-side SPA prepared for Vercel.

## Routes

English (default):
- `/`
- `/guideline`
- `/principles-extended`
- `/resources`

Portuguese:
- `/pt`
- `/pt/guideline`
- `/pt/principles-extended`
- `/pt/resources`

## Local preview

```powershell
npx serve .
```

## Production deploy

```powershell
npx vercel --prod
```

## Structure

- `src/app.js`: pages and routing
- `src/components.js`: reusable UI and ASCII hero
- `src/data.js`: locale routing and UI labels
- `src/content-en.js`: English content
- `src/content-pt.js`: Portuguese content
- `styles/main.css`: complete visual system
- `assets/`: local logo/favicon/poster/hero assets
