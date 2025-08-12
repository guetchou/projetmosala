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