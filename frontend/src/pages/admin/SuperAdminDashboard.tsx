import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import NewsForm from '@/components/NewsForm';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

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
}

export default function SuperAdminDashboard() {
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  // Vérifier l'authentification
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'superadmin') {
      navigate('/superadmin/login');
    }
  }, [isAuthenticated, user, navigate]);

  // Charger les admins
  useEffect(() => {
    if (activeTab === 'admins') {
      fetchAdmins();
    }
  }, [activeTab]);

  // Charger les actualités
  useEffect(() => {
    if (activeTab === 'news') {
      fetchNews();
    }
  }, [activeTab]);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/mosala-api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAdmins(data.filter((u: Admin) => u.role === 'admin_content' || u.role === 'admin'));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des admins:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/news`);
      if (response.ok) {
        const data = await response.json();
        setNews(Array.isArray(data) ? data : []);
      }
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/news/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchNews();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Tableau de bord', icon: '📊', path: '#' },
    { id: 'admins', label: 'Gérer les admins', icon: '👥', path: '#' },
    { id: 'news', label: 'Gérer les actualités', icon: '📰', path: '#' },
    { id: 'formations', label: 'Gérer les formations', icon: '📚', path: '#' },
  ];

  const handleMenuClick = (itemId: string) => {
    setActiveTab(itemId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'admins':
        return <AdminsView admins={admins} loading={loading} />;
      case 'news':
        return <NewsView 
          news={news} 
          loading={loading}
          onEditNews={(n: NewsItem) => {
            setEditingNews(n);
            // Scroll to top for better UX
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onDeleteNews={handleDeleteNews}
          token={token}
        />;
      case 'formations':
        return <FormationsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'w-64' : 'w-20'
        } bg-mosala-green-800 text-white transition-all duration-300 flex flex-col shadow-2xl`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-mosala-green-700">
          <div className="flex items-center justify-between">
            {isOpen && (
              <div>
                <h1 className="text-xl font-bold text-mosala-green-100">MOSALA</h1>
                <p className="text-xs text-mosala-green-300">Superadmin</p>
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-mosala-green-700 rounded-lg transition"
            >
              {isOpen ? '◀' : '▶'}
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full flex items-center space-x-4 px-4 py-3 rounded-lg transition ${
                activeTab === item.id
                  ? 'bg-mosala-green-600 text-white'
                  : 'hover:bg-mosala-green-700 text-mosala-green-100'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div className="border-t border-mosala-green-700 p-4">
          {isOpen && (
            <div className="mb-4 pb-4 border-b border-mosala-green-700">
              <p className="text-xs text-mosala-green-300 uppercase">Connecté</p>
              <p className="text-sm font-semibold text-mosala-green-100 truncate">{user?.name}</p>
              <p className="text-xs text-mosala-green-400 truncate">{user?.email}</p>
            </div>
          )}
          <button
            onClick={() => {
              localStorage.removeItem('auth_token');
              localStorage.removeItem('auth_user');
              navigate('/superadmin/login');
            }}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-mosala-red-600 hover:bg-mosala-red-700 rounded-lg transition font-medium text-sm"
          >
            <span>🚪</span>
            {isOpen && <span>Déconnexion</span>}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-mosala-green-800">
                {menuItems.find(m => m.id === activeTab)?.label}
              </h2>
              <p className="text-gray-600 text-sm">Gestion centrale du système Mosala</p>
            </div>
            <div className="text-sm text-gray-600">
              {new Date().toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

function DashboardView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Administrateurs" value="5" icon="👥" color="green" />
        <StatCard title="Actualités" value="24" icon="📰" color="yellow" />
        <StatCard title="Formations" value="12" icon="📚" color="orange" />
        <StatCard title="Utilisateurs" value="342" icon="👤" color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-mosala-green-800 mb-4">Activité récente</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Nouvel admin créé</span>
              <span className="text-mosala-green-600">Il y a 2h</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Actualité modifiée</span>
              <span className="text-mosala-green-600">Il y a 4h</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Formation créée</span>
              <span className="text-mosala-green-600">Il y a 1j</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-mosala-green-800 mb-4">Statistiques globales</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Taux de remplissage</span>
                <span className="text-sm font-bold text-mosala-green-600">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-mosala-green-500 to-mosala-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
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
    <div className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-xl shadow-lg p-6 text-white`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-white text-opacity-80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}

function AdminsView({ admins, loading }: any) {
  return (
    <div className="space-y-6">
      <button className="px-6 py-2 bg-gradient-to-r from-mosala-green-600 to-mosala-green-700 text-white rounded-lg font-semibold hover:shadow-lg transition">
        + Ajouter un administrateur
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-mosala-green-50 border-b border-mosala-green-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-mosala-green-800">Nom</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-mosala-green-800">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-mosala-green-800">Rôle</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-mosala-green-800">Statut</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-mosala-green-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Chargement...
                </td>
              </tr>
            ) : admins.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  Aucun administrateur trouvé
                </td>
              </tr>
            ) : (
              admins.map((admin: Admin) => (
                <tr key={admin.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{admin.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{admin.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-mosala-green-100 text-mosala-green-700">
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-block w-3 h-3 rounded-full ${admin.isActive ? 'bg-mosala-green-500' : 'bg-gray-300'}`}></span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button className="text-mosala-green-600 hover:text-mosala-green-800 font-medium">Modifier</button>
                    <button className="text-mosala-red-600 hover:text-mosala-red-800 font-medium">Supprimer</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NewsView({ news, loading, onEditNews, onDeleteNews, token }: any) {
  const handlePublish = async (id: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/news/${id}/publish`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Recharger les actualités après la publication
        window.location.reload();
      }
    } catch (error) {
      console.error('Erreur lors de la publication:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Formulaire pour ajouter une actualité */}
      <NewsForm 
        onSuccess={onEditNews}
        editingNews={null}
      />

      {/* Liste des actualités */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-mosala-green-800 mb-6">Actualités existantes</h3>
        
        {loading ? (
          <div className="text-center py-8 text-gray-500">Chargement...</div>
        ) : news.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Aucune actualité créée</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.map((item: NewsItem) => (
              <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                {item.imageUrl && (
                  <div className="h-40 bg-gray-200 overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-mosala-green-800 line-clamp-2">{item.title}</h4>
                    {item.isFeatured && (
                      <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full ml-2 flex-shrink-0">À la une</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  <p className="text-xs text-gray-500 mb-3">
                    {new Date(item.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onEditNews(item)}
                      className="flex-1 text-mosala-green-600 hover:text-mosala-green-800 font-medium text-sm"
                    >
                      ✏️ Modifier
                    </button>
                    {!item.isPublished && (
                      <button 
                        onClick={() => handlePublish(item.id)}
                        className="flex-1 text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        📤 Publier
                      </button>
                    )}
                    <button 
                      onClick={() => onDeleteNews(item.id)}
                      className="flex-1 text-mosala-red-600 hover:text-mosala-red-800 font-medium text-sm"
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

function FormationsView() {
  return (
    <div className="space-y-6">
      <button className="px-6 py-2 bg-gradient-to-r from-mosala-green-600 to-mosala-green-700 text-white rounded-lg font-semibold hover:shadow-lg transition">
        + Ajouter une formation
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-mosala-green-50 border-b border-mosala-green-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-mosala-green-800">Formation</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-mosala-green-800">Niveau</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-mosala-green-800">Durée</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-mosala-green-800">Inscrits</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-mosala-green-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map(i => (
              <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm font-medium text-gray-800">Formation {i}</td>
                <td className="px-6 py-4 text-sm text-gray-600">Niveau {i}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{12 - i} semaines</td>
                <td className="px-6 py-4 text-sm font-medium text-mosala-green-600">{45 + i * 5}</td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <button className="text-mosala-green-600 hover:text-mosala-green-800 font-medium">Modifier</button>
                  <button className="text-mosala-red-600 hover:text-mosala-red-800 font-medium">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
