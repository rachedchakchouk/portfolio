# Portfolio v1 (archived)

[Français](README.md) · **English**

First version of Rached Chakchouk's portfolio: a five-page static website (HTML, CSS, Bootstrap, jQuery), bilingual
English / French, hosted on Firebase Hosting.

> ⚠️ This version is no longer maintained.
> 👉 Current portfolio: **[rached-chakchouk.netlify.app](https://rached-chakchouk.netlify.app)** — source code in
> [rached-chakchouk-portfolio](https://github.com/rachedchakchouk/rached-chakchouk-portfolio).

## Overview

- Five pages linked by a shared navigation bar: home (`index.html`), about (`about.html`), skills (`skills.html`),
  projects (`projects.html`) and contact (`contact.html`).
- The five pages currently share the same body: a slider (whose text still comes from the original template) and three
  blocks, "Java Spring Boot Development", "Angular Development" and "PostgreSQL / SQL". Only the active menu item and the
  logo change from one page to another.
- Bilingual: the `EN | FR` links add `?lang=en` or `?lang=fr` to the address, and a script at the bottom of each page
  shows the `.lang-en` or `.lang-fr` texts (English by default).
- CV download: `js/cv-download.js` points the "Download CV" / "Télécharger le CV" button to
  `files/Rached_chakchouk_cv_EN.pdf` or `files/Rached_chakchouk_cv_FR.pdf`, depending on the displayed language.

## Tech stack

Versions read from the headers of the files copied into the repository; there is no package manager (no
`package.json`, no `composer.json`).

| Layer | Technology | Version |
|---|---|---|
| Pages | HTML5, CSS3 (`css/style.css`, `css/fonts.css`) | — |
| CSS framework | Bootstrap (`css/bootstrap.css`) | 4.0.0 |
| JavaScript | jQuery, bundled with its plugins in `js/core.min.js` | 3.2.1 |
| Plugins (`js/core.min.js`) | jQuery Migrate · Popper.js · Bootstrap JS · Swiper · WOW · Owl Carousel · RD Navbar | 3.0.0 · 1.11.0 · 4.0.0-beta2 · 3.4.2 · 1.1.3 · 2.2.1 · 2.2.5 |
| Site scripts | `js/script.js` (plugin initialisation), `js/cv-download.js`, language script at the bottom of each page | — |
| Fonts | Google Fonts (PT Serif, Lato, Merriweather, Montserrat); icon fonts in `fonts/` | — |
| Hosting | Firebase Hosting, `rachedportfolio` project | — |
| CI | GitHub Actions: `actions/checkout`, `FirebaseExtended/action-hosting-deploy` | v4 · v0 |

## Repository layout

```text
portfolio/
├── index.html, about.html, skills.html, projects.html, contact.html   # the five pages
├── css/              # bootstrap.css, style.css (template theme), fonts.css
├── js/               # core.min.js (jQuery and plugins), script.js, cv-download.js, html5shiv.min.js, pointer-events.min.js
├── fonts/            # icon fonts (Font Awesome, Material Design Icons…)
├── images/           # images, logos, favicons
├── files/            # CV in English and French (PDF)
├── firebase.json     # Firebase Hosting configuration
├── .firebaserc       # default Firebase project
└── .github/          # preview workflow, Dependabot
```

## Prerequisites

- A recent browser.
- To serve the folder locally: Node.js (`npx serve` command) or Python 3.
- To deploy: the Firebase CLI and access to the `rachedportfolio` Firebase project.

## Running locally

Open `index.html` in a browser, or serve the folder from the repository root:

```bash
npx serve .
```

The site is then available on http://localhost:3000; `serve` strips the extension from addresses (`/about.html`
redirects to `/about`).

With Python, on http://localhost:8000:

```powershell
python -m http.server 8000     # Windows (PowerShell)
```

```bash
python3 -m http.server 8000    # Linux / macOS
```

Add `?lang=fr` to the address to display French, for example http://localhost:8000/?lang=fr.

## Configuration

- No environment variables.
- Language: `lang` URL parameter (`en` by default, or `fr`). The menu links do not pass this parameter on, so moving to
  another page switches back to English.

| File | Content |
|---|---|
| `firebase.json` | `hosting.public`: `.` (the repository root is published); ignored files: `firebase.json`, `**/.*`, `**/node_modules/**`; any address without a matching file is rewritten to `/index.html` |
| `.firebaserc` | default Firebase project: `rachedportfolio` |

## Build, CI and deployment

- No build step: files are published as they are.
- `.github/workflows/firebase-hosting-pull-request.yml` workflow ("Deploy to Firebase Hosting on PR"): triggered by
  pull requests opened from the repository itself. The `build_and_preview` job (ubuntu-latest) checks out the code, then
  runs `FirebaseExtended/action-hosting-deploy@v0`, which publishes a preview to a temporary Firebase Hosting channel and
  posts its address on the PR. Secrets used: `GITHUB_TOKEN` and `FIREBASE_SERVICE_ACCOUNT_RACHEDPORTFOLIO` (Firebase
  service account, to be set in the repository secrets).
- No workflow updates the live site after a merge. Production deployment is done with the Firebase CLI, from the
  repository root:

  ```bash
  npm install -g firebase-tools
  firebase login
  firebase deploy --only hosting
  ```

- **Dependabot** (`.github/dependabot.yml`): GitHub Actions, every Monday at 06:00 (Africa/Tunis), updates grouped into
  a single PR, `deps` prefix, `dépendances` label.

## Security

- Static site with no form and no server-side processing: the PHP contact form (PHPMailer) has been removed from the
  repository.
- The bundled libraries (jQuery 3.2.1; Bootstrap 4.0.0 for the CSS, 4.0.0-beta2 for the JavaScript) have known XSS
  vulnerabilities, fixed in later versions. They are copies inside the repository, so Dependabot does not track them.

## Author

**Rached Chakchouk** — Full Stack Software Engineer (Java / Spring Boot / Angular)
[LinkedIn](https://www.linkedin.com/in/rached-chakchouk) · [Portfolio](https://rached-chakchouk.netlify.app)
