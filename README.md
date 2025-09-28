# Hidden Admin Website (GitHub Pages ready)

This repo contains a simple user-facing page (`index.html`) and a private admin page (`admin.html`) that is intentionally **not linked** from the user page.
Place these files in a GitHub repo and enable Pages (main branch, root).

**Important:** The admin page is only hidden from the UI — it is still accessible if someone knows the URL (`https://your-username.github.io/repo-name/admin.html`). For real security, implement server-side auth.

Files:
- index.html  -> Public user page (no admin link)
- admin.html  -> Admin login page (not linked)
- style.css   -> Styles
- script.js   -> Admin JS (password in client-side; change before publishing)
