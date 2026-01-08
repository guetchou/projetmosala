# Alternative moderne et fiable à un serveur mail auto-hébergé (Postfix, Mailu, etc.)

> **NOTE : Cette solution alternative SMTP est documentée ici et sera réévaluée/implémentée lorsque le projet atteindra 90% d'avancement.**

## 🎯 Objectif
Envoyer des emails transactionnels (inscription, notifications, etc.) depuis une application Node.js/NestJS ou Python **sans déployer de serveur mail complexe**.

---

## 1. Utiliser un service SMTP/API SaaS (Mailgun, SendGrid, Resend, etc.)

### Avantages
- Pas de maintenance serveur mail
- Délivrabilité garantie
- Intégration ultra-simple (Node.js, Python, etc.)
- Gratuit jusqu'à un certain volume

### Fournisseurs recommandés
- [Mailgun](https://www.mailgun.com/)
- [SendGrid](https://sendgrid.com/)
- [Resend](https://resend.com/)
- [Mailjet](https://www.mailjet.com/)
- [Brevo (ex Sendinblue)](https://www.brevo.com/)

---

### Exemple Node.js/NestJS (avec nodemailer)

```js
// npm install nodemailer
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net', // ou smtp.mailgun.org, smtp.resend.com, etc.
  port: 587,
  auth: {
    user: 'apikey', // ou ton user SMTP
    pass: 'TA_CLE_API', // ou ton mot de passe SMTP/API
  },
});

transporter.sendMail({
  from: 'noreply@mosala.local',
  to: 'destinataire@exemple.com',
  subject: 'Test',
  text: 'Ceci est un test.'
});
```

---

### Exemple Python (smtplib)

```python
import smtplib
from email.message import EmailMessage

msg = EmailMessage()
msg['Subject'] = 'Test'
msg['From'] = 'noreply@mosala.local'
msg['To'] = 'destinataire@exemple.com'
msg.set_content('Ceci est un test.')

with smtplib.SMTP('smtp.mailgun.org', 587) as smtp:
    smtp.starttls()
    smtp.login('postmaster@tondomaine.mailgun.org', 'TA_CLE_API')
    smtp.send_message(msg)
```

---

## 2. Pour tester en local : Mailpit (open source)

### Lancer Mailpit en Docker
```bash
docker run -d -p 8025:8025 -p 1025:1025 axllent/mailpit
```
- Configure ton app pour utiliser `smtp://localhost:1025`
- Consulte les emails reçus sur http://localhost:8025

---

## 3. Pourquoi ne pas déployer Postfix/Mailu ?
- Maintenance lourde, sécurité, délivrabilité difficile
- Les solutions SaaS sont gratuites jusqu'à 100-500 emails/jour
- Mailpit est parfait pour le développement local

---

## 4. Liens utiles
- [Nodemailer](https://nodemailer.com/about/)
- [Mailpit](https://github.com/axllent/mailpit)
- [Mailgun Docs](https://documentation.mailgun.com/en/latest/)
- [SendGrid Docs](https://docs.sendgrid.com/)
- [Resend Docs](https://resend.com/docs)

---

**Pour la production : privilégie un service SMTP/API SaaS.**
**Pour le développement : utilise Mailpit.**

---

*Ce fichier remplace toute tentative de déploiement d’un serveur mail complexe dans ce projet.* 