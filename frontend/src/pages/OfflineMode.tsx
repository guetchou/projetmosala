
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WifiOff } from "lucide-react";

const OfflineMode = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl pt-28">
      <div className="flex flex-col items-center mb-8">
        <WifiOff className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text">Mode hors-ligne</h1>
        <p className="text-lg text-[#F5F5F7] text-center mb-4">Consultez les offres sans connexion et sauvegardez les dernières opportunités.</p>
      </div>
      <div className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center min-h-[200px]">
        <WifiOff className="h-10 w-10 text-primary mb-2" />
        <span className="text-mosala-dark font-semibold">Vous êtes hors-ligne</span>
        <p className="text-mosala-dark/70 text-center mt-2">Vous pouvez continuer à consulter les offres sauvegardées.<br />La synchronisation se fera automatiquement dès le retour de la connexion.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default OfflineMode;
