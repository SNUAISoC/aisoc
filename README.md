# AI-SoC Laboratory — Website V2

Public website: https://ssw140414-a11y.github.io/aisoc/

GitHub Pages publishes a static copy of the public website. Edit locally (including the local admin), save the content, and push the source to `main` to rebuild and publish. The online copy has no admin login or content API. See [PAGES.md](PAGES.md) for details.

A polished, responsive public research website and a **completely separate password-protected admin interface** built with Next.js App Router.

## Start locally

Requires Node.js 20+.

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local` to set **both** values. Never use the example values. Generate a session secret, e.g. `openssl rand -hex 32`.

```bash
npm run dev
```

- Public website: http://localhost:3000
- Private management: http://localhost:3000/admin
- The admin link does **not** appear anywhere on the public site.

## Admin functions

- Password authentication using an HMAC-signed, HTTP-only, same-site cookie with 12-hour expiry
- Dashboard; global colors, typography, scale and spacing
- Editable hero, About, contact, recruitment and philosophy copy
- CRUD editing for research, updates, people, publications
- Page visibility toggles; JSON backup and restore
- **Publish changes** writes back to `data/site.json` on the server; the changes then appear for all visitors.

## Hosting and deployment

Deployment files are prepared, but nothing has been published. See [DEPLOYMENT.md](DEPLOYMENT.md) for the Docker server setup, persistent content storage, and the steps to run only when ready.

**Important:** This starter uses `data/site.json` as its server-side storage. The hosting environment MUST provide a **persistent writable filesystem** for that file. It is suitable for a traditional VM/VPS or SNU lab server; **do not rely on this storage on serverless platforms like Vercel**, where the filesystem is generally read-only or ephemeral. For Vercel, use a database such as Postgres/Supabase and migrate the `getSite/saveSite` functions in `lib/site.ts`.

For a public deployment, use HTTPS, a long random admin password, and a long random `SESSION_SECRET`. Back up `data/site.json` regularly. Add rate-limiting to the login endpoint, CSRF protection and audit logs before high-value/large-scale production use; consider SSO and granular access control for multiple admins.

## Content provenance

Initial research areas, lab focus, contact address, and recruitment description are based on the public SNU AI SOC webpage: https://sites.google.com/snu.ac.kr/soc . Person profiles and publications are intentionally left blank pending verification.

Logo: provided by the site owner and stored as `public/aisoc-logo.png`.

## Site routes

`/` public homepage · `/about` · `/research` · `/people` · `/publications` · `/news` · `/contact` · `/admin` management portal.
