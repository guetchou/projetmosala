import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AdminDashboard = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl pt-28">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text">Dashboard Admin</h1>
        <p className="text-lg text-[#F5F5F7] text-center mb-4">Gestion des utilisateurs, offres, statistiques et administration avancée.</p>
      </div>
      <div className="bg-white/90 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-mosala-dark mb-4">Bienvenue, administrateur !</h2>
        <ul className="list-disc pl-6 text-mosala-dark">
          <li>Voir la liste des utilisateurs</li>
          <li>Gérer les offres d'emploi</li>
          <li>Accéder aux statistiques globales</li>
          <li>Paramètres avancés</li>
        </ul>
      </div>
    </main>
    <Footer />
  </div>
);

export default AdminDashboard; 