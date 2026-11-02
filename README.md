# Portfolio v1 (archivé)

**Français** · [English](README.en.md)

Première version du portfolio de Rached Chakchouk : un site statique de cinq pages (HTML, CSS, Bootstrap, jQuery),
bilingue anglais / français, hébergé sur Firebase Hosting.

> ⚠️ Cette version n'est plus maintenue.
> 👉 Portfolio actuel : **[rached-chakchouk.netlify.app](https://rached-chakchouk.netlify.app)** — code source dans
> [rached-chakchouk-portfolio](https://github.com/rachedchakchouk/rached-chakchouk-portfolio).

## Aperçu

- Cinq pages reliées par une barre de navigation commune : accueil (`index.html`), à propos (`about.html`),
  compétences (`skills.html`), projets (`projects.html`) et contact (`contact.html`).
- Les cinq pages ont aujourd'hui le même corps : un diaporama (dont le texte vient encore du modèle d'origine) et trois
  blocs « Développement Java Spring Boot », « Développement Angular » et « PostgreSQL / SQL ». Seuls l'élément actif du
  menu et le logo changent d'une page à l'autre.
- Bilingue : les liens `EN | FR` ajoutent `?lang=en` ou `?lang=fr` à l'adresse, et un script placé en bas de chaque
  page affiche les textes `.lang-en` ou `.lang-fr` (anglais par défaut).
- Téléchargement du CV : `js/cv-download.js` fait pointer le bouton « Download CV » / « Télécharger le CV » vers
  `files/Rached_chakchouk_cv_EN.pdf` ou `files/Rached_chakchouk_cv_FR.pdf`, selon la langue affichée.

## Stack technique

Versions lues dans les en-têtes des fichiers copiés dans le dépôt ; il n'y a pas de gestionnaire de paquets (ni
`package.json`, ni `composer.json`).

| Couche | Technologie | Version |
|---|---|---|
| Pages | HTML5, CSS3 (`css/style.css`, `css/fonts.css`) | — |
| Framework CSS | Bootstrap (`css/bootstrap.css`) | 4.0.0 |
| JavaScript | jQuery, regroupé avec ses plugins dans `js/core.min.js` | 3.2.1 |
| Plugins (`js/core.min.js`) | jQuery Migrate · Popper.js · Bootstrap JS · Swiper · WOW · Owl Carousel · RD Navbar | 3.0.0 · 1.11.0 · 4.0.0-beta2 · 3.4.2 · 1.1.3 · 2.2.1 · 2.2.5 |
| Scripts du site | `js/script.js` (initialisation des plugins), `js/cv-download.js`, script de langue en bas de page | — |
| Polices | Google Fonts (PT Serif, Lato, Merriweather, Montserrat) ; polices d'icônes dans `fonts/` | — |
| Hébergement | Firebase Hosting, projet `rachedportfolio` | — |
| CI | GitHub Actions : `actions/checkout`, `FirebaseExtended/action-hosting-deploy` | v4 · v0 |

## Structure du dépôt

```text
portfolio/
├── index.html, about.html, skills.html, projects.html, contact.html   # les cinq pages
├── css/              # bootstrap.css, style.css (thème du modèle), fonts.css
├── js/               # core.min.js (jQuery et plugins), script.js, cv-download.js, html5shiv.min.js, pointer-events.min.js
├── fonts/            # polices d'icônes (Font Awesome, Material Design Icons…)
├── images/           # images, logos, favicons
├── files/            # CV en anglais et en français (PDF)
├── firebase.json     # configuration Firebase Hosting
├── .firebaserc       # projet Firebase par défaut
└── .github/          # workflow de prévisualisation, Dependabot
```

## Prérequis

- Un navigateur récent.
- Pour servir le dossier en local : Node.js (commande `npx serve`) ou Python 3.
- Pour déployer : la CLI Firebase et un accès au projet Firebase `rachedportfolio`.

## Lancement en local

Ouvrez `index.html` dans un navigateur, ou servez le dossier depuis la racine du dépôt :

```bash
npx serve .
```

Le site est alors disponible sur http://localhost:3000 ; `serve` retire l'extension des adresses (`/about.html`
redirige vers `/about`).

Avec Python, sur http://localhost:8000 :

```powershell
python -m http.server 8000     # Windows (PowerShell)
```

```bash
python3 -m http.server 8000    # Linux / macOS
```

Ajoutez `?lang=fr` à l'adresse pour afficher le français, par exemple http://localhost:8000/?lang=fr.

## Configuration

- Aucune variable d'environnement.
- Langue : paramètre d'URL `lang` (`en` par défaut, ou `fr`). Les liens du menu ne transmettent pas ce paramètre :
  changer de page réaffiche l'anglais.

| Fichier | Contenu |
|---|---|
| `firebase.json` | `hosting.public` : `.` (la racine du dépôt est publiée) ; fichiers ignorés : `firebase.json`, `**/.*`, `**/node_modules/**` ; toute adresse sans fichier correspondant est réécrite vers `/index.html` |
| `.firebaserc` | projet Firebase par défaut : `rachedportfolio` |

## Build, CI et déploiement

- Pas d'étape de build : les fichiers sont publiés tels quels.
- Workflow `.github/workflows/firebase-hosting-pull-request.yml` (« Deploy to Firebase Hosting on PR ») : déclenché par
  les pull requests ouvertes depuis le dépôt lui-même. Le job `build_and_preview` (ubuntu-latest) récupère le code puis
  lance `FirebaseExtended/action-hosting-deploy@v0`, qui publie une prévisualisation sur un canal temporaire de Firebase
  Hosting et en donne l'adresse dans la PR. Secrets utilisés : `GITHUB_TOKEN` et `FIREBASE_SERVICE_ACCOUNT_RACHEDPORTFOLIO`
  (compte de service Firebase, à définir dans les secrets du dépôt).
- Aucun workflow ne met à jour le site en ligne après une fusion. La mise en production se fait avec la CLI Firebase,
  depuis la racine du dépôt :

  ```bash
  npm install -g firebase-tools
  firebase login
  firebase deploy --only hosting
  ```

- **Dependabot** (`.github/dependabot.yml`) : actions GitHub, chaque lundi à 06:00 (Africa/Tunis), mises à jour
  regroupées dans une seule PR, préfixe `deps`, label `dépendances`.

## Sécurité

- Site statique, sans formulaire ni traitement côté serveur : le formulaire de contact PHP (PHPMailer) a été retiré du
  dépôt.
- Les bibliothèques intégrées (jQuery 3.2.1 ; Bootstrap 4.0.0 pour le CSS, 4.0.0-beta2 pour le JavaScript) ont des
  failles XSS connues, corrigées dans des versions plus récentes. Ce sont des copies dans le dépôt : Dependabot ne les
  suit pas.

## Auteur

**Rached Chakchouk** — ingénieur logiciel Full Stack (Java / Spring Boot / Angular)
[LinkedIn](https://www.linkedin.com/in/rached-chakchouk) · [Portfolio](https://rached-chakchouk.netlify.app)
