import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Blog = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 prose prose-mosala max-w-3xl">
        <h1>Blog Mosala</h1>
        <p>Bienvenue sur le blog de Mosala ! Retrouvez ici toutes les actualités, conseils et bonnes pratiques pour optimiser votre carrière, découvrir les tendances du marché de l’emploi au Congo et préparer au mieux vos entretiens et candidatures.</p>
        <hr />
        <h2>Articles récents</h2>
        <h3>1. 7 astuces pour rendre votre profil irrésistible</h3>
        <p>Découvrez des conseils pratiques pour mettre en valeur vos compétences, structurer votre CV et capter l’attention des recruteurs dès les premières secondes.</p>
        <h3>2. Les secteurs porteurs en 2025 au Congo</h3>
        <p>Analyse des filières en croissance : agritech, numérique, artisanat digital, énergies renouvelables… Identifiez les opportunités qui correspondent à votre profil.</p>
        <h3>3. Réussir son entretien à distance</h3>
        <p>Préparez-vous efficacement aux entretiens en visioconférence : environnement, posture, gestion du stress et réponses aux questions pièges.</p>
        <h3>4. Témoignages inspirants de la diaspora congolaise</h3>
        <p>Parcours de Congolais ayant réussi à l’étranger : leurs conseils, défis surmontés et le rôle de Mosala dans leur success story.</p>
        <h3>5. Comment utiliser la Caravane Mosala</h3>
        <p>Guide pratique pour participer aux étapes de la Caravane : inscription offline, ateliers CV, simulations d’entretien et networking local.</p>
        <hr />
        <h2>Catégories</h2>
        <ul>
          <li><strong>Carrière & CV</strong></li>
          <li><strong>Marché de l’emploi</strong></li>
          <li><strong>Témoignages</strong></li>
          <li><strong>Événements & Caravane</strong></li>
          <li><strong>Conseils Tech & PWA</strong></li>
        </ul>
        <hr />
        <h2>Abonnez-vous</h2>
        {subscribed ? (
          <div className="bg-mosala-green/10 border border-mosala-green text-mosala-dark p-4 rounded-xl mb-4">Merci pour votre inscription !</div>
        ) : (
          <form className="blog-newsletter flex gap-2 mb-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="votre.email@exemple.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit">S’abonner</Button>
          </form>
        )}
        <div className="text-sm text-muted-foreground mt-8">© 2025 Mosala • mosala.org<br />Suivez-nous : Facebook • Twitter • Instagram • LinkedIn</div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog; 