
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Candidates = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text">Annuaire des candidats</h1>
      <p className="text-lg text-[#F5F5F7] whitespace-pre-line">Trouvez des profils variés et compétents pour tous vos besoins.</p>
    </main>
    <Footer />
  </div>
);

export default Candidates;
