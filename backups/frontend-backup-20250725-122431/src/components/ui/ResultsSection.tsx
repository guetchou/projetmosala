import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, MapPin, Building, Clock, Star, Users, Briefcase } from "lucide-react";

interface SearchResult {
  id: string;
  type: "job" | "formation" | "candidate" | "company";
  title: string;
  description: string;
  location?: string;
  company?: string;
  salary?: string;
  duration?: string;
  level?: string;
  rating?: number;
  applicants?: number;
  postedDate: string;
  tags: string[];
  image?: string;
}

interface FilterOptions {
  type: string;
  location: string;
  category: string;
  experience: string;
  salary: string;
}

export default function ResultsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    type: "all",
    location: "all",
    category: "all",
    experience: "all",
    salary: ""
  });
  const [activeTab, setActiveTab] = useState("jobs");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock data
  const mockResults: SearchResult[] = [
    {
      id: "1",
      type: "job",
      title: "Développeur Frontend React",
      description: "Nous recherchons un développeur frontend expérimenté pour rejoindre notre équipe...",
      location: "Paris, France",
      company: "TechCorp",
      salary: "45k-65k €",
      postedDate: "2024-01-15",
      tags: ["React", "TypeScript", "Frontend"],
      rating: 4.5,
      applicants: 12
    },
    {
      id: "2",
      type: "formation",
      title: "Formation Développement Web",
      description: "Formation complète en développement web moderne...",
      duration: "6 mois",
      level: "Débutant",
      postedDate: "2024-01-14",
      tags: ["HTML", "CSS", "JavaScript"],
      rating: 4.8
    },
    {
      id: "3",
      type: "candidate",
      title: "Marie Dupont",
      description: "Développeuse Full Stack avec 5 ans d'expérience...",
      location: "Lyon, France",
      postedDate: "2024-01-13",
      tags: ["React", "Node.js", "Python"],
      rating: 4.7
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simuler une recherche
    setTimeout(() => {
      setResults(mockResults.filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase())
      ));
      setLoading(false);
    }, 500);
  }, [searchQuery, filters]);

  const getResultIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "job":
        return <Briefcase className="w-4 h-4" />;
      case "formation":
        return <Clock className="w-4 h-4" />;
      case "candidate":
        return <Users className="w-4 h-4" />;
      case "company":
        return <Building className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  const getResultColor = (type: SearchResult["type"]) => {
    switch (type) {
      case "job":
        return "bg-blue-100 text-blue-800";
      case "formation":
        return "bg-green-100 text-green-800";
      case "candidate":
        return "bg-purple-100 text-purple-800";
      case "company":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return "Aujourd'hui";
    } else if (diffInDays === 1) {
      return "Hier";
    } else if (diffInDays < 7) {
      return `Il y a ${diffInDays} jours`;
    } else {
      return date.toLocaleDateString("fr-FR");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Résultats de recherche
        </h2>
        <p className="text-gray-600 text-sm">
          {results.length} résultat{results.length !== 1 ? 's' : ''} trouvé{results.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {/* Search Bar */}
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher emplois, formations, candidats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border-2 border-gray-200 focus:border-[#2D8A5C]"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
            <SelectTrigger className="border-2 border-gray-200 focus:border-[#2D8A5C]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="jobs">Emplois</SelectItem>
              <SelectItem value="formations">Formations</SelectItem>
              <SelectItem value="candidates">Candidats</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.location} onValueChange={(value) => setFilters({...filters, location: value})}>
            <SelectTrigger className="border-2 border-gray-200 focus:border-[#2D8A5C]">
              <SelectValue placeholder="Localisation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="paris">Paris</SelectItem>
              <SelectItem value="lyon">Lyon</SelectItem>
              <SelectItem value="marseille">Marseille</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
            <SelectTrigger className="border-2 border-gray-200 focus:border-[#2D8A5C]">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="tech">Technologie</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Ventes</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.experience} onValueChange={(value) => setFilters({...filters, experience: value})}>
            <SelectTrigger className="border-2 border-gray-200 focus:border-[#2D8A5C]">
              <SelectValue placeholder="Expérience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="junior">Junior</SelectItem>
              <SelectItem value="mid">Intermédiaire</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="jobs" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Emplois
          </TabsTrigger>
          <TabsTrigger value="formations" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Formations
          </TabsTrigger>
          <TabsTrigger value="candidates" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Candidats
          </TabsTrigger>
          <TabsTrigger value="companies" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Entreprises
          </TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="mt-4">
          <div className="grid gap-4">
            {loading ? (
              <div className="text-center py-6">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600 text-sm">Recherche en cours...</p>
              </div>
            ) : (
              results.filter(result => result.type === "job").map((result) => (
                <Card key={result.id} className="hover:shadow-lg transition-shadow border-2 border-gray-200 hover:border-[#BFFF00]">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={getResultColor(result.type)}>
                            {getResultIcon(result.type)}
                            Emploi
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {formatDate(result.postedDate)}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {result.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-3 text-sm">
                          {result.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                          {result.company && (
                            <span className="flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              {result.company}
                            </span>
                          )}
                          {result.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {result.location}
                            </span>
                          )}
                          {result.salary && (
                            <span className="text-green-600 font-medium">
                              {result.salary}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          {result.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-[#2D8A5C] text-[#2D8A5C]">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs">
                            {result.rating && (
                              <span className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                {result.rating}
                              </span>
                            )}
                            {result.applicants && (
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {result.applicants} candidat{result.applicants !== 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">
                              Voir détails
                            </Button>
                            <Button size="sm" className="bg-gray-700 text-white hover:bg-gray-600">
                              Postuler
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="formations" className="mt-6">
          <div className="grid gap-4">
            {results.filter(result => result.type === "formation").map((result) => (
              <Card key={result.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={getResultColor(result.type)}>
                          {getResultIcon(result.type)}
                          Formation
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {formatDate(result.postedDate)}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {result.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4">
                        {result.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        {result.duration && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {result.duration}
                          </span>
                        )}
                        {result.level && (
                          <span className="text-blue-600 font-medium">
                            {result.level}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        {result.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          {result.rating && (
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              {result.rating}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Voir détails
                          </Button>
                          <Button size="sm">
                            S'inscrire
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="candidates" className="mt-6">
          <div className="grid gap-4">
            {results.filter(result => result.type === "candidate").map((result) => (
              <Card key={result.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={getResultColor(result.type)}>
                          {getResultIcon(result.type)}
                          Candidat
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {formatDate(result.postedDate)}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {result.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4">
                        {result.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        {result.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {result.location}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        {result.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          {result.rating && (
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              {result.rating}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Voir profil
                          </Button>
                          <Button size="sm">
                            Contacter
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="companies" className="mt-6">
          <div className="text-center py-8 text-gray-500">
            Aucune entreprise trouvée pour cette recherche.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 