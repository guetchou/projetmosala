# 5. Analytics & logs : Plausible, PostHog, ELK

## Objectif
Mettre en place des outils open source pour mesurer l’usage du site, analyser le comportement utilisateur et centraliser les logs backend.

## Prérequis
- Docker installé
- Accès au frontend (pour analytics)
- Accès au backend (pour logs)

## Procédure détaillée

### 1. Déploiement de Plausible (analytics web, via Docker)
```bash
git clone https://github.com/plausible/hosting plausible-selfhosted
cd plausible-selfhosted
docker compose up -d
```
- Accéder à http://localhost:8000
- Créer un compte admin, ajouter un site (ex : mosala-job-hub)
- Récupérer le script de tracking à intégrer dans le `<head>` du frontend :
```html
<script defer data-domain="monsite.com" src="http://localhost:8000/js/script.js"></script>
```

### 2. Déploiement de PostHog (analytics produit, via Docker)
```bash
docker run -d --name posthog -p 8001:8000 posthog/posthog:latest
```
- Accéder à http://localhost:8001
- Créer un compte, récupérer la clé de projet
- Intégrer le SDK JS dans le frontend :
```bash
npm install posthog-js
```
```js
import posthog from 'posthog-js';
posthog.init('VOTRE_CLÉ', { api_host: 'http://localhost:8001' });
```

### 3. Déploiement de la stack ELK (Elasticsearch, Logstash, Kibana)
```bash
docker network create elk
# Elasticsearch
sudo sysctl -w vm.max_map_count=262144
docker run -d --name elasticsearch --net elk -p 9200:9200 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:8.13.4
# Kibana
docker run -d --name kibana --net elk -p 5601:5601 -e "ELASTICSEARCH_HOSTS=http://elasticsearch:9200" docker.elastic.co/kibana/kibana:8.13.4
```
- Accéder à http://localhost:5601
- Configurer Logstash pour parser les logs backend (voir doc officielle)

## Points de vigilance
- Sécuriser l’accès aux dashboards (Plausible, PostHog, Kibana)
- Ne pas exposer les ports en production sans firewall
- Respecter la vie privée (RGPD) pour l’analytics

## Liens utiles
- [Plausible Docs](https://plausible.io/docs/self-hosting)
- [PostHog Docs](https://posthog.com/docs/self-host)
- [ELK Stack Docs](https://www.elastic.co/guide/en/elastic-stack-get-started/current/get-started-elastic-stack.html) 