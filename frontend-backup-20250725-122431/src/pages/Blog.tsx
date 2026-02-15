import { useState, useEffect } from "react";
import { useBlog } from "@/hooks/useBlog";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Clock, 
  User, 
  Heart, 
  Share2, 
  Eye, 
  TrendingUp, 
  BookOpen, 
  Briefcase, 
  Users, 
  Globe,
  Calendar,
  Tag,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogPost } from "@/types/global";

// Catégories inspirées des grands médias
const posts = [
  {
    id: "1",
    title: "7 astuces pour rendre votre profil irrésistible",
    excerpt: "Découvrez des conseils pratiques pour mettre en valeur vos compétences, structurer votre CV et capter l’attention des recruteurs dès les premières secondes.",
    date: "2024-06-01",
    image: "/topcenter-uploads/5bb30d09-549a-4a0a-bac8-8d0a4676c344.png",
    category: "Carrière & CV",
    author: "Équipe Mosala",
    content: "Contenu de l'article...",
    tags: ["CV", "Carrière"],
    readTime: 4,
    views: 120,
    likes: 12
  },
  // Ajoute d'autres articles mock ici si besoin
];

const CATEGORIES = [
  { id: "all", label: "Toutes les catégories", icon: TrendingUp, count: 0 },
  { id: "breaking", label: "À la une", icon: TrendingUp, count: 0, color: "bg-red-500" },
  { id: "emploi", label: "Emploi", icon: Briefcase, count: 0, color: "bg-blue-500" },
  { id: "formation", label: "Formation", icon: BookOpen, count: 0, color: "bg-green-500" },
  { id: "caravane", label: "Caravane", icon: Users, count: 0, color: "bg-yellow-500" },
  { id: "partenariats", label: "Partenariats", icon: Globe, count: 0, color: "bg-purple-500" }
];

const SORT_OPTIONS = [
  { value: "latest", label: "Plus récents" },
  { value: "oldest", label: "Plus anciens" },
  { value: "popular", label: "Plus populaires" },
  { value: "trending", label: "Tendances" }
];

const Blog = () => {
  // const { data: posts = [], isLoading } = useBlog();
  const isLoading = false;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [showFilters, setShowFilters] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  // Calculer les compteurs de catégories
  useEffect(() => {
    CATEGORIES.forEach(cat => {
      if (cat.id === "all") {
        cat.count = posts.length;
      } else {
        cat.count = posts.filter(post => 
          post.category.toLowerCase() === cat.id
        ).length;
      }
    });
  }, [posts]);

  // Filtrer et trier les articles
  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || 
                             post.category.toLowerCase() === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "popular":
          return (typeof b.views === 'number' ? b.views : 0) - (typeof a.views === 'number' ? a.views : 0);
        case "trending":
          return (typeof b.likes === 'number' ? b.likes : 0) - (typeof a.likes === 'number' ? a.likes : 0);
        default:
          return 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: `/blog/${post.id}`
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/blog/${post.id}`);
    }
  };

  // Article principal (featured)
  const featuredPost = filteredPosts[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBEA] via-[#FFF6B3] to-[#FFFBEA]">
      <Navbar />
      
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-7xl bg-white/80 rounded-3xl shadow-2xl backdrop-blur-md border border-[var(--color-mosala-green-100)] glass-card">
          {/* Header inspiré NYT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-6 py-3 bg-gray-100 text-gray-700 rounded-full text-sm font-bold mb-6 tracking-wider shadow-lg border border-gray-200">
              Blog & Actualités
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-gray-800 mb-6">
              Le Journal Mosala
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              L'actualité de l'emploi et de la formation au Congo. Informations fiables, analyses approfondies et témoignages de terrain.
            </p>
          </motion.div>

          {/* Barre de recherche et filtres - Style Guardian */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/40 mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Recherche */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Rechercher dans les articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border-[#005F25]/20 focus:border-[#005F25] focus:ring-2 focus:ring-[#BFFF00]/20"
                />
              </div>

              {/* Filtres */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  <Filter className="w-4 h-4" />
                  Filtres
                  {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-400/20"
                >
                  {SORT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filtres étendus */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 pt-6 border-t border-[#005F25]/10"
                >
                  <div className="flex flex-wrap gap-3">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                          selectedCategory === category.id
                            ? "bg-[#005F25] text-white shadow-lg"
                            : "bg-white/60 text-gray-700 hover:bg-white shadow-md"
                        }`}
                      >
                        <category.icon className="w-4 h-4" />
                        {category.label}
                        <Badge className="ml-1 bg-white/20 text-current text-xs">
                          {category.count}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#BFFF00] mx-auto"></div>
              <p className="mt-6 text-gray-600 text-lg">Chargement des articles...</p>
            </div>
          ) : (
            <>
              {/* Article principal (featured) - Style NYT */}
              {featuredPost && currentPage === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mb-16"
                >
                  <Card className="overflow-hidden shadow-2xl bg-white/90 backdrop-blur-md border-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="relative">
                        <AspectRatio ratio={16/9}>
                          <img
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            className="w-full h-full object-cover"
                          />
                        </AspectRatio>
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-red-500 text-white border-0 font-bold px-4 py-2">
                            ARTICLE À LA UNE
                          </Badge>
                        </div>
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {new Date(featuredPost.date).toLocaleDateString('fr-FR', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {featuredPost.author}
                          </div>
                        </div>
                        <h2 className="text-3xl font-bold mb-4 text-gray-800 leading-tight">
                          {featuredPost.title}
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <a
                            href={`/blog/${featuredPost.id}`}
                            className="inline-flex items-center gap-2 bg-[#005F25] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#004A1E] transition-colors"
                          >
                            Lire l'article complet
                            <ArrowRight className="w-4 h-4" />
                          </a>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleLike(featuredPost.id)}
                              className={`p-2 rounded-full transition-all ${
                                likedPosts.has(featuredPost.id) 
                                  ? 'bg-red-500 text-white' 
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${likedPosts.has(featuredPost.id) ? 'fill-current' : ''}`} />
                            </button>
                            <button
                              onClick={() => handleShare(featuredPost)}
                              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Grille d'articles - Style BBC */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-md border-0 overflow-hidden group">
                      <div className="relative overflow-hidden">
                        <AspectRatio ratio={16/9}>
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </AspectRatio>
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-[#BFFF00] text-[#005F25] border-0 font-semibold">
                            {post.category}
                          </Badge>
                        </div>
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleLike(post.id)}
                              className={`p-1 rounded transition-all ${
                                likedPosts.has(post.id) 
                                  ? 'text-red-500' 
                                  : 'text-white hover:text-red-500'
                              }`}
                            >
                              <Heart className={`w-3 h-3 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                              <span className="sr-only">{typeof post.likes === 'number' ? post.likes : 0} likes</span>
                            </button>
                            <button
                              onClick={() => handleShare(post)}
                              className="p-1 rounded text-white hover:text-[#BFFF00] transition-all"
                            >
                              <Share2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3 text-xs text-[#005F25]/60">
                          <Clock className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString('fr-FR', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                          <span className="mx-1">•</span>
                          <Eye className="w-3 h-3" />
                          {typeof post.views === 'number' ? post.views : 0} vues
                        </div>
                        
                        <h3 className="font-bold text-[#005F25] mb-3 line-clamp-2 group-hover:text-[#B8860B] transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-[#005F25]/70 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="bg-[#BFFF00]/20 text-[#005F25] text-xs font-semibold">
                                {post.author.split(' ').map(w => w[0]).join('').slice(0,2)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-[#005F25]/70">{post.author}</span>
                          </div>
                          <a
                            href={`/blog/${post.id}`}
                            className="text-[#BFFF00] font-semibold text-sm hover:text-[#005F25] transition-colors flex items-center gap-1"
                          >
                            Lire
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Pagination - Style Guardian */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex justify-center mt-16"
                >
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="border-[#005F25]/20 text-[#005F25] hover:bg-[#BFFF00]/10"
                    >
                      Précédent
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page 
                          ? "bg-[#005F25] text-white" 
                          : "border-[#005F25]/20 text-[#005F25] hover:bg-[#BFFF00]/10"
                        }
                      >
                        {page}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="border-[#005F25]/20 text-[#005F25] hover:bg-[#BFFF00]/10"
                    >
                      Suivant
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Résultats de recherche */}
              {searchTerm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mt-12 p-6 bg-white/60 rounded-xl"
                >
                  <p className="text-[#005F25]">
                    {filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''} trouvé{filteredPosts.length > 1 ? 's' : ''} pour "{searchTerm}"
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog; 