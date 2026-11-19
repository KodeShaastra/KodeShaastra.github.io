# Portfolio

My portfolio website. It is plain static files (built into `out/`), so it can be hosted free anywhere.

## Where the facts come from

Don't edit `src/data/profile.json` or `public/cv/*.pdf` by hand.
They are made from my one profile file in the Career Hub app:

```bash
cd ~/career-hub
# 1. change src/profile/profile.ts
npm run portfolio      # copies public facts here + makes CV PDFs without my phone number
```

Then check and publish:

```bash
cd ~/portfolio
npm run dev            # look at it on http://localhost:3000
git add -A && git commit -m "Update profile" && git push
```

## Hosting

Set `SITE_URL` to the live address (for example `https://prashant.is-a.dev`) in the host's settings,
so link previews on LinkedIn and WhatsApp show the right picture.

## Checks

```bash
npm run lint && npm run build
```
