import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  User,
  BookOpen,
  FileText,
  Video,
  Download
} from "lucide-react";

const BlogSection = () => {
  const featuredArticles = [
    {
      id: 1,
      title: "Comment réussir son entretien d'embauche en Afrique",
      excerpt: "Découvrez les meilleures pratiques pour impressionner les recruteurs et décrocher le poste de vos rêves.",
      category: "Carrière",
      author: "Maria SAMBA",
      date: "15 Mars 2024",
      readTime: "5 min",
      image: "/blog/entretien-embauche.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Les métiers les plus demandés en 2024",
      excerpt: "Explorez les secteurs qui recrutent le plus et les compétences les plus recherchées sur le marché africain.",
      category: "Tendances",
      author: "Kofi Mensah",
      date: "12 Mars 2024",
      readTime: "7 min",
      image: "/blog/metiers-demande.jpg",
      featured: false
    },
    {
      id: 3,
      title: "Créer un CV qui se démarque",
      excerpt: "Guide complet pour rédiger un CV professionnel qui attire l'attention des recruteurs.",
      category: "Conseils",
      author: "Aisha Oumar",
      date: "10 Mars 2024",
      readTime: "6 min",
      image: "/blog/cv-demarque.jpg",
      featured: false
    }
  ];

  const resources = [
    {
      title: "Guide de rédaction de CV",
      type: "PDF",
      icon: <FileText className="h-6 w-6" />,
      downloads: "2,500+",
      color: "from-[#BFFF00] to-[#A3E600]"
    },
    {
      title: "Template CV professionnel",
      type: "Template",
      icon: <Download className="h-6 w-6" />,
      downloads: "1,800+",
      color: "from-[#FFD500] to-[#FFC000]"
    },
    {
      title: "Guide de préparation entretien",
      type: "PDF",
      icon: <BookOpen className="h-6 w-6" />,
      downloads: "1,200+",
      color: "from-[#BFFF00] to-[#A3E600]"
    },
    {
      title: "Webinaire : Négocier son salaire",
      type: "Vidéo",
      icon: <Video className="h-6 w-6" />,
      downloads: "800+",
      color: "from-[#FFD500] to-[#FFC000]"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ressources et{" "}
            <span className="bg-gradient-to-r from-[#BFFF00] to-[#FFD500] text-transparent bg-clip-text">
              conseils
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos articles, guides et ressources pour booster votre carrière et réussir professionnellement
          </p>
        </motion.div>

        {/* Article en vedette */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {featuredArticles.filter(article => article.featured).map((article) => (
            <Link key={article.id} to={`/blog/${article.id}`}>
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div className="h-64 md:h-full bg-gradient-to-br from-[#BFFF00]/20 to-[#FFD500]/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">📝</div>
                        <p className="text-gray-600">Image de l'article</p>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8 md:p-12">
                    <div className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      {article.category}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {article.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {article.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {article.readTime}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-[#005F25] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      Lire l'article complet
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Autres articles */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Articles récents</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredArticles.filter(article => !article.featured).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link to={`/blog/${article.id}`}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
                    <div className="h-48 bg-gradient-to-br from-[#BFFF00]/10 to-[#FFD500]/10 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📄</div>
                        <p className="text-gray-600 text-sm">Image de l'article</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                        {article.category}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#005F25] transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{article.author}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ressources téléchargeables */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Ressources gratuites</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#BFFF00]/20">
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${resource.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {resource.icon}
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-[#005F25] transition-colors">
                    {resource.title}
                  </h4>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{resource.type}</span>
                    <span>{resource.downloads} téléchargements</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-[#BFFF00] to-[#FFD500] text-[#005F25] font-semibold hover:shadow-lg transition-all duration-300">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA pour le blog */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link to="/blog">
            <Button className="bg-gradient-to-r from-[#BFFF00] to-[#FFD500] text-[#005F25] font-bold px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 text-lg">
              <BookOpen className="h-5 w-5 mr-2" />
              Voir tous les articles
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection; 