import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { actualitesAPI, type Actualite } from '../api/actualites';

const ActualiteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<Actualite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, [id]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      if (!id) {
        throw new Error('ID non fourni');
      }
      const data = await actualitesAPI.getOne(parseInt(id));
      if (!data) {
        throw new Error('Actualité non trouvée');
      }
      setNews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700 max-w-md">
          <p className="font-semibold mb-2">Erreur</p>
          <p className="mb-4">{error || 'Actualité non trouvée'}</p>
          <Link to="/actualites" className="text-green-600 hover:text-green-700">
            ← Retour aux actualités
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/actualites" className="text-green-100 hover:text-white mb-4 inline-block">
            ← Retour aux actualités
          </Link>
          {news.isFeatured && (
            <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 ml-2">
              À la une
            </div>
          )}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Image en-tête */}
          <div className="h-96 overflow-hidden bg-gray-200">
            <img
              src={news.imageUrl || "https://images.unsplash.com/photo-1557804506-669714131143?w=800&h=400&fit=crop"}
              alt={news.titre}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1557804506-669714131143?w=800&h=400&fit=crop";
              }}
            />
          </div>

          {/* Contenu */}
          <div className="p-8">
            {/* Méta-informations */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-600">
                  {news.date ? new Date(news.date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }) : 'Date non disponible'}
                </p>
                {news.aLaUne && (
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    À la une
                  </span>
                )}
              </div>
            </div>

            {/* Titre */}
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{news.titre}</h1>

            {/* Excerpt */}
            {news.excerpt && (
              <p className="text-xl text-gray-600 mb-8 italic border-l-4 border-green-600 pl-4">
                {news.excerpt}
              </p>
            )}

            {/* Contenu */}
            <div className="prose prose-lg max-w-none text-gray-700 mb-8">
              {news.contenu.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Lien vers l'article officiel */}
            {news.lien && (
              <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-900 mb-3 font-semibold">
                  📄 Consulter l'article complet
                </p>
                <a
                  href={news.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition"
                >
                  Lire l'article → 
                </a>
              </div>
            )}
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            to="/actualites"
            className="inline-block bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition"
          >
            ← Voir toutes les actualités
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActualiteDetail;
