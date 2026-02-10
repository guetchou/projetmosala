import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  link?: string;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
  author?: {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

const ActualiteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, [id]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/news/${id}`);
      
      if (!response.ok) {
        throw new Error('Actualité non trouvée');
      }

      const data = await response.json();
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
          {news.imageUrl && (
            <div className="h-96 overflow-hidden bg-gray-200">
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Contenu */}
          <div className="p-8">
            {/* Méta-informations */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-gray-600 mb-2">
                {new Date(news.createdAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              {news.author && (
                <p className="text-sm text-gray-500">
                  Par <strong>{news.author.firstName} {news.author.lastName || news.author.email}</strong>
                </p>
              )}
            </div>

            {/* Titre */}
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{news.title}</h1>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-8 italic">{news.description}</p>

            {/* Contenu */}
            <div className="prose prose-lg max-w-none text-gray-700 mb-8">
              {news.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Lien vers l'article officiel */}
            {news.link && (
              <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-900 mb-3 font-semibold">
                  📄 Consulter l'article officiel
                </p>
                <a
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
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
