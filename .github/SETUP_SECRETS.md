# GitHub Secrets a configurer

Pour activer completement le pipeline `Mosala Quality Gate`, definir dans le depot GitHub:

## Repository variables

- `SONAR_HOST_URL`
  - URL de votre instance SonarQube Server.
  - Exemple: `https://sonar.votre-domaine.tld`

## Repository secrets

- `SONAR_TOKEN`
  - Token technique SonarQube avec droits d'analyse sur les projets:
    - `projetmosala-frontend`
    - `projetmosala-backend`
- `SNYK_TOKEN`
  - Token API Snyk de l'organisation/projet cible.
- `SONAR_ROOT_CERT`
  - Optionnel, uniquement si votre SonarQube est servi avec une chaine TLS non standard.

## Effet du pipeline

- `frontend-quality` bloque sur lint, type-check ou build.
- `api-quality` bloque sur erreur de syntaxe JS.
- `sonar-frontend` et `sonar-api` bloquent si la Quality Gate SonarQube echoue.
- `snyk-frontend` et `snyk-api` echouent si Snyk detecte une vulnerabilite au seuil `high` ou plus.

## Limite restante

Le secret `SNYK_TOKEN` ne peut pas etre injecte depuis ici sans acces a la configuration GitHub/Snyk du depot. Le workflow est pret et attend uniquement ce secret.
