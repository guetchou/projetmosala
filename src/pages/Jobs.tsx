
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Jobs = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text">Trouver un emploi</h1>
      <p className="text-lg text-[#F5F5F7] whitespace-pre-line">Découvrez les meilleures offres d'emploi et formations adaptées à votre profil.</p>
    </main>
    <Footer />
  </div>
);

export default Jobs;
