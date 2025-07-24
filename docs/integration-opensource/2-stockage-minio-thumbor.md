# 2. Stockage de fichiers & images : MinIO + Thumbor

## Objectif
Mettre en place un stockage d’objets compatible S3 (MinIO) et un service d’optimisation/redimensionnement d’images (Thumbor).

## Prérequis
- Docker installé
- Accès au backend (NestJS ou FastAPI)

## Procédure détaillée

### 1. Déploiement de MinIO (en local via Docker)
```bash
docker run -d --name minio \
  -p 9000:9000 -p 9001:9001 \
  -e MINIO_ROOT_USER=minioadmin \
  -e MINIO_ROOT_PASSWORD=minioadmin \
  minio/minio server /data --console-address ":9001"
```
- Accéder à http://localhost:9001 (console admin)
- Créer un bucket "mosala-files"

### 2. Déploiement de Thumbor (en local via Docker)
```bash
docker run -d --name thumbor -p 8888:80 apsl/thumbor
```
- Thumbor sera accessible sur http://localhost:8888

### 3. Intégration côté backend
- Installer un SDK S3 compatible (ex : `@aws-sdk/client-s3` pour Node.js)
- Configurer l’endpoint MinIO dans le backend
- Pour les images, générer les URLs Thumbor pour resize/crop à la volée

### 4. Exemple d’upload (Node.js)
```js
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const s3 = new S3Client({
  endpoint: 'http://localhost:9000',
  region: 'us-east-1',
  credentials: { accessKeyId: 'minioadmin', secretAccessKey: 'minioadmin' }
});
await s3.send(new PutObjectCommand({
  Bucket: 'mosala-files',
  Key: 'test.jpg',
  Body: fs.readFileSync('test.jpg')
}));
```

### 5. Exemple d’URL Thumbor
```
http://localhost:8888/unsafe/300x200/smart/filters:format(jpeg)/<URL_IMAGE_MINIO>
```

## Points de vigilance
- Changer les credentials par défaut en production
- Ouvrir les bons ports sur le firewall
- Sécuriser l’accès aux buckets (ACL, policies)

## Liens utiles
- [MinIO Docs](https://min.io/docs/minio/linux/index.html)
- [Thumbor Docs](https://thumbor.readthedocs.io/en/latest/)
- [AWS SDK JS](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/) 