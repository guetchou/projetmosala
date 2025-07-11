import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";

// Same posts array as in Blog.tsx (in real app, import from shared data or fetch from API)
const posts = [
  {
    id: "1",
    title: "7 astuces pour rendre votre profil irrésistible",
    excerpt: "Découvrez des conseils pratiques pour mettre en valeur vos compétences, structurer votre CV et capter l’attention des recruteurs dès les premières secondes.",
    date: "2024-06-01",
    image: "/lovable-uploads/5bb30d09-549a-4a0a-bac8-8d0a4676c344.png",
    category: "Carrière & CV",
    author: "Équipe Mosala"
  },
  {
    id: "2",
    title: "Les secteurs porteurs en 2025 au Congo",
    excerpt: "Analyse des filières en croissance : agritech, numérique, artisanat digital, énergies renouvelables… Identifiez les opportunités qui correspondent à votre profil.",
    date: "2024-05-20",
    image: "/lovable-uploads/06fd503e-1c4b-4b64-b908-766845da8a33.png",
    category: "Marché de l’emploi",
    author: "Équipe Mosala"
  },
  {
    id: "3",
    title: "Réussir son entretien à distance",
    excerpt: "Préparez-vous efficacement aux entretiens en visioconférence : environnement, posture, gestion du stress et réponses aux questions pièges.",
    date: "2024-05-10",
    image: "/lovable-uploads/1a173991-3aff-4b03-90e4-b87e9603efd0.png",
    category: "Carrière & CV",
    author: "Équipe Mosala"
  },
  {
    id: "4",
    title: "Témoignages inspirants de la diaspora congolaise",
    excerpt: "Parcours de Congolais ayant réussi à l’étranger : leurs conseils, défis surmontés et le rôle de Mosala dans leur success story.",
    date: "2024-04-28",
    image: "/lovable-uploads/dc40e710-f029-4dbb-9fbd-593f85573051.png",
    category: "Témoignages",
    author: "Équipe Mosala"
  },
  {
    id: "5",
    title: "Comment utiliser la Caravane Mosala",
    excerpt: "Guide pratique pour participer aux étapes de la Caravane : inscription offline, ateliers CV, simulations d’entretien et networking local.",
    date: "2024-04-15",
    image: "/lovable-uploads/264fe1f1-8c99-414c-97df-7ea214db45d2.png",
    category: "Événements & Caravane",
    author: "Équipe Mosala"
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-mosala-red-500 mb-4">Article introuvable</h1>
          <Link to="/blog" className="text-mosala-blue-500 underline">Retour au blog</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
        <Link to="/blog" className="text-mosala-blue-500 hover:underline mb-4 inline-block">← Retour au blog</Link>
        <div className="rounded-xl overflow-hidden shadow-lg bg-white/90 border border-gray-100 mb-6">
          <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-mosala-blue-500 bg-mosala-blue-100 rounded-full px-3 py-1">{post.category}</span>
              <span className="text-xs text-gray-400 ml-auto">{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <h1 className="text-2xl font-bold text-mosala-dark mb-4">{post.title}</h1>
            <div className="text-sm text-mosala-dark-400 mb-4">Par {post.author}</div>
            <div className="prose prose-mosala max-w-none text-mosala-dark-700">
              {/* Replace with real content in the future */}
              <p>{post.excerpt}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost; 