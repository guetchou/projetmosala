import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-24 max-w-2xl text-center pt-28">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#F5F5F7]">Page non trouvée</h2>
      <p className="text-lg text-[#F5F5F7] mb-8">La page que vous cherchez n'existe pas ou a été déplacée.</p>
    </main>
    <Footer />
  </div>
);

export default NotFound;
