import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

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
      iconSize: [30, 30] as [number, number],
      iconAnchor: [15, 15] as [number, number]
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
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setSelectedType('job')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedType === 'job'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              💼 Emplois
            </button>
            <button
              onClick={() => setSelectedType('formation')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedType === 'formation'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🎓 Formations
            </button>
            <button
              onClick={() => setSelectedType('service')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedType === 'service'
                  ? 'bg-gray-500 text-white'
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
                      <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
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