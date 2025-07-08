
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Map } from "lucide-react";

const InteractiveMap3D = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
      <div className="flex flex-col items-center mb-8">
        <Map className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text">Carte interactive 3D</h1>
        <p className="text-lg text-[#F5F5F7] text-center mb-4">Explorez les opportunités sur une carte 3D, avec zoom, clusters et photos issues du projet Mosala.</p>
      </div>
      <div className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-[#6E45E2]/10 to-[#00FFFF]/10 rounded-lg border-2 border-dashed border-primary">
          <span className="text-primary font-semibold">[Carte interactive 3D à venir]</span>
        </div>
        <p className="text-xs text-mosala-dark/60 mt-2">Bientôt : visualisation des offres sur une carte, Street View local, photos Mosala…</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default InteractiveMap3D;
