import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Same posts array as in Blog.tsx (in real app, import from shared data or fetch from API)
const posts = [
  {
    id: "1",
    title: "7 astuces pour rendre votre profil irrésistible",
    excerpt: "Découvrez des conseils pratiques pour mettre en valeur vos compétences, structurer votre CV et capter l’attention des recruteurs dès les premières secondes.",
    date: "2024-06-01",
    image: "/topcenter-uploads/5bb30d09-549a-4a0a-bac8-8d0a4676c344.png",
    category: "Carrière & CV",
    author: "Équipe Mosala"
  },
  {
    id: "2",
    title: "Les secteurs porteurs en 2025 au Congo",
    excerpt: "Analyse des filières en croissance : agritech, numérique, artisanat digital, énergies renouvelables… Identifiez les opportunités qui correspondent à votre profil.",
    date: "2024-05-20",
    image: "/topcenter-uploads/06fd503e-1c4b-4b64-b908-766845da8a33.png",
    category: "Marché de l’emploi",
    author: "Équipe Mosala"
  },
  {
    id: "3",
    title: "Réussir son entretien à distance",
    excerpt: "Préparez-vous efficacement aux entretiens en visioconférence : environnement, posture, gestion du stress et réponses aux questions pièges.",
    date: "2024-05-10",
    image: "/topcenter-uploads/1a173991-3aff-4b03-90e4-b87e9603efd0.png",
    category: "Carrière & CV",
    author: "Équipe Mosala"
  },
  {
    id: "4",
    title: "Témoignages inspirants de la diaspora congolaise",
    excerpt: "Parcours de Congolais ayant réussi à l’étranger : leurs conseils, défis surmontés et le rôle de Mosala dans leur success story.",
    date: "2024-04-28",
    image: "/topcenter-uploads/dc40e710-f029-4dbb-9fbd-593f85573051.png",
    category: "Témoignages",
    author: "Équipe Mosala"
  },
  {
    id: "5",
    title: "Comment utiliser la Caravane Mosala",
    excerpt: "Guide pratique pour participer aux étapes de la Caravane : inscription offline, ateliers CV, simulations d’entretien et networking local.",
    date: "2024-04-15",
    image: "/topcenter-uploads/264fe1f1-8c99-414c-97df-7ea214db45d2.png",
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
          <Link to="/blog" className="text-[var(--color-mosala-green-500)] underline">Retour au blog</Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Pagination/infinite scroll mock (articles suivants)
  const nextPosts = posts.filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F9FC] via-[#E9F7EF] to-[#FFFBEA] flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-start pt-28 pb-16 px-4">
        <div className="w-full max-w-5xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#005F25] hover:underline mb-8 font-semibold">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Retour au blog
          </Link>
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-white/90 backdrop-blur-xl border-2 border-[#BFFF00]/30 mb-12 glassmorphism-depth">
            <img src={post.image} alt={post.title} className="w-full h-96 object-cover object-center rounded-t-3xl" />
            <div className="p-10 md:p-16">
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarFallback>{post.author.split(' ').map(w => w[0]).join('').slice(0,2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold text-[#005F25] text-lg">{post.author}</span>
                    <span className="text-xs text-[#22304a]/70">{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <span className="px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-[#BFFF00]/40 to-[#FFD500]/40 text-[#005F25] shadow border border-[#BFFF00]/30 w-fit">{post.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-[#22304a] mb-6 drop-shadow-xl leading-tight">{post.title}</h1>
              <div className="prose prose-lg prose-mosala max-w-none text-[#22304a]/90 mb-10">
                <p>{post.excerpt}</p>
              </div>
              {/* Section commentaires (mock) */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-[#005F25]">Commentaires</h2>
                <div className="space-y-6">
                  <div className="flex gap-3 items-start">
                    <Avatar className="w-10 h-10"><AvatarFallback>JD</AvatarFallback></Avatar>
                    <div className="bg-[#E9F7EF] rounded-xl p-4 shadow text-[#22304a]">
                      <div className="font-semibold mb-1">Jean D.</div>
                      <div>Bravo pour cet article, très utile pour les jeunes en recherche d’emploi !</div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Avatar className="w-10 h-10"><AvatarFallback>AM</AvatarFallback></Avatar>
                    <div className="bg-[#FFFBEA] rounded-xl p-4 shadow text-[#22304a]">
                      <div className="font-semibold mb-1">Aline M.</div>
                      <div>Merci pour les conseils, j’ai pu améliorer mon CV grâce à Mosala !</div>
                    </div>
                  </div>
                </div>
                <form className="mt-8 flex gap-3">
                  <Avatar className="w-10 h-10"><AvatarFallback>VO</AvatarFallback></Avatar>
                  <input type="text" placeholder="Ajouter un commentaire..." className="flex-1 px-4 py-3 rounded-full border border-[#BFFF00]/30 bg-white/80 shadow focus:outline-none focus:ring-2 focus:ring-[#BFFF00]/30" />
                  <Button type="submit" className="bg-gradient-to-r from-[#005F25] to-[#BFFF00] text-white font-bold px-8 py-3 rounded-full shadow hover:from-[#004A1E] hover:to-[#FFD500] transition-all">Commenter</Button>
                </form>
              </div>
            </div>
          </div>
          {/* Articles suivants */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-[#005F25]">Articles suivants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {nextPosts.map((p) => (
                <Link to={`/blog/${p.id}`} key={p.id} className="group rounded-2xl overflow-hidden shadow-lg bg-white/90 border-2 border-[#BFFF00]/30 hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col">
                  <img src={p.image} alt={p.title} className="h-40 w-full object-cover" />
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-xs font-semibold bg-gradient-to-r from-[#BFFF00]/40 to-[#FFD500]/40 text-[#005F25] px-3 py-1 rounded-full shadow mb-2 w-fit">{p.category}</span>
                    <h3 className="text-lg font-bold text-[#22304a] mb-1 group-hover:text-[#005F25] transition-colors line-clamp-2">{p.title}</h3>
                    <span className="text-xs text-[#22304a]/60">{new Date(p.date).toLocaleDateString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* Bouton écrire un article (admin/demo) */}
          <div className="flex justify-end mt-12">
            <Button className="bg-gradient-to-r from-[#005F25] to-[#BFFF00] text-white font-bold px-10 py-4 rounded-full shadow hover:from-[#004A1E] hover:to-[#FFD500] transition-all text-lg">Écrire un article</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost; 