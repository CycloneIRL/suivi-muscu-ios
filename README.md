# Suivi muscu : version iPhone (appli web installable)

Même appli que sur Android, mais sous forme de page web que l'on ajoute à l'écran d'accueil. Les séances restent **sur l'iPhone** (aucun compte, aucun serveur).

## Publier (une seule fois)
1. Sur GitHub : **New repository**, nom `suivi-muscu`, **Public**, puis **Create repository**.
2. **uploading an existing file** : glisse tout le contenu de ce dossier (`index.html`, `sw.js`, `pwa.js`, `manifest.webmanifest`, `fonts.css`, le dossier `fonts`, les 4 images `.png`), puis **Commit changes**.
3. **Settings → Pages** : Source = **Deploy from a branch**, Branch = **main**, dossier **/ (root)**, **Save**.
4. Après 1 à 2 minutes, le lien est `https://TON-PSEUDO.github.io/suivi-muscu/`.

## Installer sur un iPhone
1. Ouvrir le lien dans **Safari**.
2. **Partager** (carré avec flèche) puis **Sur l'écran d'accueil** puis **Ajouter**.
3. Ouvrir l'appli depuis l'**icône** (pas depuis Safari). Faire ça **avant** de saisir des séances : l'icône et Safari ont chacun leurs propres données.

## Mettre à jour
Remplacer **uniquement `index.html`** dans le dépôt (Add file, Upload files, Commit). Sur l'iPhone, la nouvelle version apparaît au 2e lancement de l'appli.

## À savoir
- Fonctionne sans réseau après la première ouverture.
- Exporter de temps en temps (Réglages, Données) : c'est la seule copie de secours. Désinstaller l'icône efface les séances.
