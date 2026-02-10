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

export default function AdminContentDashboard() {
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);

  // Vérifier l'authentification
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin_content') {
      navigate('/admin-content/login');
    }
  }, [isAuthenticated, user, navigate]);

  // Charger les actualités
  useEffect(() => {
    if (activeTab === 'news') {
      fetchNews();
    }
  }, [activeTab]);

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
    { id: 'news', label: 'Gérer les actualités', icon: '📰', path: '#' },
    { id: 'formations', label: 'Gérer les formations', icon: '📚', path: '#' },
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
          onEditNews={(n: NewsItem) => {
            setEditingNews(n);
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
        } bg-mosala-orange-800 text-white transition-all duration-300 flex flex-col shadow-2xl`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-mosala-orange-700">
          <div className="flex items-center justify-between">
            {isOpen && (
              <div>
                <h1 className="text-xl font-bold text-mosala-orange-100">MOSALA</h1>
                <p className="text-xs text-mosala-orange-300">Admin Contenu</p>
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-mosala-orange-700 rounded-lg transition"
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
                  ? 'bg-mosala-orange-600 text-white'
                  : 'hover:bg-mosala-orange-700 text-mosala-orange-100'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div className="border-t border-mosala-orange-700 p-4">
          {isOpen && (
            <div className="mb-4 pb-4 border-b border-mosala-orange-700">
              <p className="text-xs text-mosala-orange-300 uppercase">Connecté</p>
              <p className="text-sm font-semibold text-mosala-orange-100 truncate">{user?.name}</p>
              <p className="text-xs text-mosala-orange-400 truncate">{user?.email}</p>
            </div>
          )}
          <button
            onClick={() => {
              localStorage.removeItem('auth_token');
              localStorage.removeItem('auth_user');
              navigate('/admin-content/login');
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
              <h2 className="text-2xl font-bold text-mosala-orange-800">
                {menuItems.find(m => m.id === activeTab)?.label}
              </h2>
              <p className="text-gray-600 text-sm">Gestion des contenus Mosala</p>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Actualités" value="24" icon="📰" color="orange" />
        <StatCard title="Formations" value="12" icon="📚" color="yellow" />
        <StatCard title="Dernière mise à jour" value="2h" icon="⏱️" color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-mosala-orange-800 mb-4">Actualités récentes</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Nouvelle actualité publiée</span>
              <span className="text-mosala-orange-600">Il y a 2h</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Actualité modifiée</span>
              <span className="text-mosala-orange-600">Il y a 5h</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Formation mise à jour</span>
              <span className="text-mosala-orange-600">Il y a 1j</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-mosala-orange-800 mb-4">Statistiques de contenu</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Contenu publié</span>
                <span className="text-sm font-bold text-mosala-orange-600">72%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-mosala-orange-500 to-mosala-orange-600 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Formations actives</span>
                <span className="text-sm font-bold text-mosala-yellow-600">100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-mosala-yellow-500 to-mosala-orange-500 h-2 rounded-full" style={{ width: '100%' }}></div>
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
        <h3 className="text-lg font-bold text-mosala-orange-800 mb-6">Actualités existantes</h3>
        
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
                    <h4 className="font-bold text-mosala-orange-800 line-clamp-2">{item.title}</h4>
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
                      className="flex-1 text-mosala-orange-600 hover:text-mosala-orange-800 font-medium text-sm"
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
  const [showForm, setShowForm] = useState(false);
  const [formations, setFormations] = useState<any[]>([]);
  const [form, setForm] = useState<any>({
    id: '',
    title: '',
    description: '',
    category: '',
    duration: '',
    level: 'Tous niveaux',
    certification: false,
    image: '',
    modalite: '',
    publicCible: '',
    prix: '',
    places: 0,
    satisfaction: 0
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newItem = { ...form, id: form.id || `F${Date.now()}` };
    setFormations(prev => [newItem, ...prev]);
    setForm({
      id: '', title: '', description: '', category: '', duration: '', level: 'Tous niveaux', certification: false, image: '', modalite: '', publicCible: '', prix: '', places: 0, satisfaction: 0
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => setShowForm(!showForm)} className="px-6 py-2 bg-gradient-to-r from-mosala-orange-600 to-mosala-orange-700 text-white rounded-lg font-semibold hover:shadow-lg transition">
          {showForm ? 'Annuler' : '+ Ajouter une formation'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Titre</label>
              <input name="title" value={form.title} onChange={handleChange} required className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Catégorie</label>
              <input name="category" value={form.category} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" rows={4} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Durée</label>
              <input name="duration" value={form.duration} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Niveau</label>
              <select name="level" value={form.level} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2">
                <option>Tous niveaux</option>
                <option>Débutant</option>
                <option>Intermédiaire</option>
                <option>Avancé</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Modalité</label>
              <input name="modalite" value={form.modalite} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Public cible</label>
              <input name="publicCible" value={form.publicCible} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Prix</label>
              <input name="prix" value={form.prix} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Places</label>
              <input name="places" type="number" value={form.places} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Satisfaction (0-5)</label>
              <input name="satisfaction" type="number" min="0" max="5" step="0.1" value={form.satisfaction} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div className="flex items-center gap-3">
              <input name="certification" type="checkbox" checked={form.certification} onChange={handleChange} />
              <label className="text-sm">Certifiante</label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Image (URL)</label>
              <input name="image" value={form.image} onChange={handleChange} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button type="submit" className="px-6 py-2 bg-mosala-orange-600 text-white rounded-lg">Enregistrer</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-mosala-orange-50 border-b border-mosala-orange-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-mosala-orange-800">Formation</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-mosala-orange-800">Niveau</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-mosala-orange-800">Durée</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-mosala-orange-800">Places</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-mosala-orange-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            {formations.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Aucune formation créée</td>
              </tr>
            ) : (
              formations.map((f, idx) => (
                <tr key={f.id || idx} className="border-t border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{f.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{f.level}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{f.duration}</td>
                  <td className="px-6 py-4 text-sm font-medium text-mosala-orange-600">{f.places}</td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button className="text-mosala-orange-600 hover:text-mosala-orange-800 font-medium">Modifier</button>
                    <button onClick={() => setFormations(prev => prev.filter(x => x.id !== f.id))} className="text-mosala-red-600 hover:text-mosala-red-800 font-medium">Supprimer</button>
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
