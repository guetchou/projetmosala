import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

  // Icônes personnalisées par type (approche simplifiée)
  const getIcon = (type: string) => {
    const iconSize: [number, number] = [25, 41];
    const iconAnchor: [number, number] = [12, 41];
    
    const colors = {
      job: '#7ED9A7',
      formation: '#FFD93D',
      service: '#FF6B35',
      office: '#00824B'
    };

    // Créer une icône SVG personnalisée
    const svgIcon = `
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 7.9 12.5 28.5 12.5 28.5s12.5-20.6 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="${colors[type] || colors.office}"/>
        <circle cx="12.5" cy="12.5" r="6" fill="white"/>
      </svg>
    `;

    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(svgIcon)}`,
      iconSize,
      iconAnchor,
      popupAnchor: [0, -41] as [number, number]
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