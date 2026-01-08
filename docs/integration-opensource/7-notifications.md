# 7. Notifications : ntfy, Postal

## Objectif
Permettre l’envoi de notifications push (web/mobile) et d’emails transactionnels via des solutions open source.

## Prérequis
- Docker installé
- Accès au backend (NestJS, FastAPI, etc.)

## Procédure détaillée

### 1. Déploiement de ntfy (notifications push, via Docker)
```bash
docker run -d --name ntfy -p 8081:80 binwiederhier/ntfy
```
- Accéder à http://localhost:8081
- Pour envoyer une notification :
```bash
curl -d "Hello Mosala!" http://localhost:8081/mon-topic
```
- Pour s’abonner à un topic :
  - Naviguer sur http://localhost:8081/mon-topic dans un navigateur ou via l’app mobile ntfy

### 2. Déploiement de Postal (serveur d’emails transactionnels)
- Suivre la doc officielle : https://github.com/postalserver/install-script
- Exemple d’installation rapide :
```bash
curl https://postal.atech.media/install-script/install | sh
```
- Configurer un domaine, un utilisateur, et récupérer les infos SMTP

### 3. Intégration côté backend
- Pour ntfy : envoyer des requêtes HTTP POST depuis le backend pour notifier les utilisateurs
- Pour Postal : configurer un SMTP dans le backend (ex : Nodemailer pour Node.js)

### 4. Exemple d’envoi d’email (Node.js)
```js
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'postal.example.com',
  port: 25,
  auth: { user: 'utilisateur', pass: 'motdepasse' }
});
await transporter.sendMail({
  from: 'noreply@mosala.com',
  to: 'destinataire@exemple.com',
  subject: 'Notification',
  text: 'Votre action a bien été prise en compte.'
});
```

## Points de vigilance
- Sécuriser l’accès à ntfy et Postal (authentification, HTTPS)
- Configurer les quotas et la gestion des spams pour Postal
- Tester la délivrabilité des emails

## Liens utiles
- [ntfy Docs](https://docs.ntfy.sh/)
- [Postal Docs](https://github.com/postalserver/postal)
- [Nodemailer](https://nodemailer.com/about/) 