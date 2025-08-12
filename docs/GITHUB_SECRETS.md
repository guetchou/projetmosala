# 🔐 Configuration des Secrets GitHub

Ce guide vous explique comment configurer les secrets GitHub nécessaires pour le CI/CD de Mosala.

## 📋 Secrets Requis

### 🔑 Secrets Obligatoires

#### `DOCKER_USERNAME`
- **Description** : Nom d'utilisateur Docker Hub
- **Où l'obtenir** : Créez un compte sur [Docker Hub](https://hub.docker.com)
- **Format** : Texte simple (ex: `monnomutilisateur`)

#### `DOCKER_PASSWORD`
- **Description** : Token d'accès Docker Hub
- **Où l'obtenir** : 
  1. Connectez-vous à [Docker Hub](https://hub.docker.com)
  2. Allez dans **Account Settings** → **Security**
  3. Cliquez sur **New Access Token**
  4. Donnez un nom (ex: "GitHub CI/CD")
  5. Copiez le token généré
- **Format** : Token long (ex: `dckr_pat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

### 🔑 Secrets Optionnels (Déploiement automatique)

#### `SSH_PRIVATE_KEY`
- **Description** : Clé SSH privée pour se connecter au serveur de production
- **Où l'obtenir** : 
  1. Générez une clé SSH : `ssh-keygen -t rsa -b 4096 -C "github-ci@mosala"`
  2. Copiez le contenu de `~/.ssh/id_rsa`
- **Format** : Contenu complet de la clé privée (avec les lignes `-----BEGIN OPENSSH PRIVATE KEY-----`)

#### `SERVER_HOST`
- **Description** : Adresse IP ou domaine du serveur de production
- **Format** : IP ou domaine (ex: `192.168.1.100` ou `mosala.example.com`)

#### `SERVER_USER`
- **Description** : Nom d'utilisateur pour la connexion SSH
- **Format** : Nom d'utilisateur (ex: `deploy` ou `root`)

## 🚀 Configuration Automatique

### Prérequis
- GitHub CLI installé : `gh --version`
- Authentifié : `gh auth login`

### Utilisation du script automatique

```bash
# Exécuter le script de configuration
./scripts/setup-github-secrets.sh
```

Le script vous guidera à travers la configuration de tous les secrets.

## 🔧 Configuration Manuelle

### 1. Accéder aux Secrets

1. Allez sur votre repository GitHub
2. Cliquez sur **Settings** (Paramètres)
3. Dans le menu de gauche, cliquez sur **Secrets and variables** → **Actions**

### 2. Ajouter les Secrets

Pour chaque secret :

1. Cliquez sur **New repository secret**
2. Entrez le nom du secret (ex: `DOCKER_USERNAME`)
3. Entrez la valeur du secret
4. Cliquez sur **Add secret**

### 3. Vérifier les Secrets

```bash
# Lister les secrets configurés
gh secret list
```

## 🔍 Vérification

### Test du CI/CD

1. Poussez du code sur la branche `main` ou `develop`
2. Allez dans l'onglet **Actions** de votre repository
3. Vérifiez que le workflow se déclenche correctement

### Logs de Debug

Si le CI/CD échoue, vérifiez :

1. **Docker Hub** : Les secrets `DOCKER_USERNAME` et `DOCKER_PASSWORD` sont corrects
2. **SSH** : La clé SSH est valide et le serveur est accessible
3. **Permissions** : L'utilisateur a les bonnes permissions sur le serveur

## 🛠️ Dépannage

### Erreur "Docker login failed"
- Vérifiez que `DOCKER_USERNAME` et `DOCKER_PASSWORD` sont corrects
- Assurez-vous que le token Docker Hub n'a pas expiré

### Erreur "SSH connection failed"
- Vérifiez que `SSH_PRIVATE_KEY` contient la clé complète
- Vérifiez que `SERVER_HOST` et `SERVER_USER` sont corrects
- Testez la connexion SSH manuellement

### Erreur "Permission denied"
- Vérifiez que l'utilisateur SSH a les permissions nécessaires
- Ajoutez la clé publique au serveur : `ssh-copy-id user@server`

## 🔒 Sécurité

### Bonnes Pratiques

1. **Ne jamais commiter de secrets** dans le code
2. **Utiliser des tokens temporaires** plutôt que des mots de passe
3. **Limiter les permissions** des tokens Docker Hub
4. **Utiliser des clés SSH dédiées** pour le CI/CD
5. **Régulièrement renouveler** les tokens et clés

### Rotation des Secrets

```bash
# Renouveler un secret
gh secret set DOCKER_PASSWORD --body "nouveau_token"

# Supprimer un secret
gh secret delete DOCKER_PASSWORD
```

## 📞 Support

En cas de problème :

1. Vérifiez les logs dans l'onglet **Actions**
2. Testez les connexions manuellement
3. Consultez la documentation GitHub Actions
4. Ouvrez une issue sur le repository

---

**Note** : Les secrets sont chiffrés et ne peuvent pas être lus une fois configurés. En cas de doute, supprimez et recréez le secret.
