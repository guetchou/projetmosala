
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserCog, Briefcase } from "lucide-react";

const RecruiterSpace = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
      <div className="flex flex-col items-center mb-8">
        <UserCog className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text">Espace recruteur</h1>
        <p className="text-lg text-[#F5F5F7] text-center mb-4">Publiez des annonces, triez automatiquement les candidatures, chattez avec les talents et accédez à des statistiques avancées.</p>
      </div>
      <div className="bg-white/90 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-mosala-dark mb-4 flex items-center gap-2"><Briefcase className="h-5 w-5 text-primary" /> Mes annonces</h2>
        <table className="w-full text-mosala-dark mb-4">
          <thead>
            <tr className="border-b border-border">
              <th className="py-2 text-left">Titre</th>
              <th className="py-2 text-left">Statut</th>
              <th className="py-2 text-left">Candidats</th>
              <th className="py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td>Développeur React</td>
              <td><span className="bg-green-100 text-green-700 px-2 py-1 rounded">Ouvert</span></td>
              <td>12</td>
              <td><button className="btn btn-xs bg-primary text-white">Voir</button></td>
            </tr>
            <tr className="border-b border-border">
              <td>Chargé de communication</td>
              <td><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">En attente</span></td>
              <td>5</td>
              <td><button className="btn btn-xs bg-primary text-white">Voir</button></td>
            </tr>
          </tbody>
        </table>
        <button className="btn bg-gradient-primary text-white w-full">Publier une nouvelle annonce</button>
      </div>
    </main>
    <Footer />
  </div>
);

export default RecruiterSpace;
