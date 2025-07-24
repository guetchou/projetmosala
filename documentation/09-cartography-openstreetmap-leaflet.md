# Étape 9 : Cartographie avec OpenStreetMap et Leaflet

## Vue d'ensemble

Intégration d'un système de cartographie interactif utilisant OpenStreetMap (données cartographiques gratuites) et Leaflet (bibliothèque JavaScript open source) pour afficher les emplois, formations et services Mosala sur une carte interactive.

## Technologies utilisées

- **OpenStreetMap** : Données cartographiques gratuites et open source
- **Leaflet** : Bibliothèque JavaScript pour cartes interactives
- **React-Leaflet** : Wrapper React pour Leaflet
- **Nominatim** : Service de géocodage gratuit d'OpenStreetMap

## Cas d'usage Mosala

1. **Carte des emplois** : Localisation des offres d'emploi
2. **Carte des formations** : Centres de formation et lieux de stage
3. **Carte des services** : Bureaux Mosala et partenaires
4. **Géolocalisation** : Trouver les opportunités près de chez soi
5. **Itinéraires** : Calcul d'itinéraires vers les lieux

## Installation et configuration

### Frontend (React)

#### 1. Installation des dépendances

```bash
cd frontend
npm install leaflet react-leaflet @types/leaflet
```

#### 2. Installation des styles CSS

```bash
npm install leaflet/dist/leaflet.css
```

#### 3. Création du composant MapComponent

```typescript
// frontend/src/components/MapComponent.tsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix pour les icônes Leaflet avec React
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface Location {
  id: string;
  name: string;
  type: 'job' | 'formation' | 'service' | 'office';
  position: [number, number]; // [latitude, longitude]
  description: string;
  address: string;
  contact?: string;
  website?: string;
}

interface MapComponentProps {
  locations: Location[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  showSearch?: boolean;
  showFilters?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({
  locations,
  center = [-4.2634, 15.2429], // Brazzaville par défaut
  zoom = 10,
  height = '500px',
  showSearch = true,
  showFilters = true
}) => {
  const [filteredLocations, setFilteredLocations] = useState<Location[]>(locations);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Icônes personnalisées par type
  const getIcon = (type: string) => {
    const iconSize = [25, 41];
    const iconAnchor = [12, 41];
    
    const colors = {
      job: '#7ED9A7',
      formation: '#FFD93D',
      service: '#FF6B35',
      office: '#00824B'
    };

    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 7.9 12.5 28.5 12.5 28.5s12.5-20.6 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="${colors[type] || colors.office}"/>
          <circle cx="12.5" cy="12.5" r="6" fill="white"/>
        </svg>
      `)}`,
      iconSize,
      iconAnchor,
      popupAnchor: [0, -41]
    });
  };

  // Filtrage des locations
  useEffect(() => {
    let filtered = locations;
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(loc => loc.type === selectedType);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(loc => 
        loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredLocations(filtered);
  }, [locations, selectedType, searchTerm]);

  return (
    <div className="w-full">
      {/* Contrôles de recherche et filtres */}
      {(showSearch || showFilters) && (
        <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-4">
            {showSearch && (
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Rechercher un lieu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ED9A7] focus:border-transparent"
                />
              </div>
            )}
            
            {showFilters && (
              <div className="flex gap-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7ED9A7] focus:border-transparent"
                >
                  <option value="all">Tous les types</option>
                  <option value="job">Emplois</option>
                  <option value="formation">Formations</option>
                  <option value="service">Services</option>
                  <option value="office">Bureaux</option>
                </select>
              </div>
            )}
          </div>
          
          <div className="mt-2 text-sm text-gray-600">
            {filteredLocations.length} lieu(x) trouvé(s)
          </div>
        </div>
      )}

      {/* Carte */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height, width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredLocations.map((location) => (
            <Marker
              key={location.id}
              position={location.position}
              icon={getIcon(location.type)}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg text-[#00824B] mb-2">
                    {location.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {location.description}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    📍 {location.address}
                  </p>
                  {location.contact && (
                    <p className="text-sm text-gray-500 mb-1">
                      📞 {location.contact}
                    </p>
                  )}
                  {location.website && (
                    <a
                      href={location.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#7ED9A7] hover:underline"
                    >
                      🌐 Visiter le site
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;
```

#### 4. Création du composant InteractiveMap3D

```typescript
// frontend/src/components/InteractiveMap3D.tsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import { motion } from 'framer-motion';

interface MapData {
  id: string;
  name: string;
  type: 'job' | 'formation' | 'service';
  position: [number, number];
  description: string;
  salary?: string;
  duration?: string;
  radius?: number;
}

const InteractiveMap3D: React.FC = () => {
  const [mapData, setMapData] = useState<MapData[]>([
    {
      id: '1',
      name: 'Développeur Full Stack',
      type: 'job',
      position: [-4.2634, 15.2429],
      description: 'Poste de développeur à Brazzaville',
      salary: '2 000 000 - 3 000 000 FCFA',
      radius: 5000
    },
    {
      id: '2',
      name: 'Formation Marketing Digital',
      type: 'formation',
      position: [-4.2634, 15.2429],
      description: 'Formation certifiante en marketing digital',
      duration: '6 semaines',
      radius: 3000
    },
    {
      id: '3',
      name: 'Bureau Mosala Brazzaville',
      type: 'service',
      position: [-4.2634, 15.2429],
      description: 'Siège principal de Mosala',
      radius: 2000
    }
  ]);

  const [selectedType, setSelectedType] = useState<string>('all');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Géolocalisation de l'utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.log('Erreur de géolocalisation:', error);
        }
      );
    }
  }, []);

  const getIcon = (type: string) => {
    const colors = {
      job: '#7ED9A7',
      formation: '#FFD93D',
      service: '#FF6B35'
    };

    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="12" fill="${colors[type]}" stroke="white" stroke-width="2"/>
          <text x="15" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
            ${type === 'job' ? '💼' : type === 'formation' ? '🎓' : '🏢'}
          </text>
        </svg>
      `)}`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  };

  const filteredData = selectedType === 'all' 
    ? mapData 
    : mapData.filter(item => item.type === selectedType);

  return (
    <div className="w-full h-full">
      {/* Contrôles */}
      <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedType === 'all'
                  ? 'bg-[#7ED9A7] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setSelectedType('job')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedType === 'job'
                  ? 'bg-[#7ED9A7] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              💼 Emplois
            </button>
            <button
              onClick={() => setSelectedType('formation')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedType === 'formation'
                  ? 'bg-[#FFD93D] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🎓 Formations
            </button>
            <button
              onClick={() => setSelectedType('service')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedType === 'service'
                  ? 'bg-[#FF6B35] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🏢 Services
            </button>
          </div>
          
          {userLocation && (
            <div className="text-sm text-gray-600">
              📍 Votre position détectée
            </div>
          )}
        </div>
      </div>

      {/* Carte 3D */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <MapContainer
          center={userLocation || [-4.2634, 15.2429]}
          zoom={12}
          style={{ height: '600px', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Marqueur de position utilisateur */}
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>
                <div className="text-center">
                  <div className="text-lg">📍</div>
                  <div className="font-semibold">Votre position</div>
                </div>
              </Popup>
            </Marker>
          )}
          
          {/* Marqueurs des données */}
          {filteredData.map((item) => (
            <div key={item.id}>
              <Marker
                position={item.position}
                icon={getIcon(item.type)}
              >
                <Popup>
                  <div className="p-3 min-w-[250px]">
                    <h3 className="font-bold text-lg text-[#00824B] mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {item.description}
                    </p>
                    
                    {item.salary && (
                      <div className="mb-2">
                        <span className="font-semibold text-[#7ED9A7]">
                          💰 Salaire :
                        </span>
                        <span className="text-sm ml-2">{item.salary}</span>
                      </div>
                    )}
                    
                    {item.duration && (
                      <div className="mb-2">
                        <span className="font-semibold text-[#FFD93D]">
                          ⏱️ Durée :
                        </span>
                        <span className="text-sm ml-2">{item.duration}</span>
                      </div>
                    )}
                    
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <button className="w-full bg-[#7ED9A7] text-white py-2 px-4 rounded-lg hover:bg-[#00824B] transition-colors">
                        Voir les détails
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
              
              {/* Cercle de rayon */}
              {item.radius && (
                <Circle
                  center={item.position}
                  radius={item.radius}
                  pathOptions={{
                    color: item.type === 'job' ? '#7ED9A7' : 
                           item.type === 'formation' ? '#FFD93D' : '#FF6B35',
                    fillColor: item.type === 'job' ? '#7ED9A7' : 
                              item.type === 'formation' ? '#FFD93D' : '#FF6B35',
                    fillOpacity: 0.1,
                    weight: 2
                  }}
                />
              )}
            </div>
          ))}
        </MapContainer>
      </motion.div>
    </div>
  );
};

export default InteractiveMap3D;
```

#### 5. Service de géocodage

```typescript
// frontend/src/services/geocoding.ts
export interface GeocodingResult {
  lat: number;
  lon: number;
  display_name: string;
  type: string;
}

export class GeocodingService {
  private static baseUrl = 'https://nominatim.openstreetmap.org';

  static async searchLocation(query: string): Promise<GeocodingResult[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=cg`
      );
      
      if (!response.ok) {
        throw new Error('Erreur de géocodage');
      }
      
      const data = await response.json();
      return data.map((item: any) => ({
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        display_name: item.display_name,
        type: item.type
      }));
    } catch (error) {
      console.error('Erreur de géocodage:', error);
      return [];
    }
  }

  static async reverseGeocode(lat: number, lon: number): Promise<GeocodingResult | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18`
      );
      
      if (!response.ok) {
        throw new Error('Erreur de géocodage inverse');
      }
      
      const data = await response.json();
      return {
        lat: parseFloat(data.lat),
        lon: parseFloat(data.lon),
        display_name: data.display_name,
        type: data.type
      };
    } catch (error) {
      console.error('Erreur de géocodage inverse:', error);
      return null;
    }
  }

  static async getDistance(lat1: number, lon1: number, lat2: number, lon2: number): Promise<number> {
    const R = 6371; // Rayon de la Terre en km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private static deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }
}
```

## Intégration dans les pages

### 1. Page Jobs avec carte

```typescript
// frontend/src/pages/Jobs.tsx
// Ajouter l'import
import MapComponent from '@/components/MapComponent';

// Ajouter les données de localisation
const jobLocations = [
  {
    id: 'job-1',
    name: 'Spécialiste Marketing Digital',
    type: 'job' as const,
    position: [-4.2634, 15.2429], // Brazzaville
    description: 'Développez et exécutez des stratégies de marketing digital',
    address: 'Brazzaville, République du Congo',
    contact: '+242 06 802 00 06',
    website: 'https://mosala.org'
  },
  // ... autres emplois
];

// Ajouter la section carte dans le JSX
<section className="container mx-auto px-4 py-8">
  <h2 className="text-2xl font-bold mb-6">Carte des emplois</h2>
  <MapComponent 
    locations={jobLocations}
    center={[-4.2634, 15.2429]}
    zoom={10}
    height="500px"
  />
</section>
```

### 2. Page Formations avec carte

```typescript
// frontend/src/pages/Formations.tsx
// Ajouter l'import
import MapComponent from '@/components/MapComponent';

// Ajouter les données de localisation
const formationLocations = [
  {
    id: 'formation-1',
    name: 'Centre de Formation Mosala',
    type: 'formation' as const,
    position: [-4.2634, 15.2429],
    description: 'Formations certifiantes en développement web et marketing digital',
    address: 'Brazzaville, République du Congo',
    contact: '+242 06 802 00 06',
    website: 'https://mosala.org/formations'
  },
  // ... autres formations
];

// Ajouter la section carte
<section className="container mx-auto px-4 py-8">
  <h2 className="text-2xl font-bold mb-6">Carte des formations</h2>
  <MapComponent 
    locations={formationLocations}
    center={[-4.2634, 15.2429]}
    zoom={10}
    height="500px"
  />
</section>
```

## Fonctionnalités avancées

### 1. Géolocalisation automatique

```typescript
// frontend/src/hooks/useGeolocation.ts
import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Géolocalisation non supportée');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
        setLoading(false);
      },
      (error) => {
        setError('Impossible d\'obtenir votre position');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  }, []);

  return { location, error, loading };
};
```

### 2. Calcul d'itinéraires

```typescript
// frontend/src/services/routing.ts
export class RoutingService {
  static async getRoute(from: [number, number], to: [number, number]) {
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`
      );
      
      if (!response.ok) {
        throw new Error('Erreur de calcul d\'itinéraire');
      }
      
      const data = await response.json();
      return data.routes[0];
    } catch (error) {
      console.error('Erreur de calcul d\'itinéraire:', error);
      return null;
    }
  }
}
```

## Configuration et optimisation

### 1. Variables d'environnement

```bash
# frontend/.env
REACT_APP_MAP_CENTER_LAT=-4.2634
REACT_APP_MAP_CENTER_LON=15.2429
REACT_APP_MAP_DEFAULT_ZOOM=10
REACT_APP_GEOCODING_ENABLED=true
```

### 2. Performance

```typescript
// Optimisation du rendu des marqueurs
import { memo } from 'react';

const MapMarker = memo(({ location, icon, children }: any) => (
  <Marker position={location.position} icon={icon}>
    {children}
  </Marker>
));
```

### 3. Cache des tuiles

```typescript
// Configuration du cache des tuiles
<TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  maxZoom={19}
  minZoom={3}
  tileSize={256}
  zoomOffset={0}
/>
```

## Tests

### Test de base

```bash
# Démarrer le frontend
cd frontend
npm start

# Tester la carte sur http://localhost:3000
```

### Test des fonctionnalités

1. **Affichage de la carte** : Vérifier que la carte se charge
2. **Marqueurs** : Tester l'affichage des marqueurs
3. **Popups** : Vérifier les informations dans les popups
4. **Filtres** : Tester le filtrage par type
5. **Recherche** : Tester la recherche de lieux
6. **Géolocalisation** : Tester la détection de position

## Avantages

### ✅ Gratuité
- OpenStreetMap : Données cartographiques gratuites
- Leaflet : Bibliothèque open source
- Nominatim : Géocodage gratuit

### ✅ Performance
- Tuiles vectorielles optimisées
- Cache automatique
- Chargement progressif

### ✅ Flexibilité
- Personnalisation complète
- Intégration facile
- API riche

## Prochaines étapes

1. **Intégration avec l'API** : Connecter aux vraies données
2. **Notifications géolocalisées** : Alertes d'emplois à proximité
3. **Itinéraires avancés** : Transport en commun
4. **Clustering** : Regroupement des marqueurs
5. **Mode hors-ligne** : Cache des données

## Ressources

- [Documentation Leaflet](https://leafletjs.com/reference.html)
- [Documentation React-Leaflet](https://react-leaflet.js.org/)
- [OpenStreetMap Nominatim](https://nominatim.org/release-docs/latest/api/Overview/)
- [OSRM Routing](https://project-osrm.org/)

---

**Statut** : ✅ Prêt à être implémenté
**Prochaine étape** : [Documentation technique avec Docusaurus et Swagger](./10-documentation-technique-docusaurus-swagger.md) 