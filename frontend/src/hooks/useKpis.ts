import { useState, useEffect } from 'react';

interface Kpis {
  candidates: number;
  jobs: number;
  partners: number;
}

interface UseKpisOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export const useKpis = (options: UseKpisOptions = {}): {
  kpis: Kpis;
  isLoading: boolean;
  error: string | null;
} => {
  const { autoRefresh = true, refreshInterval = 300000 } = options; // 5 minutes par défaut

  const [kpis, setKpis] = useState<Kpis>({
    candidates: 25000,
    jobs: 15000,
    partners: 500
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchKpis = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Remplacer par l'appel API réel quand elle sera disponible
      // const response = await fetch('/api/kpis');
      // const data = await response.json();
      
      // Simulation d'un appel API avec des données dynamiques
      const mockData: Kpis = {
        candidates: Math.floor(Math.random() * 5000) + 25000, // 25000-30000
        jobs: Math.floor(Math.random() * 3000) + 15000, // 15000-18000
        partners: Math.floor(Math.random() * 100) + 500 // 500-600
      };
      
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setKpis(mockData);
    } catch (err) {
      setError('Erreur lors du chargement des statistiques');
      console.error('Erreur KPIs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKpis();

    if (autoRefresh) {
      const interval = setInterval(fetchKpis, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  return { kpis, isLoading, error };
};
