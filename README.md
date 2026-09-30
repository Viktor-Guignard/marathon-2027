# Stride · Marathon 2027

Tableau de bord de préparation sportive en français. La séance affichée à la première ouverture est un exemple fictif. Sans compte cloud configuré, les données restent dans le navigateur. Avec Supabase configuré et une connexion par e-mail, elles sont synchronisées entre appareils dans un espace privé.

## Lancer

```sh
pnpm install
pnpm dev
```

Puis ouvrir http://localhost:3000. Node.js 20+ est recommandé.

## Vérifications

```sh
pnpm typecheck
pnpm build
```

## Organisation

- `app/` : pages Next.js (dashboard, entraînement, plan, sorties longues, analyse, objectifs)
- `components/AppShell.tsx` : navigation et écrans de l’application
- `lib/calculations/` : calculs partagés (allure, charge, progression, dates)
- `lib/storage/` : données initiales et adaptateur LocalStorage
- `types/` : types TypeScript

## Activer la synchronisation privée

1. Créer un projet Supabase et exécuter [`supabase/schema.sql`](supabase/schema.sql) dans l’éditeur SQL.
2. Dans les réglages d’authentification Supabase, autoriser les liens e-mail (magic link) et ajouter l’URL du site GitHub Pages aux URL de redirection : `https://viktor-guignard.github.io/marathon-2027/`.
3. Dans GitHub, ouvrir **Settings → Secrets and variables → Actions → Variables** et créer `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` depuis les réglages API du projet Supabase.
4. Relancer le déploiement GitHub Pages. Ouvrir le site, choisir **Activer la synchro** et utiliser le lien envoyé par e-mail.

La clé `anon` est prévue pour le navigateur ; la protection repose sur les règles RLS de `supabase/schema.sql`. Ne jamais placer la clé `service_role` dans GitHub Pages. Le stockage local du navigateur sert de copie de secours et de fonctionnement hors ligne.
