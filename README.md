# Subscription Tracker

A small personal-use web app for tracking monthly and yearly subscriptions in one place. Single user, single SQLite file, runs locally.

## Stack

- **SvelteKit 2** + **Svelte 5** (runes)
- **SQLite** via `better-sqlite3` — one file (`data.db`) in the project root
- **Drizzle ORM** for schema + migrations
- **Tailwind CSS v4**
- **Node adapter** (so it can be self-hosted or tunneled when remote access is wanted later)

## Features

- List all subscriptions sorted by next billing date
- Estimated total monthly spend (yearly plans normalized to monthly)
- "Due soon" (within 7 days) and "overdue" indicators
- Create / edit / delete via standard server-rendered forms
- Categories and free-form notes per subscription

## Project layout

```
drizzle/                       # generated migrations
src/
  app.css                      # tailwind entry
  app.html
  lib/
    components/
      SubscriptionForm.svelte  # shared create/edit form
    server/
      db.ts                    # drizzle + sqlite connection (auto-migrates on boot)
      schema.ts                # subscriptions table
      validate.ts              # form parsing/validation
      migrate.ts               # CLI migration runner
    utils.ts                   # money/date helpers
  routes/
    +layout.svelte
    +page.svelte               # list view
    +page.server.ts            # load + delete action
    subscriptions/
      new/                     # create form + action
      [id]/edit/               # edit form + action
data.db                        # created on first run (gitignored)
```

## Setup

Requires Node 20+ and npm.

```bash
npm install
npm run db:migrate    # creates data.db and applies migrations
npm run dev           # http://localhost:5173
```

## Usage

1. Open http://localhost:5173.
2. Click **+ New** in the header.
3. Fill in the form:
   - **Name** — e.g. `Netflix`
   - **Amount** + **Currency** — e.g. `15.99` `EUR` (EUR is the default)
   - **Billing cycle** — `monthly` or `yearly`
   - **Next billing date** — date picker
   - **Category** *(optional)* — e.g. `Entertainment`
   - **Notes** *(optional)*
4. Click **Create** — you'll return to the list.
5. The list shows each subscription with its next billing date and how many days away it is. Items due within 7 days are highlighted amber; overdue items are red.
6. Click a subscription's name to edit it, or **Delete** to remove it.
7. The header card shows your estimated monthly spend, with yearly plans divided by 12. Totals are grouped per currency — there is no FX conversion, so each currency you use gets its own subtotal.

### Example

After adding:
- Netflix — €15.99 / monthly
- iCloud — €0.99 / monthly
- JetBrains All Products — €289.00 / yearly
- GitHub Pro — $4.00 / monthly

The header reads:
- **€41.06 / month** (3 subscriptions in EUR — `15.99 + 0.99 + 289.00/12`)
- **$4.00 / month** (1 subscription in USD)

EUR and USD are kept separate because the app doesn't do currency conversion.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with HMR |
| `npm run build` | Build the production server bundle into `build/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | Type-check Svelte + TS |
| `npm run db:generate` | Generate a new Drizzle migration after editing `schema.ts` |
| `npm run db:migrate` | Apply pending migrations to `data.db` |

## Production / remote access

```bash
npm run build
node build
```

The Node adapter outputs a self-contained server in `build/`. Some options for remote access:

- **Tailscale** — keep the app local, reach it from anywhere on your tailnet.
- **Cloudflare Tunnel** — public URL, no port forwarding.
- **Fly.io / Railway / a small VPS** — deploy `build/` and mount a persistent volume for `data.db`.

## Backups

The entire database is the single file `data.db`. To back up, just copy it (the app uses WAL mode, so copying while running is safe; for a guaranteed-consistent snapshot, copy when the server is stopped).

## Modifying the schema

1. Edit `src/lib/server/schema.ts`.
2. Run `npm run db:generate` to produce a new SQL migration in `drizzle/`.
3. Run `npm run db:migrate` to apply it.
