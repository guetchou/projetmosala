
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, MapPin } from "lucide-react";

const AdvancedSearch = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
      <div className="flex flex-col items-center mb-8">
        <Search className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text">Recherche avancée</h1>
        <p className="text-lg text-[#F5F5F7] text-center mb-4">Trouvez l'emploi idéal grâce à des filtres intelligents et une recherche par mots-clés, secteur, localisation…</p>
      </div>
      <form className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col gap-4">
        <label className="font-semibold text-mosala-dark">Mots-clés</label>
        <input type="text" placeholder="Ex : développeur, marketing…" className="input input-bordered" />
        <label className="font-semibold text-mosala-dark">Localisation</label>
        <div className="flex gap-2 items-center">
          <MapPin className="h-5 w-5 text-primary" />
          <input type="text" placeholder="Ville, région…" className="input input-bordered flex-1" />
        </div>
        <label className="font-semibold text-mosala-dark">Type de contrat</label>
        <select className="input input-bordered">
          <option>CDI</option>
          <option>CDD</option>
          <option>Stage</option>
          <option>Freelance</option>
        </select>
        <button type="submit" className="btn bg-gradient-primary text-white mt-4">Rechercher</button>
      </form>
    </main>
    <Footer />
  </div>
);

export default AdvancedSearch;
