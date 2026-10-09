# QuantCrack AI v5 — Supabase Question Manager

This package adds an online admin page at `admin.html`, Supabase-backed questions, and SQL policies. Keep `config.js` with only your Supabase Project URL and publishable/anon key. NEVER place a service_role/secret key in browser code.

## Setup

1. Create a Supabase project at https://supabase.com/dashboard.
2. In Project Settings → API, copy the Project URL and the publishable key (or legacy anon key). Put them in `config.js`.
3. Open SQL Editor → New query, paste and run `supabase-setup.sql`.
4. In Authentication → Users, add a user with your admin email and a strong password. If email confirmation is required, confirm it before signing in.
5. Copy that user's UUID from Authentication → Users. In SQL Editor run:
   `insert into public.question_admins (user_id) values ('PASTE-USER-UUID-HERE');`
6. Upload/replace `index.html`, `styles.css`, `app.js`, `config.js`, `admin.html`, and `admin.js` in the root of your GitHub repo. `supabase-setup.sql` and README may also be uploaded.
7. Wait for Vercel to redeploy. Open `https://YOUR-SITE/admin.html`, sign in, and add/publish questions.

## How it works
- Public practice site fetches published questions from Supabase. If Supabase isn't configured or has no published questions, it falls back to the built-in sample bank.
- Admin page supports adding, editing, publishing/unpublishing, and deleting questions.
- Row-level security limits question mutations to UUIDs manually added to `question_admins` by you in SQL Editor.
- User stats and bookmarks still live in browser localStorage; this only cloud-saves the question bank.
- Keep admin credentials private. The URL isn't secret, and security depends on authentication and database policies.
