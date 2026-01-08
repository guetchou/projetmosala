import { useState, useEffect } from "react";
import { useBlog, useBlogByCategory } from "@/hooks/useBlog";
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
  ChevronUp,
  ExternalLink
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

const CATEGORIES = [
  { id: "all", label: "Toutes les catégories", icon: TrendingUp, count: 0 },
  { id: "À la une", label: "À la une", icon: TrendingUp, count: 0, color: "bg-red-500" },
  { id: "Partenariats", label: "Partenariats", icon: Globe, count: 0, color: "bg-blue-500" },
  { id: "Caravane", label: "Caravane", icon: Users, count: 0, color: "bg-orange-500" },
  { id: "Formation", label: "Formation", icon: BookOpen, count: 0, color: "bg-green-500" },
  { id: "Inclusion", label: "Inclusion", icon: Users, count: 0, color: "bg-pink-500" },
  { id: "Conseils", label: "Conseils", icon: Briefcase, count: 0, color: "bg-purple-500" },
  { id: "Marché de l'emploi", label: "Marché de l'emploi", icon: TrendingUp, count: 0, color: "bg-indigo-500" }
];

const SORT_OPTIONS = [
  { value: "latest", label: "Plus récents" },
  { value: "oldest", label: "Plus anciens" },
  { value: "popular", label: "Plus populaires" },
  { value: "trending", label: "Tendances" }
];

const Blog = () => {
  const { data: allPosts = [], isLoading } = useBlog();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [showFilters, setShowFilters] = useState(false);

  // Filtrer les posts selon la catégorie sélectionnée
  const filteredPosts = selectedCategory === "all" 
    ? allPosts 
    : allPosts.filter(post => post.category === selectedCategory);

  // Recherche dans les posts filtrés
  const searchedPosts = filteredPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Trier les posts
  const sortedPosts = [...searchedPosts].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "popular":
        return (b.views || 0) - (a.views || 0);
      case "trending":
        return (b.likes || 0) - (a.likes || 0);
      default:
        return 0;
    }
  });

  // Calculer le nombre de posts par catégorie
  useEffect(() => {
    CATEGORIES.forEach(cat => {
      if (cat.id === "all") {
        cat.count = allPosts.length;
      } else {
        cat.count = allPosts.filter(post => post.category === cat.id).length;
      }
    });
  }, [allPosts]);

  const handleLike = (postId: string) => {
    // TODO: Implémenter la logique de like
    console.log("Like post:", postId);
  };

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      });
    } else {
      // Fallback: copier le lien
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleExternalLink = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 font-bold uppercase tracking-widest mb-4">
            Blog Officiel
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            Le Journal Mosala
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Actualités officielles, résultats de la caravane, partenariats stratégiques et conseils pour l'insertion professionnelle des jeunes congolais.
          </p>
        </div>

        {/* Filtres et recherche */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Barre de recherche */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* Bouton filtres */}
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border-gray-200 hover:border-blue-500"
            >
              <Filter className="w-4 h-4" />
              Filtres
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>

          {/* Panneau de filtres */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
              >
                {/* Catégories */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Catégories</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {CATEGORIES.map((category) => (
                      <Button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        className={`justify-start gap-2 ${selectedCategory === category.id ? 'bg-blue-600 text-white' : 'border-gray-200 hover:border-blue-500'}`}
                      >
                        <category.icon className="w-4 h-4" />
                        {category.label}
                        <Badge variant="secondary" className="ml-auto">
                          {category.count}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Tri */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Trier par</h3>
                  <div className="flex flex-wrap gap-3">
                    {SORT_OPTIONS.map((option) => (
                      <Button
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        variant={sortBy === option.value ? "default" : "outline"}
                        className={sortBy === option.value ? 'bg-blue-600 text-white' : 'border-gray-200 hover:border-blue-500'}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Résultats */}
        {isLoading ? (
          <div className="text-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des articles...</p>
          </div>
        ) : sortedPosts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">Aucun article trouvé.</p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="mt-4"
            >
              Voir tous les articles
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="group"
              >
                <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <AspectRatio ratio={16 / 9}>
                    <div className="relative w-full h-full">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/topcenter-uploads/default-news.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                          {post.category}
                        </Badge>
                      </div>
                      {post.externalLink && (
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-white/90 text-gray-700">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Externe
                          </Badge>
                        </div>
                      )}
                    </div>
                  </AspectRatio>

                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                      <span className="mx-2">•</span>
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>

                    <h3 className="font-bold text-xl mb-3 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Statistiques */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {post.likes || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime || 5} min
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleLike(post.id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleShare(post)}
                          className="text-gray-500 hover:text-blue-500"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {post.externalLink ? (
                        <Button
                          onClick={() => handleExternalLink(post.externalLink!)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Lire l'article officiel
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          asChild
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <a href={`/blog/${post.id}`}>
                            Lire la suite
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination ou "Voir plus" */}
        {sortedPosts.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Affichage de {sortedPosts.length} article{sortedPosts.length > 1 ? 's' : ''} sur {allPosts.length}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Blog; 