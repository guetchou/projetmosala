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

const NewsSection: React.FC = () => {
  const [featured, setFeatured] = useState<NewsItem | null>(null);
  const [recent, setRecent] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      
      // Récupérer l'actualité à la une
      const featuredRes = await fetch(`${API_BASE_URL}/news/featured/latest`);
      if (featuredRes.ok) {
        setFeatured(await featuredRes.json());
      }

      // Récupérer les 3 actualités les plus récentes
      const recentRes = await fetch(`${API_BASE_URL}/news/latest/3`);
      if (recentRes.ok) {
        setRecent(await recentRes.json());
      }
    } catch (error) {
      console.error('Erreur lors du chargement des actualités:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-3 text-gray-600">Chargement des actualités...</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* En-tête */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Actualités Mosala
          </h2>
          <p className="text-gray-600 text-lg">
            Suivez les dernières nouvelles et mises à jour de notre projet
          </p>
        </div>

        {/* Actualité à la une */}
        {featured && (
          <div className="mb-16">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Image */}
                {featured.imageUrl && (
                  <div className="h-96 overflow-hidden relative">
                    <img
                      src={featured.imageUrl}
                      alt={featured.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-full font-semibold">
                      ⭐ À la une
                    </div>
                  </div>
                )}

                {/* Contenu */}
                <div className="p-8">
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(featured.createdAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>

                  <h3 className="text-3xl font-bold text-gray-800 mb-4">
                    {featured.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featured.description}
                  </p>

                  {featured.author && (
                    <p className="text-xs text-gray-500 mb-6">
                      Par <strong>{featured.author.firstName} {featured.author.lastName || featured.author.email}</strong>
                    </p>
                  )}

                  <div className="flex gap-3">
                    <Link
                      to={`/actualites/${featured.id}`}
                      className="inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition"
                    >
                      Lire la suite →
                    </Link>

                    {featured.link && (
                      <a
                        href={featured.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition"
                      >
                        📄 Article officiel
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actualités récentes */}
        {recent.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-8">
              Dernières actualités
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {recent.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Image */}
                  {item.imageUrl && (
                    <div className="h-48 overflow-hidden bg-gray-200">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  )}

                  {/* Contenu */}
                  <div className="p-5">
                    <p className="text-xs text-gray-500 mb-2">
                      {new Date(item.createdAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>

                    <h4 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                      {item.title}
                    </h4>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex gap-2">
                      <Link
                        to={`/actualites/${item.id}`}
                        className="flex-1 text-center bg-green-600 text-white font-semibold py-2 px-3 rounded hover:bg-green-700 text-sm transition"
                      >
                        Lire
                      </Link>

                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-orange-500 text-white font-semibold py-2 px-3 rounded hover:bg-orange-600 text-sm transition"
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

            {/* Bouton pour voir tous les articles */}
            <div className="text-center">
              <Link
                to="/actualites"
                className="inline-block bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition"
              >
                Voir toutes les actualités →
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
