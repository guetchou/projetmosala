import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useBlog } from "@/hooks/useBlog";
import Loader from "@/components/ui/Loader";
import { BlogPost } from "@/types/entities";

const Blog = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Toutes");
  const { data: posts = [], isLoading, isError } = useBlog();

  const categories = [
    "Toutes",
    ...Array.from(new Set((posts as BlogPost[]).map((p) => p.category)))
  ];

  const filteredPosts = (posts as BlogPost[]).filter(
    (post) =>
      (category === "Toutes" || post.category === category) &&
      (post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-transparent bg-clip-text">Blog Mosala</h1>
        <p className="text-lg text-[var(--color-mosala-dark-50)] mb-8">Actualités, conseils carrière, témoignages et innovations pour booster votre avenir professionnel au Congo.</p>
        {/* Filtres */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <Input
            type="text"
            placeholder="Rechercher un article..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="md:w-72 bg-[var(--color-mosala-white)]/90 border-[var(--color-mosala-green-200)] focus:border-[var(--color-mosala-green-500)] focus:ring-2 focus:ring-[var(--color-mosala-green-100)] text-[var(--color-mosala-dark-900)] shadow-inner"
          />
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={cat === category ? "default" : "outline"}
                className={cat === category ? "bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-[var(--color-mosala-white)] shadow-lg" : "border-[var(--color-mosala-green-200)] text-[var(--color-mosala-green-700)] hover:bg-[var(--color-mosala-green-50)]"}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
        {/* Liste des articles */}
        {isLoading && <Loader label="Chargement des articles..." />}
        {isError && <div className="text-center text-[var(--color-mosala-red-600)] py-12">Erreur lors du chargement des articles.</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(filteredPosts as BlogPost[]).length === 0 && !isLoading && !isError && (
            <div className="col-span-2 text-center text-[var(--color-mosala-dark-200)] py-12">Aucun article trouvé.</div>
          )}
          {(filteredPosts as BlogPost[]).map((post) => (
            <Link
              to={`/blog/${post.id}`}
              key={String(post.id)}
              className="group rounded-xl overflow-hidden shadow-lg bg-[var(--color-mosala-white)]/90 border border-[var(--color-mosala-green-100)] hover:shadow-2xl transition-all flex flex-col"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 flex flex-col p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-[var(--color-mosala-white)] px-3 py-1 rounded-full shadow">{post.category}</span>
                  <span className="text-xs text-[var(--color-mosala-dark-300)] ml-auto">{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <h2 className="text-lg font-bold text-[var(--color-mosala-dark-900)] mb-2 group-hover:text-[var(--color-mosala-green-600)] transition-colors">{post.title}</h2>
                <p className="text-sm text-[var(--color-mosala-dark-400)] mb-4 flex-1">{post.excerpt}</p>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="text-xs text-[var(--color-mosala-dark-300)]">Par {post.author}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog; 