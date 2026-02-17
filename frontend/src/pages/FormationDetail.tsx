import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { formationsAPI, type Formation } from "@/api/formations";
import { Clock, Users, DollarSign, Award } from "lucide-react";



const FormationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [formation, setFormation] = useState<Formation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFormation();
  }, [id]);

  const fetchFormation = async () => {
    try {
      setLoading(true);
      if (!id) {
        throw new Error('ID de formation invalide');
      }
      const data = await formationsAPI.getOne(parseInt(id, 10));
      if (!data) {
        throw new Error('Formation non trouvée');
      }
      setFormation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mosala-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement de la formation...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !formation) {
    return (
      <>
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700 max-w-md">
            <p className="font-semibold mb-2">Erreur</p>
            <p className="mb-4">{error || 'Formation non trouvée'}</p>
            <Link to="/formations" className="text-mosala-green-600 hover:text-mosala-green-700">
              ← Retour aux formations
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleInscription = () => {
    console.log(`Inscription à la formation ${formation.id}`);
    // TODO: Implémenter la logique d'inscription
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-mosala-green-50 via-mosala-yellow-50 to-mosala-dark-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        {/* Bouton retour */}
        <Link to="/formations" className="text-mosala-green-600 hover:text-mosala-green-700 mb-8 inline-block">
          ← Retour aux formations
        </Link>

        <div className="bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-xl overflow-hidden border border-mosala-green-100">
          {/* Image d'en-tête */}
          <div className="h-96 overflow-hidden bg-gray-200">
            <img
              src={formation?.imageUrl && formation?.imageUrl.trim() ? formation.imageUrl : "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop"}
              alt={formation?.titre}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop";
              }}
            />
          </div>

          {/* Contenu */}
          <div className="p-10">
            <div className="mb-6">
              {formation.level && (
                <span className="inline-block bg-mosala-green-100 text-mosala-green-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  {formation.level}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-mosala-green-700 mb-4">
              {formation.titre}
            </h1>

            <p className="text-lg text-mosala-dark-400 mb-6">{formation.contenu}</p>

            {/* Informations de la formation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 py-8 border-y border-gray-200">
              {formation.duration && (
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-mosala-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Durée</p>
                    <p className="font-semibold text-gray-800">{formation.duration}h</p>
                  </div>
                </div>
              )}

              {formation.maxParticipants && (
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-mosala-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Places</p>
                    <p className="font-semibold text-gray-800">{formation.maxParticipants}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-mosala-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Prix</p>
                  <p className="font-semibold text-gray-800">{formation.price ? `${formation.price} F CFA` : 'Gratuit'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-mosala-green-600" />
                <div>
                  <p className="text-sm text-gray-500">Statut</p>
                  <p className="font-semibold text-gray-800 capitalize">{formation.status || 'Disponible'}</p>
                </div>
              </div>
            </div>

            {/* Contenu détaillé */}
            {/* Détail supplémentaire si besoin */}
            {/* formation.date, etc. */}

            {/* Prérequis */}
            {formation.prerequisites && (
              <div className="mb-8 bg-mosala-yellow-50 p-6 rounded-lg border border-mosala-yellow-200">
                <h3 className="text-lg font-bold text-mosala-yellow-700 mb-2">Prérequis</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{formation.prerequisites}</p>
              </div>
            )}

            {/* Bouton d'inscription */}
            <div className="flex gap-4">
              <Button 
                onClick={handleInscription}
                className="bg-gradient-to-r from-mosala-green-500 to-mosala-yellow-500 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:from-mosala-green-600 hover:to-mosala-yellow-600 transition-all text-lg"
              >
                S'inscrire à la formation
              </Button>
              <Link 
                to="/formations"
                className="bg-gray-200 text-gray-700 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-300 transition-all text-lg inline-flex items-center"
              >
                Voir d'autres formations
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FormationDetail;
