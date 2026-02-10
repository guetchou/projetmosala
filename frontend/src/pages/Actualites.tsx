import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const Actualites: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/news?published=true`);
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des actualités');
      }

      const data = await response.json();
      setNews(Array.isArray(data) ? data : []);
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
          <p className="mt-4 text-gray-600">Chargement des actualités...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700 max-w-md">
          <p className="font-semibold mb-2">Erreur</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Aucune actualité disponible pour le moment.</p>
          <Link to="/" className="text-green-600 hover:text-green-700 mt-4 inline-block">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  // Pagination
  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedNews = news.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Actualités</h1>
          <p className="text-green-100">Suivez les dernières nouvelles et mises à jour du projet Mosala</p>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Grille d'actualités */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedNews.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              {item.imageUrl && (
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                  {item.isFeatured && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      À la une
                    </div>
                  )}
                </div>
              )}

              {/* Contenu */}
              <div className="p-6">
                {/* Date */}
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(item.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>

                {/* Titre */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.description}
                </p>

                {/* Auteur */}
                {item.author && (
                  <p className="text-xs text-gray-500 mb-4">
                    Par {item.author.firstName} {item.author.lastName || item.author.email}
                  </p>
                )}

                {/* Bouton */}
                <div className="flex gap-2">
                  <Link
                    to={`/actualites/${item.id}`}
                    className="flex-1 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 text-center transition"
                  >
                    Lire la suite
                  </Link>

                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition"
                      title="Lire l'article officiel"
                    >
                      🔗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  page === pageNum
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Actualites;
