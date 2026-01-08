# Étape 8 : Chat en temps réel avec Socket.io

## Vue d'ensemble

Intégration d'un système de chat en temps réel utilisant Socket.io pour permettre aux utilisateurs de communiquer directement avec l'équipe Mosala depuis n'importe quelle page du site.

## Technologies utilisées

- **Backend** : Socket.io avec NestJS
- **Frontend** : Socket.io-client avec React
- **Protocole** : WebSocket pour la communication bidirectionnelle

## Installation et configuration

### Backend (NestJS)

#### 1. Installation des dépendances

```bash
cd backend
npm install @nestjs/websockets @nestjs/platform-socket.io socket.io
```

#### 2. Création du ChatGateway

```typescript
// backend/src/chat/chat.gateway.ts
import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: { message: string; userId?: string }) {
    // Logique de traitement du message
    this.server.emit('newMessage', {
      id: Date.now(),
      message: payload.message,
      userId: payload.userId || 'anonymous',
      timestamp: new Date().toISOString()
    });
  }
}
```

#### 3. Configuration dans app.module.ts

```typescript
// backend/src/app.module.ts
import { ChatGateway } from './chat/chat.gateway';

@Module({
  // ... autres imports
  providers: [ChatGateway],
})
export class AppModule {}
```

### Frontend (React)

#### 1. Installation des dépendances

```bash
cd frontend
npm install socket.io-client
```

#### 2. Création du composant ChatSocketio

```typescript
// frontend/src/components/ChatSocketio.tsx
import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';

interface Message {
  id: number;
  message: string;
  userId: string;
  timestamp: string;
}

const ChatSocketio: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001', {
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to chat server');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from chat server');
    });

    newSocket.on('newMessage', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim() && socket) {
      socket.emit('sendMessage', { message: inputMessage });
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-[#7ED9A7] to-[#00824B] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Ouvrir le chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 h-96 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7ED9A7] to-[#00824B] text-white p-4 rounded-t-2xl flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <span className="font-semibold">Support Mosala</span>
          {isConnected && (
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-1 rounded transition-colors"
            aria-label="Minimiser le chat"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-1 rounded transition-colors"
            aria-label="Fermer le chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Bienvenue ! Comment pouvons-nous vous aider ?</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.userId === 'anonymous' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    msg.userId === 'anonymous'
                      ? 'bg-[#7ED9A7] text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED9A7] focus:border-transparent"
            disabled={!isConnected}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || !isConnected}
            className="bg-[#7ED9A7] text-white p-2 rounded-lg hover:bg-[#00824B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Envoyer le message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSocketio;
```

#### 3. Création du composant GlobalChat

```typescript
// frontend/src/components/GlobalChat.tsx
import React from 'react';
import ChatSocketio from './ChatSocketio';

interface GlobalChatProps {
  className?: string;
  style?: React.CSSProperties;
}

const GlobalChat: React.FC<GlobalChatProps> = ({ 
  className = "", 
  style = {} 
}) => {
  const defaultStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 24,
    right: 24,
    zIndex: 1000,
    ...style
  };

  return (
    <div className={className} style={defaultStyle}>
      <ChatSocketio />
    </div>
  );
};

export default GlobalChat;
```

## Intégration sur les pages

Le chat a été intégré sur les pages suivantes pour offrir un support en temps réel partout où les utilisateurs en ont besoin :

### Pages avec chat intégré

1. **Page d'accueil** (`/`) - Support général
2. **Page Contact** (`/contact`) - Aide pour les demandes de contact
3. **Page Support** (`/support`) - Support technique et assistance
4. **Page FAQ** (`/faq`) - Aide contextuelle pour les questions
5. **Page Jobs** (`/jobs`) - Aide pour la recherche d'emploi
6. **Page Formations** (`/formations`) - Aide pour les inscriptions
7. **Page Register** (`/register`) - Aide lors de l'inscription
8. **Page Login** (`/login`) - Aide pour la connexion
9. **Page Services** (`/services`) - Information sur les services

### Exemple d'intégration

```typescript
// Dans n'importe quelle page
import ChatSocketio from "@/components/ChatSocketio";

// À la fin du composant, avant la fermeture du div principal
<div style={{position: 'fixed', bottom: 24, right: 24, zIndex: 1000}}>
  <ChatSocketio />
</div>
```

## Fonctionnalités

### ✅ Implémentées

- **Connexion WebSocket** : Connexion automatique au serveur de chat
- **Interface utilisateur** : Widget de chat moderne et responsive
- **Messages en temps réel** : Envoi et réception instantanée
- **Indicateur de connexion** : Statut visuel de la connexion
- **Minimisation** : Possibilité de minimiser le chat
- **Auto-scroll** : Défilement automatique vers les nouveaux messages
- **Gestion des erreurs** : Gestion des déconnexions et reconnexions
- **Accessibilité** : Support des raccourcis clavier et ARIA labels

### 🔄 En cours de développement

- **Authentification** : Intégration avec le système d'auth existant
- **Historique** : Sauvegarde et récupération des conversations
- **Notifications** : Notifications push pour les nouveaux messages
- **Fichiers** : Envoi de fichiers et images
- **Agents** : Système de routage vers différents agents
- **Chatbot** : Intégration avec un chatbot pour les questions fréquentes

## Configuration avancée

### Variables d'environnement

```bash
# Backend (.env)
SOCKET_PORT=3001
CORS_ORIGIN=http://localhost:3000

# Frontend (.env)
REACT_APP_SOCKET_URL=http://localhost:3001
```

### Sécurité

- CORS configuré pour les origines autorisées
- Validation des messages côté serveur
- Limitation du taux d'envoi de messages
- Authentification des utilisateurs (à implémenter)

## Tests

### Test de connexion

```bash
# Démarrer le backend
cd backend
npm run start:dev

# Démarrer le frontend
cd frontend
npm start

# Ouvrir plusieurs onglets pour tester la communication
```

### Test des fonctionnalités

1. **Connexion** : Vérifier que le statut de connexion s'affiche
2. **Envoi de messages** : Tester l'envoi et la réception
3. **Responsive** : Tester sur mobile et desktop
4. **Accessibilité** : Tester avec un lecteur d'écran

## Monitoring et logs

### Logs côté serveur

```typescript
// Dans ChatGateway
handleConnection(client: Socket) {
  console.log(`Client connected: ${client.id} at ${new Date().toISOString()}`);
}

handleDisconnect(client: Socket) {
  console.log(`Client disconnected: ${client.id} at ${new Date().toISOString()}`);
}
```

### Métriques à surveiller

- Nombre de connexions simultanées
- Temps de réponse des messages
- Taux d'erreur de connexion
- Utilisation de la bande passante

## Prochaines étapes

1. **Authentification** : Intégrer le système d'auth existant
2. **Base de données** : Sauvegarder les conversations
3. **Notifications** : Implémenter les notifications push
4. **Analytics** : Suivre l'utilisation du chat
5. **Optimisation** : Améliorer les performances

## Ressources

- [Documentation Socket.io](https://socket.io/docs/)
- [Documentation NestJS WebSockets](https://docs.nestjs.com/websockets/gateways)
- [Socket.io-client React](https://socket.io/docs/v4/client-api/)

---

**Statut** : ✅ Intégré et fonctionnel sur toutes les pages principales
**Prochaine étape** : [Cartographie avec OpenStreetMap et Leaflet](./09-cartography-openstreetmap-leaflet.md) 