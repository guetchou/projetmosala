import Navbar from "@/components/Navbar";
import Hero from "@/components/ui/Hero";
import Footer from "@/components/Footer";

const Home = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-mosala-green-50 via-mosala-yellow-50 to-mosala-dark-50">
    <Navbar />
    <main className="flex-1">
      <Hero />
      {/* Ajoute ici d'autres sections (ex: stats, témoignages, partenaires, etc.) */}
    </main>
    <Footer />
  </div>
);

export default Home;