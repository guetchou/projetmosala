import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Orientation = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text">Orientation professionnelle</h1>
      <p className="text-lg text-[#F5F5F7] mb-4">Cette page est en cours de construction.<br/>Revenez bientôt pour découvrir nos outils d'orientation et de coaching personnalisés !</p>
    </main>
    <Footer />
  </div>
);

export default Orientation; 