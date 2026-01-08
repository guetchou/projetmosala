# 8. Chat en temps réel : Socket.io

## Objectif
Permettre la communication en temps réel (chat, notifications live, suivi d’activité) entre utilisateurs via Socket.io.

## Prérequis
- Backend Node.js/NestJS opérationnel
- Frontend React opérationnel

## Procédure détaillée

### 1. Installation côté backend (NestJS ou Node.js)
```bash
npm install socket.io @nestjs/websockets @nestjs/platform-socket.io
```
- Créer un gateway WebSocket dans NestJS :
```ts
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: { user: string, message: string }) {
    this.server.emit('message', data);
  }
}
```
- Ajouter le module dans `app.module.ts`.

### 2. Installation côté frontend (React)
```bash
npm install socket.io-client
```
- Exemple d’utilisation :
```js
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

function Chat() {
  useEffect(() => {
    socket.on('message', (data) => {
      // Afficher le message
    });
    return () => socket.off('message');
  }, []);
  // ...
}
```

### 3. Test et validation
- Lancer le backend et le frontend
- Envoyer un message depuis un client, vérifier la réception en temps réel sur les autres clients

## Points de vigilance
- Bien gérer l’authentification des sockets (JWT, session)
- Gérer la reconnexion automatique côté client
- Limiter le nombre de connexions simultanées (scalabilité)

## Liens utiles
- [Socket.io Docs](https://socket.io/docs/)
- [NestJS Websockets](https://docs.nestjs.com/websockets/gateways) 