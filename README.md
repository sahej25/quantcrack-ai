# QuantCrack AI — Basic MVP v2

A responsive CAT Quant practice site with topic practice, difficulty filters, bookmarks, a mixed mini mock test, explanations, and local progress tracking. This is an original learning project inspired by general exam-prep patterns; it does not use Cracku branding or proprietary code.

## Run locally
1. Extract this ZIP.
2. Open `index.html` in your browser.
3. Select a topic and practise.

No dependencies, API keys, or build process are required.

## Deploy as a public website
This is a static site. A simple option:
1. Create a GitHub repository and upload `index.html`, `styles.css`, and `app.js` to its root.
2. In Vercel, import that repository.
3. Use the default settings; no build command is required for this plain static site.
4. Deploy and test the generated public URL on mobile and desktop.

You must sign in to GitHub/Vercel and perform the deploy action yourself; this package does not publish to an account automatically.

## MVP limitations
- Progress and bookmarks are stored in browser localStorage, not a cloud database.
- Mock-test timer is not yet enforced separately; topic practice has a countdown timer.
- The question set is small and should be reviewed and expanded before public/paid use.
- No authentication or payment integration yet.


## Version 3 improvements
- Includes a real 12-minute countdown for the mini mock test.
- Automatically submits the mock when time expires.
- Highlights the final minute and improves keyboard focus visibility.
- Upload all three matching files (`index.html`, `styles.css`, and `app.js`) together to avoid version mismatch.
