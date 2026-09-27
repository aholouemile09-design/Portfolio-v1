# Portfolio de Kossi Edem Emile Aholou

Site en ligne : https://oltavia.com

Un seul site, quatre profils (vue d'ensemble, IA et ML, génie électrique, gestion de projet),
en français et en anglais. Un lien direct ouvre la bonne version : `?profil=electrique&lang=en`.

- Contenu : `src/data/resume.tsx`
- Langue et profil : `src/lib/site.tsx`
- CV : `python cv/generer_cv.py` (Word puis PDF par Word). Les CV publiés dans `public/cv/`
  n'ont pas de numéro de téléphone ; les versions complètes restent hors du dépôt.

Construire le site statique : `pnpm install`, puis `pnpm build` (sortie dans `out/`).
La branche `main` du dépôt contient le site construit, servi par GitHub Pages.

Basé sur le modèle Magic UI Portfolio de Dillion Verma (licence MIT, voir `LICENSE`).
