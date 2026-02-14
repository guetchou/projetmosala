import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import NewsForm from '@/components/NewsForm';
import { actualitesAPI, Actualite } from '@/api/actualites';
import CategoriesSection from './components/CategoriesSection';
import InscriptionsSection from './components/InscriptionsSection';
import FormationsSection from './components/FormationsSection';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

export default function AdminContentDashboard() {
  const { user, token, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [news, setNews] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingNews, setEditingNews] = useState<Actualite | null>(null);

  // Since ProtectedRoute now uses AuthContext, this is just a safety net
  // ProtectedRoute has already verified auth and role before reaching this component
  useEffect(() => {
    console.log('[AdminContentDashboard] Component mounted - isLoading:', isLoading, 'isAuthenticated:', isAuthenticated, 'user.role:', user?.role);
  }, [isLoading, isAuthenticated, user]);

  // Charger les actualités - only if user is defined
  useEffect(() => {
    if (activeTab === 'news' && user) {
      fetchNews();
    }
  }, [activeTab, user]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const data = await actualitesAPI.getAll();
      setNews(data);
    } catch (error) {
      console.error('Erreur lors du chargement des actualités:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsSuccess = () => {
    fetchNews();
    setEditingNews(null);
  };

  const handleDeleteNews = async (id: number) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) return;

    try {
      const success = await actualitesAPI.delete(id);
      if (success) {
        fetchNews();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Tableau de bord', icon: '📊', path: '#' },
    { id: 'news', label: 'Gérer les actualités', icon: '📰', path: '#' },
    { id: 'formations', label: 'Gérer les formations', icon: '📚', path: '#' },
    { id: 'categories', label: 'Gérer les catégories', icon: '🏷️', path: '#' },
    { id: 'inscriptions', label: 'Gestion des inscriptions', icon: '📝', path: '#' },
    { id: 'temoignages', label: 'Gérer les témoignages', icon: '💬', path: '#' },
  ];

  const handleMenuClick = (itemId: string) => {
    setActiveTab(itemId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'news':
        return <NewsView 
          news={news} 
          loading={loading}
          onEditNews={(n: Actualite) => {
            setEditingNews(n);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onDeleteNews={handleDeleteNews}
          onSuccess={handleNewsSuccess}
          token={token}
        />;
      case 'formations':
        return <FormationsSection />;
      case 'categories':
        return <CategoriesSection />;
      case 'inscriptions':
        return <InscriptionsSection />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Fixed on the left */}
      <div
        className={`${
          isOpen ? 'w-64' : 'w-20'
        } bg-mosala-orange-800 text-white transition-all duration-300 flex flex-col shadow-2xl fixed left-0 top-0 h-screen z-40 ${
          !isOpen ? 'hidden md:flex' : 'w-full md:w-64'
        }`}
      >
        {/* Logo Section */}
        <div className="p-4 md:p-6 border-b border-mosala-orange-700">
          <div className="flex items-center justify-between">
            {isOpen && (
              <div className="min-w-0">
                <h1 className="text-lg md:text-xl font-bold text-mosala-orange-100">MOSALA</h1>
                <p className="text-xs text-mosala-orange-300">Admin Contenu</p>
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-mosala-orange-700 rounded-lg transition flex-shrink-0"
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 md:px-4 py-4 md:py-6 space-y-1 md:space-y-2 overflow-y-auto">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                handleMenuClick(item.id);
                // Close sidebar on mobile after selection
                if (isOpen && window.innerWidth < 768) {
                  setIsOpen(false);
                }
              }}
              className={`w-full flex items-center space-x-3 md:space-x-4 px-3 md:px-4 py-2 md:py-3 rounded-lg transition text-sm md:text-base ${
                activeTab === item.id
                  ? 'bg-mosala-orange-600 text-white'
                  : 'hover:bg-mosala-orange-700 text-mosala-orange-100'
              }`}
            >
              <span className="text-lg md:text-xl flex-shrink-0">{item.icon}</span>
              {isOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div className="border-t border-mosala-orange-700 p-3 md:p-4">
          {isOpen && (
            <div className="mb-3 md:mb-4 pb-3 md:pb-4 border-b border-mosala-orange-700">
              <p className="text-xs text-mosala-orange-300 uppercase">Connecté</p>
              <p className="text-xs md:text-sm font-semibold text-mosala-orange-100 truncate">{user?.name}</p>
              <p className="text-xs text-mosala-orange-400 truncate">{user?.email}</p>
            </div>
          )}
          <button
            onClick={() => {
              localStorage.removeItem('auth_token');
              localStorage.removeItem('auth_user');
              navigate('/admin-content/login');
            }}
            className="w-full flex items-center justify-center space-x-2 px-3 md:px-4 py-2 bg-mosala-red-600 hover:bg-mosala-red-700 rounded-lg transition font-medium text-xs md:text-sm"
          >
            <span>🚪</span>
            {isOpen && <span>Déconnexion</span>}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64 h-screen">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-8 py-3 md:py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
            <div className="min-w-0">
              <h2 className="text-xl md:text-2xl font-bold text-mosala-orange-800 truncate">
                {menuItems.find(m => m.id === activeTab)?.label}
              </h2>
              <p className="text-gray-600 text-xs md:text-sm">Gestion des contenus Mosala</p>
            </div>
            <div className="text-xs md:text-sm text-gray-600 whitespace-nowrap">
              {new Date().toLocaleDateString('fr-FR', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

function DashboardView() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <StatCard title="Actualités" value="24" icon="📰" color="orange" />
        <StatCard title="Formations" value="12" icon="📚" color="yellow" />
        <StatCard title="Dernière mise à jour" value="2h" icon="⏱️" color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6">
          <h3 className="text-base md:text-lg font-bold text-mosala-orange-800 mb-3 md:mb-4">Actualités récentes</h3>
          <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Nouvelle actualité publiée</span>
              <span className="text-mosala-orange-600 whitespace-nowrap ml-2">Il y a 2h</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Actualité modifiée</span>
              <span className="text-mosala-orange-600 whitespace-nowrap ml-2">Il y a 5h</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Formation mise à jour</span>
              <span className="text-mosala-orange-600 whitespace-nowrap ml-2">Il y a 1j</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6">
          <h3 className="text-base md:text-lg font-bold text-mosala-orange-800 mb-3 md:mb-4">Statistiques de contenu</h3>
          <div className="space-y-3 md:space-y-4">
            <div>
              <div className="flex justify-between mb-2 text-xs md:text-sm">
                <span className="font-medium text-gray-600">Contenu publié</span>
                <span className="font-bold text-mosala-orange-600">72%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
                <div className="bg-gradient-to-r from-mosala-orange-500 to-mosala-orange-600 h-1.5 md:h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2 text-xs md:text-sm">
                <span className="font-medium text-gray-600">Formations actives</span>
                <span className="font-bold text-mosala-yellow-600">100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
                <div className="bg-gradient-to-r from-mosala-yellow-500 to-mosala-orange-500 h-1.5 md:h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  const colorClasses = {
    green: 'from-mosala-green-500 to-mosala-green-600',
    yellow: 'from-mosala-yellow-500 to-mosala-orange-500',
    orange: 'from-mosala-orange-500 to-mosala-orange-600',
    red: 'from-mosala-red-500 to-mosala-red-600',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 text-white`}>
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0">
          <p className="text-white text-opacity-80 text-xs md:text-sm font-medium">{title}</p>
          <p className="text-2xl md:text-3xl font-bold mt-1 md:mt-2 truncate">{value}</p>
        </div>
        <span className="text-2xl md:text-3xl flex-shrink-0">{icon}</span>
      </div>
    </div>
  );
}

function NewsView({ news, loading, onEditNews, onDeleteNews, onSuccess, token }: any) {
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<Actualite | null>(null);

  const handleSuccess = () => {
    setShowForm(false);
    setEditingNews(null);
    onSuccess();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingNews(null);
  };

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Formulaire pour ajouter/modifier une actualité */}
      {showForm && (
        <div className="mb-4 md:mb-8">
          <NewsForm 
            onSuccess={handleSuccess}
            editingNews={editingNews}
            onCancel={handleCancel}
          />
        </div>
      )}

      {!showForm && (
        <button 
          onClick={() => {
            setEditingNews(null);
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 px-4 md:px-6 py-2 bg-gradient-to-r from-mosala-orange-600 to-mosala-orange-700 text-white rounded-lg font-semibold hover:shadow-lg transition text-sm md:text-base"
        >
          + Ajouter une actualité
        </button>
      )}

      {/* Liste des actualités */}
      <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6">
        <h3 className="text-base md:text-lg font-bold text-mosala-orange-800 mb-4 md:mb-6">Actualités existantes</h3>
        
        {loading ? (
          <div className="text-center py-8 text-gray-500 text-sm md:text-base">Chargement...</div>
        ) : news.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm md:text-base">Aucune actualité créée</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {news.map((item: Actualite) => (
              <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col">
                {item.imageUrl && (
                  <div className="h-32 md:h-40 bg-gray-200 overflow-hidden flex-shrink-0">
                    <img src={item.imageUrl} alt={item.titre} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-3 md:p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <h4 className="font-bold text-mosala-orange-800 line-clamp-2 text-sm md:text-base">{item.titre}</h4>
                    {item.aLaUne && (
                      <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex-shrink-0">À la une</span>
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3 line-clamp-2 flex-1">{item.excerpt}</p>
                  <p className="text-xs text-gray-500 mb-2 md:mb-3">
                    {new Date(item.date || item.created_at || '').toLocaleDateString('fr-FR')}
                  </p>
                  <div className="flex gap-2 mt-auto flex-col sm:flex-row">
                    <button 
                      onClick={() => {
                        setEditingNews(item);
                        setShowForm(true);
                      }}
                      className="flex-1 text-mosala-orange-600 hover:text-mosala-orange-800 font-medium text-xs md:text-sm px-2 md:px-4 py-1 md:py-2 rounded hover:bg-orange-50 transition"
                    >
                      ✏️ Modifier
                    </button>
                    <button 
                      onClick={() => onDeleteNews(item.id)}
                      className="flex-1 text-mosala-red-600 hover:text-mosala-red-800 font-medium text-xs md:text-sm px-2 md:px-4 py-1 md:py-2 rounded hover:bg-red-50 transition"
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TestimonialsView() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', role: '', quote: '', avatar: '' });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setItems(prev => [{ ...form }, ...prev]);
    setForm({ name: '', role: '', quote: '', avatar: '' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-mosala-orange-800 mb-4">Ajouter un témoignage</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profil / Poste</label>
            <input name="role" value={form.role} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Témoignage (description)</label>
            <textarea name="quote" value={form.quote} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" rows={4} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Photo (URL)</label>
            <input name="avatar" value={form.avatar} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="px-6 py-2 bg-mosala-orange-600 text-white rounded-lg">Enregistrer</button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">Aucun témoignage</div>
        ) : (
          items.map((t, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow p-6 text-center">
              {t.avatar && <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full mx-auto mb-4" />}
              <blockquote className="italic text-lg mb-4">“{t.quote}”</blockquote>
              <div className="font-bold">{t.name}</div>
              <div className="text-sm text-gray-500">{t.role}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
