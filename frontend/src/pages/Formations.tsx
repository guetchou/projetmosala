import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, BookOpen, Image as ImageIcon, ChevronRight, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formationsAPI, type Formation } from "@/api/formations";
import { categoriesAPI, type Category } from "@/api/categories";
import { inscriptionsAPI } from "@/api/inscriptions";

interface Inscription {
  id: string;
  nom: string;
  prenom: string;
  email?: string | null;
  tel: string;
  ville: string;
  quartier?: string | null;
  sexe: string;
  document_url?: string | null;
  date_inscription: string;
  formation_id?: string | null;
  // optional joined relation from api: either `formation` or `formations`
  formation?: { id: string; titre: string } | null;
}

const Formations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchBarRef = useRef<HTMLDivElement | null>(null);
  const [searchBarHeight, setSearchBarHeight] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [inscriptionsPage, setInscriptionsPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'formations' | 'inscriptions'>('formations');
  const itemsPerPage = 10;
  const navigate = useNavigate();

  async function fetchFormations() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await formationsAPI.getAll();
      setFormations(data as Formation[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des formations');
      setFormations([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const data = await categoriesAPI.getAll();
      setCategories(data);
    } catch (err) {
      console.error('Erreur lors du chargement des catégories:', err);
      setCategories([]);
    }
  }

  async function fetchInscriptions() {
    try {
      const { data, error: fetchError } = await inscriptionsAPI.getAll();
      if (fetchError) {
        console.error('Error fetching inscriptions:', fetchError);
        setInscriptions([]);
      } else {
        setInscriptions(data || []);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des inscriptions:', err);
      setInscriptions([]);
    }
  }

  useEffect(() => {
    Promise.all([fetchFormations(), fetchCategories(), fetchInscriptions()]);
  }, []);

  // Measure sticky search bar height to avoid content being hidden behind it
  useEffect(() => {
    const update = () => {
      if (searchBarRef.current) setSearchBarHeight(searchBarRef.current.offsetHeight);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [filtersOpen]);

  const filteredFormations = formations.filter(formation => {
    const matchesSearch = formation.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formation.contenu.toLowerCase().includes(searchTerm.toLowerCase());
    const formationCategory = (formation as any).category_id || (formation as any).categoryId || null;
    const matchesCategory = selectedCategory === null ? true : (formationCategory === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Pagination for formations
  const totalPages = Math.max(1, Math.ceil(filteredFormations.length / itemsPerPage));
  const paginatedFormations = filteredFormations.slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage);

  const handleInscription = (formation: Formation) => {
    navigate(`/inscription/${formation.id}`);
  };

  const handleViewMore = (formation: Formation) => {
    setSelectedFormation(formation);
    setShowDetailsModal(true);
  };

  const getFormationTitle = (inscription: Inscription) => {
    // Prefer the joined relation `formation` if present
    if (inscription.formation && inscription.formation.titre) return inscription.formation.titre;
    // Otherwise fallback to matching by formation_id in local state
    if (inscription.formation_id) {
      const f = formations.find(frm => frm.id === inscription.formation_id || (frm as any).id);
      if (f) return (f as any).titre || (f as any).titre || 'N/A';
    }
    return 'N/A';
  };


  return (
    <div className="min-h-screen flex flex-col bg-background pt-0">
      <Navbar />
      
      {/* Modal détails de formation */}
      {showDetailsModal && selectedFormation && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-card rounded-2xl shadow-lg max-w-lg w-full p-6 border border-border max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-card-foreground pr-4">{selectedFormation.titre}</h2>
              <button onClick={() => setShowDetailsModal(false)} className="text-muted-foreground hover:text-foreground text-2xl">×</button>
            </div>
            <p className="text-muted-foreground mb-6">{selectedFormation.contenu}</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  setShowDetailsModal(false);
                  handleInscription(selectedFormation);
                }}
                className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
              >
                S'inscrire
              </button>
              <button 
                className="w-full px-4 py-3 rounded-lg bg-muted text-muted-foreground font-semibold hover:bg-muted/80 transition" 
                onClick={() => setShowDetailsModal(false)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Barre de recherche sticky (collée au header) */}
      <div ref={searchBarRef} className="sticky z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 py-4 px-4 shadow-sm" style={{ top: 'var(--nav-h)' }}>
        <div className="container mx-auto max-w-6xl flex items-center gap-4">
          {/* Barre de recherche */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary" size={18} />
            <input
              type="text"
              placeholder="Rechercher une formation..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              className="w-full pl-12 pr-32 py-3 rounded-full border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground bg-white shadow-sm hover:shadow-md transition"
            />
          </div>

          {/* Bouton filtres */}
          <div className="relative">
            <button onClick={() => setFiltersOpen(v => !v)} className="px-4 py-2 rounded-full bg-slate-100 text-foreground hover:bg-slate-200 transition flex items-center gap-2">
              Filtres
            </button>
            {filtersOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-100 p-3">
                <div className="text-sm font-semibold mb-2">Catégories</div>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => { setSelectedCategory(null); setFiltersOpen(false); setPage(1); }} 
                    className={`text-left px-3 py-2 rounded-md ${selectedCategory === null ? 'bg-primary text-primary-foreground' : 'hover:bg-slate-50'}`}
                  >
                    Toutes les catégories
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => { setSelectedCategory(cat.id); setFiltersOpen(false); setPage(1); }} 
                      className={`text-left px-3 py-2 rounded-md ${selectedCategory === cat.id ? 'bg-primary text-primary-foreground' : 'hover:bg-slate-50'}`}
                    >
                      {cat.nom}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Spacer to ensure main content is not hidden behind the sticky search bar */}
      <div aria-hidden style={{ height: searchBarHeight }} />
      {/* Grille des formations */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Onglets */}
       

        {/* Contenu des onglets */}
        {activeTab === 'formations' ? (
          <>
        {isLoading && (
          <div className="col-span-full text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground font-medium">Chargement des formations...</p>
          </div>
        )}
        {error && (
          <div className="text-center py-20">
            <div className="bg-destructive/10 border border-destructive/30 text-destructive px-6 py-4 rounded-lg max-w-md mx-auto mb-4">
              <p className="font-semibold mb-2">Erreur</p>
              <p>{error}</p>
            </div>
            <button 
              onClick={fetchFormations}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition shadow-md"
            >
              Réessayer
            </button>
          </div>
        )}
        {!isLoading && !error && formations.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="mx-auto h-16 w-16 text-primary/40 mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Aucune formation disponible</h2>
            <p className="text-muted-foreground">Les formations seront disponibles bientôt.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-muted-foreground font-medium">
                {filteredFormations.length} formation{filteredFormations.length > 1 ? 's' : ''} trouvée{filteredFormations.length > 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedFormations.map((formation, index) => (
                <motion.div
                  key={formation.id}
                  className="bg-white rounded-xl border border-slate-100 shadow-md overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-56 bg-slate-100">
                    {(formation as any).image_url || (formation as any).imageUrl ? (
                      <img 
                        src={(formation as any).image_url || (formation as any).imageUrl} 
                        alt={formation.titre} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-mosala-green-100 to-slate-100 flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-mosala-green-300/60" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-mosala-green-600 transition-colors">
                      {formation.titre}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">
                      {formation.contenu}
                    </p>
                    
                    {/* Actions */}
                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={() => handleInscription(formation)}
                        className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-mosala-green-600 to-mosala-green-700 hover:from-mosala-green-700 hover:to-mosala-green-800 text-white font-semibold transition transform hover:scale-105 shadow-md"
                      >
                        S'inscrire
                      </button>
                      <button
                        onClick={() => setExpandedId(expandedId === formation.id ? null : formation.id)}
                        className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-slate-100 to-slate-50 hover:from-slate-200 hover:to-slate-100 text-foreground font-semibold transition flex items-center gap-1 shadow-sm"
                        aria-expanded={expandedId === formation.id}
                        title="Plus d'informations"
                      >
                        <ChevronRight className={`w-4 h-4 transition-transform ${expandedId === formation.id ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                    {expandedId === formation.id && (
                      <div id={`formation-${formation.id}-details`} className="mt-4 bg-slate-50 p-4 rounded-md border border-slate-100">
                        <p className="text-sm text-gray-700">{formation.contenu}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <button onClick={() => setPage(p => Math.max(1, p-1))} className="px-3 py-2 rounded-md bg-slate-100 hover:bg-slate-200">Préc</button>
                <div className="text-sm">Page {page} / {totalPages}</div>
                <button onClick={() => setPage(p => Math.min(totalPages, p+1))} className="px-3 py-2 rounded-md bg-slate-100 hover:bg-slate-200">Suiv</button>
              </div>
            )}
          </>
        )}
          </>
        ) : (
          // Onglet Inscriptions
          <div>
            {inscriptions.length === 0 ? (
              <div className="text-center py-20">
                <Users className="mx-auto h-16 w-16 text-primary/40 mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Aucune inscription</h2>
                <p className="text-muted-foreground">Aucune inscription n'a été enregistrée pour le moment.</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-muted-foreground font-medium">
                    {inscriptions.length} inscription{inscriptions.length > 1 ? 's' : ''} au total
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow border border-slate-100 overflow-x-auto">
                  <table className="w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Nom & Prénom</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Téléphone</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Formation</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Ville</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {paginatedInscriptions.map((inscription) => (
                        <tr key={inscription.id} className="hover:bg-slate-50 transition">
                          <td className="px-6 py-4 text-sm text-foreground font-medium">
                            {inscription.prenom} {inscription.nom}
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{inscription.email}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{inscription.tel}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{getFormationTitle(inscription)}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{inscription.ville}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {new Date(inscription.date_inscription).toLocaleDateString('fr-FR')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination Controls for Inscriptions */}
                {totalInscriptionsPages > 1 && (
                  <div className="flex items-center justify-center gap-3 mt-8">
                    <button onClick={() => setInscriptionsPage(p => Math.max(1, p-1))} className="px-3 py-2 rounded-md bg-slate-100 hover:bg-slate-200">Préc</button>
                    <div className="text-sm">Page {inscriptionsPage} / {totalInscriptionsPages}</div>
                    <button onClick={() => setInscriptionsPage(p => Math.min(totalInscriptionsPages, p+1))} className="px-3 py-2 rounded-md bg-slate-100 hover:bg-slate-200">Suiv</button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Formations;